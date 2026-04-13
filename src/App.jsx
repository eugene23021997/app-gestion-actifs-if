import { useState, useMemo } from 'react'
import './App.css'
import {
  TECHNICENTRES, PATRIMOINES, GRANULARITE, OCCURRENCE, IMPACTS, IMPACT_LEVELS,
  INDICATEURS_GA, RACI_PROCESSUS, OUTILS_SI,
  CYCLE_VIE, DEMO_ASSETS, PROJETS, SCENARIOS, ANNEES
} from './data'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  PieChart, Pie, Cell, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Line, Area
} from 'recharts'

// ─── HELPERS ───────────────────────────────────────────────
const fmt = n => n?.toLocaleString('fr-FR') ?? '—'
const tcName = id => TECHNICENTRES.find(t => t.id === id)?.name?.replace('TC ', '') || id
const PAT_COLOR = { immo: '#1D4ED8', ferro: '#B45309', io: '#4338CA' }
const PAT_BG = { immo: '#DBEAFE', ferro: '#FEF3C7', io: '#E0E7FF' }
const PAT_LABEL = { immo: 'Immobilier', ferro: 'Ferroviaire', io: 'IO' }
const PAT_ICON = { immo: '🏗', ferro: '🛤', io: '⚙' }
const PRIO_COLOR = { P1: '#DC2626', P2: '#F59E0B', P3: '#10B981' }
const PRIO_LABEL = { P1: 'Critique', P2: 'Elevee', P3: 'Moderee' }
const CRIT_COLOR = ['#10B981', '#F59E0B', '#EA580C', '#DC2626']
const ETAT_COLOR = { Satisfaisant: '#10B981', Acceptable: '#F59E0B', Moyen: '#EA580C', Insuffisant: '#DC2626' }

function scoreColor(s) {
  if (s >= 80) return '#DC2626'
  if (s >= 60) return '#F59E0B'
  if (s >= 40) return '#10B981'
  return '#3B82F6'
}

function computeScore(priorite, impacts) {
  const vals = Object.values(impacts).filter(v => typeof v === 'number')
  const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0
  const baseMin = { P1: 80, P2: 60, P3: 30 }[priorite] || 30
  const baseMax = { P1: 100, P2: 80, P3: 60 }[priorite] || 60
  return Math.round(baseMin + (avg / 3) * (baseMax - baseMin))
}

// ─── REUSABLE COMPONENTS ───────────────────────────────────

function ScoreRing({ score, size = 48 }) {
  const r = size / 2 - 5
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c
  const col = scoreColor(score)
  return (
    <div className="sring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle className="trk" cx={size / 2} cy={size / 2} r={r} />
        <circle className="fil" cx={size / 2} cy={size / 2} r={r}
          stroke={col} strokeDasharray={c} strokeDashoffset={offset} />
      </svg>
      <div className="sv" style={{ fontSize: size * 0.28, color: col }}>{score}</div>
    </div>
  )
}

function KpiCard({ icon, label, value, sub, trend, color, bgIco }) {
  return (
    <div className="kpi">
      <div className="kpi-top">
        <div className="kpi-label">{label}</div>
        <div className="kpi-ico" style={{ background: bgIco || '#EFF6FF' }}>{icon}</div>
      </div>
      <div className="kpi-val" style={{ color }}>{value}</div>
      <div className={`kpi-sub ${trend === 'up' ? 'kpi-up' : trend === 'dn' ? 'kpi-dn' : 'kpi-nt'}`}>{sub}</div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,.1)' }}>
      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 11, color: p.color, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          {p.name} : <strong>{fmt(p.value)} k</strong>
        </div>
      ))}
    </div>
  )
}

// ─── MODAL: AJOUT / EDITION ACTIF ──────────────────────────

function ModalAsset({ onClose, onSave, existing }) {
  const isEdit = !!existing
  const [form, setForm] = useState(existing
    ? { nom: existing.nom, pat: existing.pat, tc: existing.tc, cat: existing.cat, crit: existing.crit, etat: existing.etat, conform: existing.conform }
    : { nom: '', pat: 'immo', tc: 'sdn', cat: '', crit: 0, etat: 'Satisfaisant', conform: true }
  )
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const cats = GRANULARITE[form.pat]?.categories || []

  const submit = () => {
    if (!form.nom.trim()) return
    onSave({ id: existing?.id || Date.now(), nom: form.nom, pat: form.pat, tc: form.tc, cat: form.cat || cats[0]?.label || '', crit: form.crit, etat: form.etat, conform: form.conform })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-h">
          <h3>{isEdit ? 'Modifier l\'actif' : 'Nouvel actif'}</h3>
          <button className="btn btn-o" style={{ fontSize: 10, padding: '4px 10px' }} onClick={onClose}>✕</button>
        </div>
        <div className="modal-b">
          <div className="fgrid">
            <div className="fg fw"><label>Designation de l'actif <span className="req">*</span></label>
              <input className="fi" placeholder="Ex: Pont roulant Hall D" value={form.nom} onChange={e => up('nom', e.target.value)} /></div>
          </div>
          <div className="fgrid" style={{ marginTop: 12 }}>
            <div className="fg"><label>Patrimoine</label>
              <select className="fi" value={form.pat} onChange={e => { up('pat', e.target.value); up('cat', '') }}>
                {PATRIMOINES.map(p => <option key={p.id} value={p.id}>{p.icon} {p.label}</option>)}
              </select></div>
            <div className="fg"><label>Technicentre</label>
              <select className="fi" value={form.tc} onChange={e => up('tc', e.target.value)}>
                {TECHNICENTRES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select></div>
          </div>
          <div className="fgrid" style={{ marginTop: 12 }}>
            <div className="fg"><label>Categorie</label>
              <select className="fi" value={form.cat} onChange={e => up('cat', e.target.value)}>
                <option value="">— Selectionner —</option>
                {cats.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
              </select></div>
            <div className="fg"><label>Etat</label>
              <select className="fi" value={form.etat} onChange={e => up('etat', e.target.value)}>
                {['Satisfaisant', 'Acceptable', 'Moyen', 'Insuffisant'].map(e => <option key={e} value={e}>{e}</option>)}
              </select></div>
          </div>
          <div style={{ marginTop: 14 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--g600)', display: 'block', marginBottom: 6 }}>Criticite</label>
            <div className="occ-grid">
              {OCCURRENCE.map(o =>
                <button key={o.v} className={`occ-btn ${form.crit === o.v ? 'sel' : ''}`} onClick={() => up('crit', o.v)}>
                  <div className="occ-n" style={{ color: o.color }}>{o.v}</div>
                  <div className="occ-l">{o.label}</div>
                </button>
              )}
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" id="conform-cb" checked={form.conform} onChange={e => up('conform', e.target.checked)} style={{ accentColor: 'var(--gn)' }} />
            <label htmlFor="conform-cb" style={{ fontSize: 12, fontWeight: 600, color: 'var(--g600)', cursor: 'pointer' }}>Actif conforme</label>
          </div>
        </div>
        <div className="modal-f">
          <button className="btn btn-o" onClick={onClose}>Annuler</button>
          <button className="btn btn-p" onClick={submit} disabled={!form.nom.trim()}>{isEdit ? 'Enregistrer' : 'Ajouter l\'actif'}</button>
        </div>
      </div>
    </div>
  )
}

// ─── MODAL: AJOUT / EDITION PROJET D'INVESTISSEMENT ────────

function ModalProjet({ onClose, onSave, existing }) {
  const isEdit = !!existing
  const [form, setForm] = useState(existing
    ? { nom: existing.nom, desc: existing.desc || '', pat: existing.pat, cat: existing.cat || '', tc: existing.tc,
        montant: String(existing.montant), priorite: existing.priorite, annee: existing.annee, trim: existing.trim, duree: existing.duree,
        roi: String(existing.roi || ''), conformite: existing.conformite || '', impacts: { ...existing.impacts } }
    : { nom: '', desc: '', pat: 'immo', cat: '', tc: 'sdn',
        montant: '', priorite: 'P2', annee: 2026, trim: 'T1', duree: 12,
        roi: '', conformite: '', impacts: {} }
  )
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const upImpact = (k, v) => setForm(f => ({ ...f, impacts: { ...f.impacts, [k]: v } }))

  const cats = GRANULARITE[form.pat]?.categories || []
  const impactCriteria = IMPACTS[form.pat] || []
  const score = computeScore(form.priorite, form.impacts)

  const submit = () => {
    if (!form.nom.trim() || !form.montant) return
    onSave({
      id: existing?.id || Date.now(),
      nom: form.nom,
      desc: form.desc || `Projet ${form.nom} — ${PAT_LABEL[form.pat]}`,
      pat: form.pat,
      cat: form.cat || cats[0]?.label || '',
      tc: form.tc,
      montant: +form.montant,
      score,
      priorite: form.priorite,
      annee: +form.annee,
      trim: form.trim,
      duree: +form.duree,
      impacts: form.impacts,
      roi: +form.roi || 0,
      conformite: form.conformite || null,
      phase: existing?.phase || 'Projet',
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-h">
          <h3>{isEdit ? 'Modifier le projet' : 'Nouveau projet d\'investissement'}</h3>
          <button className="btn btn-o" style={{ fontSize: 10, padding: '4px 10px' }} onClick={onClose}>✕</button>
        </div>
        <div className="modal-b" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div className="fgrid">
            <div className="fg fw"><label>Intitule du projet <span className="req">*</span></label>
              <input className="fi" placeholder="Ex: Remplacement pont roulant Hall D" value={form.nom} onChange={e => up('nom', e.target.value)} /></div>
          </div>
          <div className="fg" style={{ marginTop: 12 }}><label>Description</label>
            <textarea className="fi" rows={2} placeholder="Contexte, justification du besoin..." value={form.desc} onChange={e => up('desc', e.target.value)} /></div>

          <div className="slbl" style={{ marginTop: 16 }}>Classification</div>
          <div className="fgrid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div className="fg"><label>Patrimoine</label>
              <select className="fi" value={form.pat} onChange={e => { setForm(f => ({ ...f, pat: e.target.value, cat: '', impacts: {} })) }}>
                {PATRIMOINES.map(p => <option key={p.id} value={p.id}>{p.icon} {p.label}</option>)}
              </select></div>
            <div className="fg"><label>Categorie</label>
              <select className="fi" value={form.cat} onChange={e => up('cat', e.target.value)}>
                <option value="">— Selectionner —</option>
                {cats.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
              </select></div>
            <div className="fg"><label>Technicentre</label>
              <select className="fi" value={form.tc} onChange={e => up('tc', e.target.value)}>
                {TECHNICENTRES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select></div>
          </div>

          <div className="slbl" style={{ marginTop: 16 }}>Donnees financieres</div>
          <div className="fgrid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div className="fg"><label>Montant (k) <span className="req">*</span></label>
              <input className="fi" type="number" min={0} placeholder="1 200" value={form.montant} onChange={e => up('montant', e.target.value)} /></div>
            <div className="fg"><label>Cout non-intervention (k/an)</label>
              <input className="fi" type="number" min={0} placeholder="350" value={form.roi} onChange={e => up('roi', e.target.value)} /></div>
            <div className="fg"><label>Conformite / reglementaire</label>
              <input className="fi" placeholder="Ex: ICPE, DTA..." value={form.conformite} onChange={e => up('conformite', e.target.value)} /></div>
          </div>

          <div className="slbl" style={{ marginTop: 16 }}>Planification</div>
          <div className="fgrid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
            <div className="fg"><label>Priorite</label>
              <select className="fi" value={form.priorite} onChange={e => up('priorite', e.target.value)}>
                {['P1', 'P2', 'P3'].map(p => <option key={p} value={p}>{p} — {PRIO_LABEL[p]}</option>)}
              </select></div>
            <div className="fg"><label>Annee</label>
              <select className="fi" value={form.annee} onChange={e => up('annee', +e.target.value)}>
                {ANNEES.map(y => <option key={y} value={y}>{y}</option>)}
              </select></div>
            <div className="fg"><label>Trimestre</label>
              <select className="fi" value={form.trim} onChange={e => up('trim', e.target.value)}>
                {['T1', 'T2', 'T3', 'T4'].map(t => <option key={t} value={t}>{t}</option>)}
              </select></div>
            <div className="fg"><label>Duree (mois)</label>
              <input className="fi" type="number" min={1} max={60} value={form.duree} onChange={e => up('duree', e.target.value)} /></div>
          </div>

          <div className="slbl" style={{ marginTop: 16 }}>Evaluation des impacts — PSGA §4.2</div>
          {impactCriteria.map(c => (
            <div className="imp-row" key={c.id}>
              <div className="imp-hdr">
                <label>{c.label}</label>
                <span className="chip" style={{
                  background: ['#D1FAE5', '#FEF3C7', '#FFEDD5', '#FEE2E2'][form.impacts[c.id] || 0],
                  color: CRIT_COLOR[form.impacts[c.id] || 0]
                }}>{IMPACT_LEVELS[form.impacts[c.id] || 0]}</span>
              </div>
              <div className="imp-pills">
                {IMPACT_LEVELS.map((l, i) =>
                  <button key={i} className={`imp-pill ${form.impacts[c.id] === i ? `ip${i}` : ''}`}
                    onClick={() => upImpact(c.id, i)}>{l}</button>
                )}
              </div>
              <div className="imp-ends"><span>{c.lo}</span><span>{c.hi}</span></div>
            </div>
          ))}

          <div style={{ marginTop: 16, padding: 14, borderRadius: 8, background: 'var(--g50)', border: '1px solid var(--g200)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <ScoreRing score={score} size={56} />
            <div>
              <div style={{ fontSize: 9, color: 'var(--g400)', fontWeight: 600, textTransform: 'uppercase' }}>Score IA calcule</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: scoreColor(score) }}>{score}<span style={{ fontSize: 12, fontWeight: 500 }}>/100</span></div>
              <div style={{ fontSize: 10, color: 'var(--g500)' }}>Basee sur priorite {form.priorite} + impacts</div>
            </div>
          </div>
        </div>
        <div className="modal-f">
          <button className="btn btn-o" onClick={onClose}>Annuler</button>
          <button className="btn btn-p" onClick={submit} disabled={!form.nom.trim() || !form.montant}>{isEdit ? 'Enregistrer' : 'Ajouter le projet'}</button>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE: TABLEAU DE BORD ─────────────────────────────────

function PageDashboard({ budget, projets, onNavigate }) {
  const totalBesoin = projets.reduce((s, p) => s + p.montant, 0)
  const p1 = projets.filter(p => p.priorite === 'P1')
  const p1Total = p1.reduce((s, p) => s + p.montant, 0)
  const roiTotal = projets.reduce((s, p) => s + p.roi, 0)

  const pieData = ['immo', 'ferro', 'io'].map(pat => ({
    name: PAT_LABEL[pat],
    value: projets.filter(p => p.pat === pat).reduce((s, p) => s + p.montant, 0),
    color: PAT_COLOR[pat],
  }))

  const yearData = ANNEES.map(y => ({
    name: String(y),
    Immobilier: projets.filter(p => p.pat === 'immo' && p.annee === y).reduce((s, p) => s + p.montant, 0),
    Ferroviaire: projets.filter(p => p.pat === 'ferro' && p.annee === y).reduce((s, p) => s + p.montant, 0),
    IO: projets.filter(p => p.pat === 'io' && p.annee === y).reduce((s, p) => s + p.montant, 0),
    enveloppe: budget,
  }))

  const alerts = [
    { type: 'danger', icon: '🔴', text: 'Echeance ICPE station lavage : 31/12/2026 — projet non encore lance', action: 'Voir projet #4' },
    { type: 'warning', icon: '🟡', text: 'DTA Amiante Hall A : intervention avant degradation structurelle recommandee', action: 'Voir projet #1' },
    { type: 'info', icon: '🔵', text: 'Optimisation detectee : regroupement chantiers Hall B + B12 possible — economie estimee 85 k', action: 'Analyser' },
    { type: 'success', icon: '🟢', text: 'Taux de disponibilite en hausse +2pts vs N-1 (87%)', action: null },
  ]

  return <>
    <div className="kpi-row">
      <KpiCard icon="📋" label="Portefeuille projets" value={projets.length} sub={`${p1.length} projets P1 critiques`} trend="nt" bgIco="#EFF6FF" />
      <KpiCard icon="💰" label="Besoin total identifie" value={<>{fmt(totalBesoin)} <span>k</span></>} sub={`Enveloppe : ${fmt(budget)} k`} trend="dn" color="var(--red)" bgIco="#FEE2E2" />
      <KpiCard icon="⚠️" label="Cout de non-intervention" value={<>{fmt(roiTotal)} <span>k/an</span></>} sub="Risque financier annuel cumule" trend="dn" color="#DC2626" bgIco="#FEF3C7" />
      <KpiCard icon="✅" label="Taux disponibilite moyen" value={<>87<span>%</span></>} sub="↑ +2pts vs N-1" trend="up" color="var(--gn)" bgIco="#D1FAE5" />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
      <div className="card">
        <div className="card-h">
          <h3>Besoins d'investissement par annee</h3>
          <span className="ref">PSGA §3.2 — Trajectoire 2026-2031</span>
        </div>
        <div className="card-b" style={{ height: 280 }}>
          <ResponsiveContainer>
            <ComposedChart data={yearData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={10} tickFormatter={v => `${v / 1000}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="Immobilier" stackId="a" fill="#1D4ED8" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Ferroviaire" stackId="a" fill="#B45309" radius={[0, 0, 0, 0]} />
              <Bar dataKey="IO" stackId="a" fill="#4338CA" radius={[4, 4, 0, 0]} />
              <Line type="stepAfter" dataKey="enveloppe" stroke="#DC2626" strokeWidth={2} strokeDasharray="6 3" dot={false} name="Enveloppe" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card">
          <div className="card-h"><h3>Repartition par patrimoine</h3></div>
          <div className="card-b" style={{ height: 180, display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={v => `${fmt(v)} k`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ minWidth: 100 }}>
              {pieData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                  <span style={{ fontSize: 10, color: 'var(--g600)' }}>{d.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, marginLeft: 'auto' }}>{fmt(d.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ flex: 1 }}>
          <div className="card-h"><h3>Alertes IA</h3></div>
          <div className="card-b" style={{ padding: '8px 14px' }}>
            {alerts.map((a, i) => (
              <div key={i} className={`alert-row alert-${a.type}`}>
                <span style={{ fontSize: 12 }}>{a.icon}</span>
                <span className="alert-text">{a.text}</span>
                {a.action && <button className="alert-action" onClick={() => onNavigate('traj')}>{a.action}</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
}

// ─── PAGE: INVENTAIRE ──────────────────────────────────────

function PageInventaire({ assets, setAssets }) {
  const [filtrePat, setFiltrePat] = useState('all')
  const [filtreTC, setFiltreTC] = useState('all')
  const [search, setSearch] = useState('')
  const [modalAsset, setModalAsset] = useState(null) // null=ferme, 'new'=ajout, {asset}=edition
  const filtered = assets.filter(a =>
    (filtrePat === 'all' || a.pat === filtrePat) &&
    (filtreTC === 'all' || a.tc === filtreTC) &&
    (!search || a.nom.toLowerCase().includes(search.toLowerCase()))
  )
  const nbCrit = assets.filter(a => a.crit >= 2).length
  const nbNonConf = assets.filter(a => !a.conform).length

  const handleSaveAsset = (a) => {
    setAssets(prev => {
      const idx = prev.findIndex(x => x.id === a.id)
      if (idx >= 0) { const next = [...prev]; next[idx] = a; return next }
      return [a, ...prev]
    })
  }

  return <>
    {modalAsset && <ModalAsset
      onClose={() => setModalAsset(null)}
      onSave={handleSaveAsset}
      existing={modalAsset === 'new' ? null : modalAsset}
    />}

    <div className="kpi-row">
      <KpiCard icon="📋" label="Total actifs suivis" value={assets.length} sub="3 patrimoines — 10 technicentres" trend="nt" bgIco="#EFF6FF" />
      <KpiCard icon="⚠️" label="Actifs critiques" value={nbCrit} sub={`${Math.round(nbCrit / assets.length * 100)}% du parc — Occurrence >= 2`} trend="dn" color="var(--red)" bgIco="#FEE2E2" />
      <KpiCard icon="📛" label="Non-conformites" value={nbNonConf} sub={`${Math.round(nbNonConf / assets.length * 100)}% — Seuil critique : <5%`} trend="dn" color="var(--or)" bgIco="#FEF3C7" />
      <KpiCard icon="✅" label="Taux disponibilite moyen" value={<>87<span>%</span></>} sub="↑ +2pts vs N-1" trend="up" color="var(--gn)" bgIco="#D1FAE5" />
    </div>

    <div className="card">
      <div className="card-h">
        <h3>Inventaire du parc d'actifs IF</h3>
        <div style={{ display: 'flex', gap: 6 }}>
          <input className="fi" style={{ fontSize: 11, padding: '5px 8px', width: 180 }}
            placeholder="Rechercher un actif..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="fi" style={{ fontSize: 11, padding: '5px 8px' }} value={filtrePat} onChange={e => setFiltrePat(e.target.value)}>
            <option value="all">Tous patrimoines</option>
            {PATRIMOINES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
          <select className="fi" style={{ fontSize: 11, padding: '5px 8px' }} value={filtreTC} onChange={e => setFiltreTC(e.target.value)}>
            <option value="all">Tous TC</option>
            {TECHNICENTRES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <button className="btn btn-p" style={{ fontSize: 11, padding: '5px 14px' }} onClick={() => setModalAsset('new')}>+ Nouvel actif</button>
        </div>
      </div>
      <table className="tbl">
        <thead><tr>
          <th>Actif</th><th>Patrimoine</th><th>TC</th><th>Categorie</th><th>Criticite</th><th>Etat</th><th>Conformite</th>
        </tr></thead>
        <tbody>
          {filtered.map(a => {
            const tc = TECHNICENTRES.find(t => t.id === a.tc)
            return <tr key={a.id} onClick={() => setModalAsset(a)} style={{ cursor: 'pointer' }}>
              <td style={{ fontWeight: 700 }}>{a.nom}</td>
              <td><span className={`chip chip-${a.pat}`}>{PAT_LABEL[a.pat]}</span></td>
              <td style={{ fontSize: 11, color: 'var(--g500)' }}>{tc?.name.replace('TC ', '')}</td>
              <td style={{ fontSize: 11 }}>{a.cat}</td>
              <td><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="crit-dot" style={{ background: CRIT_COLOR[a.crit] }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: CRIT_COLOR[a.crit] }}>{a.crit}/3</span>
              </div></td>
              <td><span style={{ fontSize: 11, fontWeight: 600, color: ETAT_COLOR[a.etat] }}>{a.etat}</span></td>
              <td>{a.conform
                ? <span className="chip chip-gn">Conforme</span>
                : <span className="chip chip-red">Non-conforme</span>
              }</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </>
}

// ─── PAGE: CRITICITE ───────────────────────────────────────

function PageCriticite() {
  const [pat, setPat] = useState('immo')
  const [occ, setOcc] = useState(3)
  const [imps, setImps] = useState({ sec: 3, prod: 2, fin: 2, soc: 1, img: 1 })
  const criteria = IMPACTS[pat]
  const vals = criteria.map(c => imps[c.id] || 0)
  const avgImp = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0

  const MX = [
    ['mc-g', 'mc-g', 'mc-y', 'mc-o'],
    ['mc-g', 'mc-y', 'mc-o', 'mc-r'],
    ['mc-y', 'mc-o', 'mc-r', 'mc-dr'],
    ['mc-o', 'mc-r', 'mc-dr', 'mc-dr'],
  ]
  const critLabels = ['Non critique', 'Peu critique', 'Moderement critique', 'Hautement critique']
  const critLevel = Math.min(3, Math.max(occ, avgImp))

  return <div className="card">
    <div className="card-h">
      <h3>Matrice de criticite — PSGA §4.2</h3>
      <div style={{ display: 'flex', gap: 4 }}>
        {PATRIMOINES.map(p =>
          <button key={p.id} className={`tab ${pat === p.id ? 'tactive' : ''}`}
            onClick={() => { setPat(p.id); setImps({}) }}>
            {p.icon} {p.label}
          </button>
        )}
      </div>
    </div>
    <div className="card-b fade" key={pat}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        <div>
          <div className="slbl">Occurrence de defaillance</div>
          <div className="occ-grid">
            {OCCURRENCE.map(o =>
              <button key={o.v} className={`occ-btn ${occ === o.v ? 'sel' : ''}`} onClick={() => setOcc(o.v)}>
                <div className="occ-n" style={{ color: o.color }}>{o.v}</div>
                <div className="occ-l">{o.label}</div>
                <div className="occ-s">{o.sub}</div>
              </button>
            )}
          </div>

          <div className="slbl">Criteres d'impact — {PATRIMOINES.find(p => p.id === pat)?.label}</div>
          {criteria.map(c =>
            <div className="imp-row" key={c.id}>
              <div className="imp-hdr">
                <label>{c.label}</label>
                <span className="chip" style={{
                  background: ['#D1FAE5', '#FEF3C7', '#FFEDD5', '#FEE2E2'][imps[c.id] || 0],
                  color: CRIT_COLOR[imps[c.id] || 0]
                }}>{IMPACT_LEVELS[imps[c.id] || 0]}</span>
              </div>
              <div className="imp-pills">
                {IMPACT_LEVELS.map((l, i) =>
                  <button key={i} className={`imp-pill ${imps[c.id] === i ? `ip${i}` : ''}`}
                    onClick={() => setImps(p => ({ ...p, [c.id]: i }))}>{l}</button>
                )}
              </div>
              <div className="imp-ends"><span>{c.lo}</span><span>{c.hi}</span></div>
            </div>
          )}
        </div>

        <div>
          <div className="slbl">Matrice resultante</div>
          <div className="mx-grid">
            <div></div>
            {['Faib.', 'Moy.', 'Fort', 'Elev.'].map(h => <div className="mx-hdr" key={h}>{h}</div>)}
            {[3, 2, 1, 0].map(o => [
              <div className="mx-lbl" key={`l${o}`}>Occ.{o}</div>,
              ...[0, 1, 2, 3].map(imp =>
                <div key={`${o}-${imp}`} className={`mx-cell ${MX[3 - o][imp]} ${occ === o && avgImp === imp ? 'mx-active' : ''}`}>
                  {occ === o && avgImp === imp ? '●' : ''}
                </div>
              )
            ])}
          </div>

          <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: ['#D1FAE5', '#FEF3C7', '#FFEDD5', '#FEE2E2'][critLevel], borderLeft: `4px solid ${CRIT_COLOR[critLevel]}` }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: CRIT_COLOR[critLevel] }}>{critLabels[critLevel]}</div>
            <div style={{ fontSize: 10, color: CRIT_COLOR[critLevel], marginTop: 2 }}>
              Occurrence {occ}/3 x Impact moyen {avgImp}/3
            </div>
          </div>

          <div className="slbl" style={{ marginTop: 16 }}>Seuils de performance</div>
          {INDICATEURS_GA.slice(0, 2).map(ind =>
            <div key={ind.id} style={{ padding: 10, background: 'var(--g50)', borderRadius: 6, border: '1px solid var(--g100)', marginBottom: 8 }}>
              <div style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--g400)', fontWeight: 700 }}>{ind.label}</div>
              <div style={{ fontSize: 9, color: 'var(--g500)', marginTop: 3 }}>
                Critique : {'<'}{ind.seuils_critique.acceptable}% optimal / {'>'}{ind.seuils_critique.faible}% faible
              </div>
              <div style={{ fontSize: 9, color: 'var(--g500)' }}>
                Autre : {'<'}{ind.seuils_autre.acceptable}% optimal / {'>'}{ind.seuils_autre.faible}% faible
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
}

// ─── PAGE: TRAJECTOIRE D'INVESTISSEMENT ────────────────────

function PageTrajectoire({ budget, setBudget, projets }) {
  const [scenario, setScenario] = useState('cible')
  const [selectedId, setSelectedId] = useState(null)

  const sorted = useMemo(() => [...projets].sort((a, b) => b.score - a.score), [projets])

  const funded = useMemo(() => {
    let remaining = budget
    return sorted.map(p => {
      const ok = remaining >= p.montant
      if (ok) remaining -= p.montant
      return { ...p, funded: ok }
    })
  }, [sorted, budget])

  const fundedProjects = funded.filter(p => p.funded)
  const deferredProjects = funded.filter(p => !p.funded)
  const totalFunded = fundedProjects.reduce((s, p) => s + p.montant, 0)
  const totalBesoin = projets.reduce((s, p) => s + p.montant, 0)
  const roiCovered = fundedProjects.reduce((s, p) => s + p.roi, 0)
  const roiUncovered = deferredProjects.reduce((s, p) => s + p.roi, 0)

  const sc = SCENARIOS.find(s => s.id === scenario)

  const chartData = ANNEES.map((y, i) => {
    const row = { name: String(y) }
    ;['immo', 'ferro', 'io'].forEach(pat => {
      row[PAT_LABEL[pat]] = funded.filter(p => p.funded && p.pat === pat && p.annee === y).reduce((s, p) => s + p.montant, 0)
    })
    SCENARIOS.forEach(s => { row[s.label] = s.budgets[i] })
    row.Enveloppe = budget
    return row
  })

  const selected = selectedId ? projets.find(p => p.id === selectedId) : null
  const impactKeys = selected ? Object.keys(selected.impacts) : []
  const impactLabels = {
    sec: 'Securite', prod: 'Production', fin: 'Financier', soc: 'Social', img: 'Image',
    expl: 'Exploitation', cont: 'Contournement', cimp: 'Cout improd.', crem: 'Cout remise',
    red: 'Redondance', regl: 'Reglementaire'
  }
  const radarData = impactKeys.map(k => ({
    subject: impactLabels[k] || k, value: selected?.impacts[k] || 0, max: 3
  }))

  return <>
    <div className="traj-controls">
      <div className="traj-slider-wrap">
        <label>Enveloppe budgetaire annuelle</label>
        <div className="traj-slider-row">
          <input type="range" min={3000} max={16000} step={100} value={budget}
            onChange={e => setBudget(+e.target.value)} className="traj-slider" />
          <div className="traj-slider-val">{fmt(budget)} k</div>
        </div>
        <div className="traj-slider-ticks">
          <span>3 000 k</span><span>8 200 k (cible)</span><span>16 000 k</span>
        </div>
      </div>
      <div className="traj-scenarios">
        <label>Scenario budgetaire</label>
        <div className="traj-scenario-btns">
          {SCENARIOS.map(s => (
            <button key={s.id} className={`traj-sc-btn ${scenario === s.id ? 'active' : ''}`}
              style={{ '--sc-color': s.color }} onClick={() => { setScenario(s.id); setBudget(s.budgets[0]) }}>
              <span className="sc-dot" style={{ background: s.color }} />
              <div>
                <div className="sc-name">{s.label}</div>
                <div className="sc-desc">{s.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="kpi-row" style={{ marginTop: 16 }}>
      <KpiCard icon="✅" label="Projets financables" value={fundedProjects.length}
        sub={`sur ${projets.length} projets identifies`} trend="up" color="var(--gn)" bgIco="#D1FAE5" />
      <KpiCard icon="💰" label="Budget mobilise" value={<>{fmt(totalFunded)} <span>k</span></>}
        sub={`${Math.round(totalFunded / totalBesoin * 100)}% du besoin total`} trend="up" color="var(--bl)" bgIco="#EFF6FF" />
      <KpiCard icon="🛡" label="Risque couvert" value={<>{fmt(roiCovered)} <span>k/an</span></>}
        sub={`Risque residuel : ${fmt(roiUncovered)} k/an`} trend="up" color="var(--gn)" bgIco="#D1FAE5" />
      <KpiCard icon="⚠️" label="Deficit budgetaire" value={<>{fmt(Math.max(0, totalBesoin - budget))} <span>k</span></>}
        sub={totalBesoin <= budget ? 'Tous les besoins couverts' : `${deferredProjects.length} projet(s) differe(s)`}
        trend={totalBesoin <= budget ? 'up' : 'dn'} color={totalBesoin <= budget ? 'var(--gn)' : 'var(--red)'} bgIco="#FEE2E2" />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, marginTop: 0 }}>
      <div className="card">
        <div className="card-h">
          <h3>Trajectoire d'investissement 2026—2031</h3>
          <span className="ref">Scenario {sc?.label} — Enveloppe {fmt(budget)} k/an</span>
        </div>
        <div className="card-b" style={{ height: 320 }}>
          <ResponsiveContainer>
            <ComposedChart data={chartData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={10} tickFormatter={v => `${(v / 1000).toFixed(0)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="Immobilier" stackId="inv" fill="#1D4ED8" />
              <Bar dataKey="Ferroviaire" stackId="inv" fill="#B45309" />
              <Bar dataKey="IO" stackId="inv" fill="#4338CA" radius={[3, 3, 0, 0]} />
              <Line type="monotone" dataKey="Enveloppe" stroke="#DC2626" strokeWidth={2.5} strokeDasharray="8 4" dot={false} />
              {SCENARIOS.map(s => (
                <Line key={s.id} type="monotone" dataKey={s.label} stroke={s.color}
                  strokeWidth={scenario === s.id ? 2 : 0.8}
                  strokeDasharray={scenario === s.id ? '0' : '4 4'}
                  dot={false} opacity={scenario === s.id ? 1 : 0.3} />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {!selected ? (
        <div className="card">
          <div className="card-h"><h3>Classement des projets</h3></div>
          <div className="card-b" style={{ padding: 0, maxHeight: 352, overflowY: 'auto' }}>
            {funded.map((p, i) => (
              <div key={p.id} className={`proj-row ${p.funded ? '' : 'proj-deferred'}`}
                onClick={() => setSelectedId(p.id)} style={{ cursor: 'pointer' }}>
                <div className="proj-rank">#{i + 1}</div>
                <ScoreRing score={p.score} size={36} />
                <div className="proj-info">
                  <div className="proj-name">{p.nom}</div>
                  <div className="proj-meta">
                    <span className={`chip chip-${p.pat}`} style={{ fontSize: 8 }}>{PAT_LABEL[p.pat]}</span>
                    <span className="chip" style={{ background: `${PRIO_COLOR[p.priorite]}18`, color: PRIO_COLOR[p.priorite], fontSize: 8 }}>{p.priorite}</span>
                  </div>
                </div>
                <div className="proj-amount">
                  <div style={{ fontWeight: 700, fontSize: 12 }}>{fmt(p.montant)} k</div>
                  <div className={`proj-status ${p.funded ? 'st-funded' : 'st-deferred'}`}>
                    {p.funded ? '✓ Finance' : '⏸ Differe'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card detail-card">
          <div className="card-h">
            <h3>{selected.nom}</h3>
            <button className="btn btn-o" style={{ fontSize: 10, padding: '4px 10px' }} onClick={() => setSelectedId(null)}>✕ Fermer</button>
          </div>
          <div className="card-b" style={{ maxHeight: 352, overflowY: 'auto' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              <span className={`chip chip-${selected.pat}`}>{PAT_LABEL[selected.pat]}</span>
              <span className="chip" style={{ background: `${PRIO_COLOR[selected.priorite]}18`, color: PRIO_COLOR[selected.priorite] }}>{selected.priorite} — {PRIO_LABEL[selected.priorite]}</span>
              {selected.conformite && <span className="chip chip-red">{selected.conformite}</span>}
            </div>
            <p style={{ fontSize: 11, color: 'var(--g600)', lineHeight: 1.6, marginBottom: 12, padding: 10, background: 'var(--g50)', borderRadius: 6 }}>{selected.desc}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <ScoreRing score={selected.score} size={64} />
              <div>
                <div style={{ fontSize: 9, color: 'var(--g400)', fontWeight: 600, textTransform: 'uppercase' }}>Score IA</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: scoreColor(selected.score) }}>{selected.score}/100</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[
                { l: 'Montant', v: `${fmt(selected.montant)} k` },
                { l: 'ROI non-invest.', v: `${fmt(selected.roi)} k/an` },
                { l: 'Debut', v: `${selected.trim} ${selected.annee}` },
                { l: 'Duree', v: `${selected.duree} mois` },
              ].map(x => (
                <div key={x.l} style={{ padding: 8, background: 'var(--g50)', borderRadius: 6 }}>
                  <div style={{ fontSize: 8, color: 'var(--g400)', fontWeight: 700, textTransform: 'uppercase' }}>{x.l}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{x.v}</div>
                </div>
              ))}
            </div>

            <div className="slbl">Impacts — PSGA §4.2</div>
            <div style={{ height: 180 }}>
              <ResponsiveContainer>
                <RadarChart data={radarData} outerRadius={60}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" fontSize={8} />
                  <PolarRadiusAxis domain={[0, 3]} tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke={PAT_COLOR[selected.pat]} fill={PAT_COLOR[selected.pat]} fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>

    <div className="card" style={{ marginTop: 16 }}>
      <div className="card-h"><h3>Timeline des projets — Gantt simplifie</h3></div>
      <div className="card-b gantt-wrap">
        <div className="gantt-header">
          <div className="gantt-label-col">Projet</div>
          {ANNEES.slice(0, 4).map(y => (
            <div key={y} className="gantt-year-col">
              <span>{y}</span>
              <div className="gantt-quarters">
                {['T1', 'T2', 'T3', 'T4'].map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
        {funded.filter(p => p.annee <= 2029).map(p => {
          const startQ = ['T1', 'T2', 'T3', 'T4'].indexOf(p.trim)
          const startYear = p.annee - 2026
          const startPos = (startYear * 4 + startQ) / 16 * 100
          const widthPos = (p.duree / 3) / 16 * 100
          return (
            <div key={p.id} className="gantt-row">
              <div className="gantt-label-col">
                <span style={{ fontSize: 10, fontWeight: 600, color: p.funded ? 'var(--dk)' : 'var(--g400)' }}>{p.nom}</span>
              </div>
              <div className="gantt-bar-area">
                <div className="gantt-bar" style={{
                  left: `${startPos}%`, width: `${Math.min(widthPos, 100 - startPos)}%`,
                  background: p.funded ? PRIO_COLOR[p.priorite] : '#E5E7EB',
                  opacity: p.funded ? 1 : 0.5,
                }}>
                  <span>{fmt(p.montant)}k</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </>
}

// ─── PAGE: PRIORISATION ────────────────────────────────────

function PagePriorisation({ budget, projets, setProjets }) {
  const [selectedId, setSelectedId] = useState(null)
  const [filterPat, setFilterPat] = useState('all')
  const [filterPrio, setFilterPrio] = useState('all')
  const [modalProjet, setModalProjet] = useState(null) // null=ferme, 'new'=ajout, {projet}=edition

  const sorted = useMemo(() => [...projets].sort((a, b) => b.score - a.score), [projets])

  const funded = useMemo(() => {
    let remaining = budget
    return sorted.map(p => {
      const ok = remaining >= p.montant
      if (ok) remaining -= p.montant
      return { ...p, funded: ok }
    })
  }, [sorted, budget])

  const filtered = funded.filter(p =>
    (filterPat === 'all' || p.pat === filterPat) &&
    (filterPrio === 'all' || p.priorite === filterPrio)
  )

  const selected = selectedId ? projets.find(p => p.id === selectedId) : null
  const impactLabels = {
    sec: 'Securite', prod: 'Production', fin: 'Financier', soc: 'Social', img: 'Image',
    expl: 'Exploitation', cont: 'Contournement', cimp: 'Cout improd.', crem: 'Cout remise',
    red: 'Redondance', regl: 'Reglementaire'
  }

  const handleSaveProjet = (p) => {
    setProjets(prev => {
      const idx = prev.findIndex(x => x.id === p.id)
      if (idx >= 0) { const next = [...prev]; next[idx] = p; return next }
      return [p, ...prev]
    })
  }

  return <>
    {modalProjet && <ModalProjet
      onClose={() => setModalProjet(null)}
      onSave={handleSaveProjet}
      existing={modalProjet === 'new' ? null : modalProjet}
    />}

    <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {['all', 'P1', 'P2', 'P3'].map(p => (
          <button key={p} className={`filter-btn ${filterPrio === p ? 'active' : ''}`}
            style={filterPrio === p && p !== 'all' ? { background: `${PRIO_COLOR[p]}18`, color: PRIO_COLOR[p], borderColor: PRIO_COLOR[p] } : {}}
            onClick={() => setFilterPrio(p)}>
            {p === 'all' ? 'Toutes' : `${p} — ${PRIO_LABEL[p]}`}
          </button>
        ))}
      </div>
      <div style={{ width: 1, height: 24, background: 'var(--g200)', margin: '0 4px' }} />
      <div style={{ display: 'flex', gap: 4 }}>
        {['all', 'immo', 'ferro', 'io'].map(p => (
          <button key={p} className={`filter-btn ${filterPat === p ? 'active' : ''}`}
            style={filterPat === p && p !== 'all' ? { background: PAT_BG[p], color: PAT_COLOR[p], borderColor: PAT_COLOR[p] } : {}}
            onClick={() => setFilterPat(p)}>
            {p === 'all' ? 'Tous' : `${PAT_ICON[p]} ${PAT_LABEL[p]}`}
          </button>
        ))}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 11, color: 'var(--g500)' }}>{filtered.length} projet(s) — Enveloppe : <strong>{fmt(budget)} k</strong></span>
        <button className="btn btn-p" style={{ fontSize: 11, padding: '5px 14px' }} onClick={() => setModalProjet('new')}>+ Nouveau projet</button>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 420px' : '1fr', gap: 16 }}>
      <div className="card">
        <div className="card-b" style={{ padding: 0 }}>
          <table className="tbl">
            <thead><tr>
              <th style={{ width: 40 }}>#</th>
              <th style={{ width: 50 }}>Score</th>
              <th>Projet</th>
              <th>Patrimoine</th>
              <th>Priorite</th>
              <th style={{ textAlign: 'right' }}>Montant</th>
              <th style={{ textAlign: 'right' }}>ROI</th>
              <th>Statut</th>
            </tr></thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className={`prio-row ${selectedId === p.id ? 'prio-selected' : ''} ${!p.funded ? 'prio-deferred' : ''}`}
                  onClick={() => setSelectedId(selectedId === p.id ? null : p.id)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 700, color: 'var(--g400)' }}>#{i + 1}</td>
                  <td><ScoreRing score={p.score} size={32} /></td>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>{p.nom}</div>
                    <div style={{ fontSize: 10, color: 'var(--g400)' }}>{tcName(p.tc)} — {p.trim} {p.annee}</div>
                  </td>
                  <td><span className={`chip chip-${p.pat}`}>{PAT_LABEL[p.pat]}</span></td>
                  <td><span className="chip" style={{ background: `${PRIO_COLOR[p.priorite]}18`, color: PRIO_COLOR[p.priorite] }}>{p.priorite}</span></td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>{fmt(p.montant)} k</td>
                  <td style={{ textAlign: 'right', fontSize: 11, color: 'var(--g500)' }}>{fmt(p.roi)} k/an</td>
                  <td>
                    <span className={`chip ${p.funded ? 'chip-gn' : 'chip-gray'}`}>
                      {p.funded ? '✓ Finance' : '⏸ Differe'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="card detail-card fade">
          <div className="card-h">
            <h3>Detail projet</h3>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn btn-o" style={{ fontSize: 10, padding: '4px 10px' }} onClick={() => setModalProjet(selected)}>✎ Modifier</button>
              <button className="btn btn-o" style={{ fontSize: 10, padding: '4px 10px' }} onClick={() => setSelectedId(null)}>✕</button>
            </div>
          </div>
          <div className="card-b" style={{ maxHeight: 500, overflowY: 'auto' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{selected.nom}</h2>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              <span className={`chip chip-${selected.pat}`}>{PAT_LABEL[selected.pat]}</span>
              <span className="chip" style={{ background: `${PRIO_COLOR[selected.priorite]}18`, color: PRIO_COLOR[selected.priorite] }}>{selected.priorite} — {PRIO_LABEL[selected.priorite]}</span>
              {selected.conformite && <span className="chip chip-red">{selected.conformite}</span>}
            </div>

            <p style={{ fontSize: 11, color: 'var(--g600)', lineHeight: 1.6, marginBottom: 16, padding: 12, background: '#FFF7ED', borderRadius: 8, borderLeft: '3px solid var(--or)' }}>
              {selected.desc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
              <ScoreRing score={selected.score} size={80} />
              <div>
                <div style={{ fontSize: 9, color: 'var(--g400)', fontWeight: 600, textTransform: 'uppercase' }}>Score de priorisation IA</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: scoreColor(selected.score) }}>{selected.score}<span style={{ fontSize: 14, fontWeight: 500 }}>/100</span></div>
                <div style={{ fontSize: 10, color: 'var(--g500)', marginTop: 2 }}>Algorithme multi-criteres PSGA §4.2</div>
              </div>
            </div>

            <div className="slbl">Donnees financieres</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              {[
                { l: 'Investissement', v: `${fmt(selected.montant)} k`, c: 'var(--dk)' },
                { l: 'Cout non-intervention', v: `${fmt(selected.roi)} k/an`, c: '#DC2626' },
                { l: 'Debut prevu', v: `${selected.trim} ${selected.annee}`, c: 'var(--bl)' },
                { l: 'Duree estimee', v: `${selected.duree} mois`, c: 'var(--dk)' },
              ].map(x => (
                <div key={x.l} style={{ padding: 10, background: 'var(--g50)', borderRadius: 8, border: '1px solid var(--g100)' }}>
                  <div style={{ fontSize: 8, color: 'var(--g400)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{x.l}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, marginTop: 3, color: x.c }}>{x.v}</div>
                </div>
              ))}
            </div>

            <div className="slbl">Matrice d'impacts — PSGA §4.2</div>
            <div style={{ height: 220 }}>
              <ResponsiveContainer>
                <RadarChart data={Object.entries(selected.impacts).map(([k, v]) => ({
                  subject: impactLabels[k] || k, value: v
                }))} outerRadius={70}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" fontSize={9} />
                  <PolarRadiusAxis domain={[0, 3]} tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke={PAT_COLOR[selected.pat]} fill={PAT_COLOR[selected.pat]} fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {Object.entries(selected.impacts).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: 'var(--g50)', borderRadius: 4, fontSize: 10 }}>
                  <span style={{ fontWeight: 600, color: 'var(--g600)' }}>{impactLabels[k] || k}</span>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[0, 1, 2, 3].map(d => (
                      <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: d <= v ? CRIT_COLOR[v] : 'var(--g200)' }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  </>
}

// ─── PAGE: PLAN D'ACTIONS ──────────────────────────────────

function PagePlanActions({ budget, projets }) {
  const [expanded, setExpanded] = useState({ immo: true, ferro: true, io: true, 'immo-P1': true, 'immo-P2': true, 'immo-P3': true, 'ferro-P1': true, 'ferro-P2': true, 'ferro-P3': true, 'io-P1': true, 'io-P2': true, 'io-P3': true })

  const toggle = key => setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

  const funded = useMemo(() => {
    const sorted = [...projets].sort((a, b) => b.score - a.score)
    let remaining = budget
    return sorted.map(p => {
      const ok = remaining >= p.montant
      if (ok) remaining -= p.montant
      return { ...p, funded: ok }
    })
  }, [budget, projets])

  const fundedList = funded.filter(p => p.funded)
  const totalFunded = fundedList.reduce((s, p) => s + p.montant, 0)
  const totalBesoin = projets.reduce((s, p) => s + p.montant, 0)
  const totalRoi = fundedList.reduce((s, p) => s + p.roi, 0)

  const byPat = {}
  funded.forEach(p => {
    if (!byPat[p.pat]) byPat[p.pat] = {}
    if (!byPat[p.pat][p.priorite]) byPat[p.pat][p.priorite] = []
    byPat[p.pat][p.priorite].push(p)
  })

  const scenarioLabel = SCENARIOS.reduce((best, s) => {
    if (Math.abs(s.budgets[0] - budget) < Math.abs(best.budgets[0] - budget)) return s
    return best
  }, SCENARIOS[0])

  return <>
    <div className="plan-summary">
      <div className="plan-summary-main">
        <div className="plan-summary-icon">📑</div>
        <div>
          <h2>Plan d'investissement retenu</h2>
          <p>Scenario <strong>{scenarioLabel.label}</strong> — Enveloppe <strong>{fmt(budget)} k/an</strong> — {fundedList.length} projets finances sur {projets.length}</p>
        </div>
      </div>
      <div className="plan-summary-kpis">
        <div className="plan-kpi">
          <div className="plan-kpi-val" style={{ color: 'var(--gn)' }}>{fmt(totalFunded)} k</div>
          <div className="plan-kpi-label">Budget mobilise</div>
        </div>
        <div className="plan-kpi">
          <div className="plan-kpi-val" style={{ color: 'var(--bl)' }}>{Math.round(totalFunded / totalBesoin * 100)}%</div>
          <div className="plan-kpi-label">Couverture</div>
        </div>
        <div className="plan-kpi">
          <div className="plan-kpi-val" style={{ color: '#DC2626' }}>{fmt(totalRoi)} k/an</div>
          <div className="plan-kpi-label">Risque couvert</div>
        </div>
      </div>
    </div>

    <div className="plan-tree">
      {['immo', 'ferro', 'io'].map((pat, patIdx) => {
        const pats = byPat[pat] || {}
        const patProjects = Object.values(pats).flat()
        const patFunded = patProjects.filter(p => p.funded)
        const patTotal = patFunded.reduce((s, p) => s + p.montant, 0)
        const patPct = totalFunded > 0 ? Math.round(patTotal / totalFunded * 100) : 0
        const isLast = patIdx === 2

        return (
          <div key={pat} className="tree-branch">
            <div className={`tree-row tree-level-0 ${isLast ? 'tree-last' : ''}`} onClick={() => toggle(pat)}>
              <div className="tree-connector">
                <span className={`tree-vline ${isLast ? 'tree-vline-last' : ''}`} />
                <span className="tree-hline" />
              </div>
              <span className={`tree-arrow ${expanded[pat] ? 'open' : ''}`}>&#9654;</span>
              <span className="tree-icon-badge" style={{ background: PAT_BG[pat], color: PAT_COLOR[pat] }}>{PAT_ICON[pat]}</span>
              <span className="tree-title">{PAT_LABEL[pat]}</span>
              <span className="tree-amount-badge" style={{ background: PAT_BG[pat], color: PAT_COLOR[pat] }}>{fmt(patTotal)} k ({patPct}%)</span>
              <span className="tree-count-badge">{patFunded.length} projet(s) retenu(s)</span>
            </div>

            {expanded[pat] && ['P1', 'P2', 'P3'].map((prio, prioIdx) => {
              const projects = pats[prio] || []
              if (projects.length === 0) return null
              const prioKey = `${pat}-${prio}`
              const isLastPrio = prioIdx === ['P1', 'P2', 'P3'].filter(pr => (pats[pr] || []).length > 0).length - 1

              return (
                <div key={prioKey} className="tree-prio-group">
                  <div className={`tree-row tree-level-1 ${isLastPrio ? 'tree-last' : ''}`} onClick={() => toggle(prioKey)}>
                    <div className="tree-connector tree-connector-1">
                      {!isLast && <span className="tree-vline-parent" />}
                      <span className={`tree-vline ${isLastPrio ? 'tree-vline-last' : ''}`} />
                      <span className="tree-hline" />
                    </div>
                    <span className={`tree-arrow ${expanded[prioKey] ? 'open' : ''}`}>&#9654;</span>
                    <span className="tree-prio-dot" style={{ background: PRIO_COLOR[prio] }} />
                    <span className="tree-title-sm">{prio} — {PRIO_LABEL[prio]}</span>
                    <span className="tree-count-badge">({projects.length} projet{projects.length > 1 ? 's' : ''})</span>
                  </div>

                  {expanded[prioKey] && projects.map((p, projIdx) => {
                    const isLastProj = projIdx === projects.length - 1
                    return (
                      <div key={p.id} className={`tree-row tree-level-2 ${p.funded ? 'tree-funded' : 'tree-deferred'} ${isLastProj ? 'tree-last' : ''}`}>
                        <div className="tree-connector tree-connector-2">
                          {!isLast && <span className="tree-vline-parent" style={{ left: 0 }} />}
                          {!isLastPrio && <span className="tree-vline-parent" style={{ left: 28 }} />}
                          <span className={`tree-vline ${isLastProj ? 'tree-vline-last' : ''}`} />
                          <span className="tree-hline" />
                        </div>
                        <span className="tree-leaf" style={{ color: p.funded ? PRIO_COLOR[p.priorite] : 'var(--g300)' }}>●</span>
                        <div className="tree-project-content">
                          <span className="tree-proj-name">{p.nom}</span>
                          <span className="tree-proj-tc">{tcName(p.tc)}</span>
                        </div>
                        <span className="tree-proj-amount">{fmt(p.montant)} k</span>
                        <span className="tree-proj-date">{p.trim} {p.annee} → {p.duree}m</span>
                        <span className={`tree-proj-status ${p.funded ? 'st-funded' : 'st-deferred'}`}>
                          {p.funded ? '✓ Finance' : '⏸ Differe'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>

    <div className="card" style={{ marginTop: 16 }}>
      <div className="card-h"><h3>Synthese budgetaire</h3></div>
      <div className="card-b">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {['immo', 'ferro', 'io'].map(pat => {
            const patFunded = funded.filter(p => p.funded && p.pat === pat)
            const patTotal = patFunded.reduce((s, p) => s + p.montant, 0)
            const patDeferred = funded.filter(p => !p.funded && p.pat === pat)
            return (
              <div key={pat} style={{ padding: 14, borderRadius: 8, border: `1px solid ${PAT_COLOR[pat]}30`, background: `${PAT_BG[pat]}80` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 16 }}>{PAT_ICON[pat]}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: PAT_COLOR[pat] }}>{PAT_LABEL[pat]}</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: PAT_COLOR[pat] }}>{fmt(patTotal)} k</div>
                <div style={{ fontSize: 10, color: 'var(--g500)', marginTop: 2 }}>
                  {patFunded.length} projet(s) finance(s) — {patDeferred.length} differe(s)
                </div>
                <div style={{ marginTop: 8, height: 4, background: `${PAT_COLOR[pat]}20`, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${totalFunded > 0 ? patTotal / totalFunded * 100 : 0}%`, background: PAT_COLOR[pat], borderRadius: 2 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </>
}

// ─── PAGE: CYCLE DE VIE ────────────────────────────────────

function PageCycleVie() {
  const [phase, setPhase] = useState('exploit')
  return <div className="card">
    <div className="card-h"><h3>Cycle de vie des actifs IF — PSGA §3.2</h3><span className="ref">Prescriptions Cycle de vie</span></div>
    <div className="card-b">
      <div className="lc-flow">
        {CYCLE_VIE.map((s, i) => [
          i > 0 && <span className="lc-arrow" key={`a${i}`}>→</span>,
          <div key={s.id} className={`lc-step ${phase === s.id ? 'lc-active' : ''}`}
            style={{ cursor: 'pointer' }} onClick={() => setPhase(s.id)}>
            <div className="lc-ico">{s.icon}</div>
            <div className="lc-lbl">{s.label}</div>
            <div className="lc-sub">{s.ref}</div>
          </div>
        ])}
      </div>

      <div className="fade" key={phase}>
        {phase === 'besoin' && <div>
          <div className="slbl">Expression de besoin & emergence</div>
          <div className="fgrid">
            <div style={{ padding: 14, background: 'var(--g50)', borderRadius: 8, border: '1px solid var(--g100)' }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Patrimoine Ferroviaire</div>
              <ul style={{ fontSize: 11, color: 'var(--g600)', paddingLeft: 16, lineHeight: 1.7 }}>
                <li>IDFM via schemas directeurs de lignes (evolutions structurelles)</li>
                <li>Directions de lignes TN (regeneration, petite envergure)</li>
                <li>Extension notion schema directeur a toutes les politiques d'equipement</li>
              </ul>
            </div>
            <div style={{ padding: 14, background: 'var(--g50)', borderRadius: 8, border: '1px solid var(--g100)' }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Patrimoine Immobilier</div>
              <ul style={{ fontSize: 11, color: 'var(--g600)', paddingLeft: 16, lineHeight: 1.7 }}>
                <li>Demandes via outil CARNET DE SANTE par les TC habilites</li>
                <li>Compilation S1 par SNCF Immobilier puis plan de charge</li>
                <li>Pilotage trajectoire immobiliere par TN-GAIF</li>
                <li>Avis expert immobilier : favorable / report / defavorable</li>
              </ul>
            </div>
          </div>
          <div style={{ padding: 14, background: 'var(--g50)', borderRadius: 8, border: '1px solid var(--g100)', marginTop: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Patrimoine IO</div>
            <ul style={{ fontSize: 11, color: 'var(--g600)', paddingLeft: 16, lineHeight: 1.7 }}>
              <li>Besoin identifie par l'utilisateur (UP) ou l'etablissement (Methodes / Planification)</li>
              <li>Grands investissements via schemas directeurs TN en reponse a IDFM</li>
              <li>Decision basee sur : FEB, analyse/etude, evaluation cout/rentabilite</li>
            </ul>
          </div>
        </div>}

        {phase === 'exploit' && <div>
          <div className="slbl">Exploitation des actifs IF</div>
          <div className="fgrid">
            <div style={{ padding: 14, background: 'var(--g50)', borderRadius: 8, border: '1px solid var(--g100)' }}>
              <div style={{ fontWeight: 700, fontSize: 12 }}>Ferro</div>
              <p style={{ fontSize: 11, color: 'var(--g600)', marginTop: 4, lineHeight: 1.6 }}>
                TN largement autonome. Contrats prestation SNCF Reseau pour postes d'aiguillage (Joncherolles, Ardoines). A terme : exploitation en propre + documentation technique TN.
              </p>
            </div>
            <div style={{ padding: 14, background: 'var(--g50)', borderRadius: 8, border: '1px solid var(--g100)' }}>
              <div style={{ fontWeight: 700, fontSize: 12 }}>Immo</div>
              <p style={{ fontSize: 11, color: 'var(--g600)', marginTop: 4, lineHeight: 1.6 }}>
                Gestion via SNCF Immobilier (MOD/AMOA). Contrats de performance energie (CPE) pour l'optimisation energetique du parc.
              </p>
            </div>
          </div>
        </div>}

        {phase === 'maint' && <div>
          <div className="slbl">Strategie de maintenance</div>
          <div className="fgrid">
            <div style={{ padding: 14, background: 'var(--g50)', borderRadius: 8, border: '1px solid var(--g100)' }}>
              <div style={{ fontWeight: 700, fontSize: 12 }}>Ferro — Externalisation</div>
              <ul style={{ fontSize: 11, color: 'var(--g600)', paddingLeft: 16, lineHeight: 1.7 }}>
                <li>TSO : Bercy RBC, Ardoines, Villeneuve, Montrouge</li>
                <li>SFERIS : Levallois</li>
                <li>SNCF Reseau : petits sites en bout de ligne + signalisation electrique</li>
                <li>Enveloppe OGE confiee aux prestataires</li>
              </ul>
            </div>
            <div style={{ padding: 14, background: 'var(--g50)', borderRadius: 8, border: '1px solid var(--g100)' }}>
              <div style={{ fontWeight: 700, fontSize: 12 }}>Immo — Contrat E2MT</div>
              <ul style={{ fontSize: 11, color: 'var(--g600)', paddingLeft: 16, lineHeight: 1.7 }}>
                <li>Contrat multi-techniques SNCF Immobilier</li>
                <li>Perimetre IFG (Industriel Ferroviaire Gares)</li>
                <li>Gestion de site + Ingenierie EDT</li>
              </ul>
            </div>
          </div>
          <div style={{ padding: 14, background: 'var(--g50)', borderRadius: 8, border: '1px solid var(--g100)', marginTop: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 12 }}>IO — 3 schemas de maintenance</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {['Interne SNCF total', 'Externalisation totale', 'Mixte (schema privilegie PSGA)'].map((s, i) =>
                <div key={s} style={{ flex: 1, padding: 10, borderRadius: 6, textAlign: 'center', fontSize: 10, fontWeight: 600,
                  background: i === 2 ? 'var(--red-l)' : 'var(--g50)',
                  border: `1px solid ${i === 2 ? 'var(--red)' : 'var(--g200)'}`,
                  color: i === 2 ? 'var(--red)' : 'var(--g600)'
                }}>{s}</div>
              )}
            </div>
          </div>
        </div>}

        {phase === 'finvie' && <div>
          <div className="slbl">Fin de vie — Economie circulaire</div>
          <div style={{ padding: 14, background: '#F0FDF4', borderRadius: 8, border: '1px solid #86EFAC' }}>
            <p style={{ fontSize: 12, color: '#065F46', lineHeight: 1.7 }}>
              <strong>Directive PSGA :</strong> Privilegier l'economie circulaire dans la gestion de fin de vie. Maximiser la reutilisation, le recyclage et la valorisation des materiaux. Minimiser l'impact environnemental. Conformite RSE des investissements IF.
            </p>
          </div>
        </div>}

        {(phase === 'projet' || phase === 'recep') && <div>
          <div className="slbl">{phase === 'projet' ? 'Processus projet' : 'Reception & mise en service'}</div>
          <p style={{ fontSize: 12, color: 'var(--g600)', lineHeight: 1.7 }}>
            {phase === 'projet'
              ? 'Une fois le besoin valide, pilotage en direction centrale (GAIF) ou en DLT selon le montant. Appui sur le Design Book des voies de service. Programme fonctionnel, EP, processus projet, integration patrimoine.'
              : 'Production d\'un PV de reception + PV de mise en service/exploitation. Entree en perimetre de maintenance. Integration inventaire. Retour d\'experience (REX) pour alimenter le Design Book.'
            }
          </p>
        </div>}
      </div>
    </div>
  </div>
}

// ─── PAGE: GOUVERNANCE ─────────────────────────────────────

function PageGouvernance() {
  const [showAudit, setShowAudit] = useState(false)
  const swot = {
    forces: ['Entite dediee TN GA IF structuree', 'Volonte forte de la direction', 'Competences diverses / operateur historique'],
    faiblesses: ['Organisation historique / silos', 'Manque de standardisation entre TC', 'Expertise terrain liee a l\'humain (pas d\'automatisation)', 'Connaissance qui part avec les departs'],
    opportunites: ['Ouverture a la concurrence (gain RAO)', 'Gain d\'efficacite / investissement', 'Aide a la decision / standardisation'],
    risques: ['Mise en concurrence', 'Approches multiples selon proprietaire actif (GAIF, MR, Reseau, Gare & Co)'],
  }

  return <>
    <div className="card">
      <div className="card-h">
        <h3>RACI des processus GA IF — PSGA §4.4</h3>
        <span className="ref">Prescription Gouvernance & Comitologie</span>
      </div>
      <div className="card-b">
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl" style={{ fontSize: 11 }}>
            <thead><tr>
              <th>Processus</th><th>Dir. GAIF</th><th>Resp. Pat.</th><th>CoPat TM</th><th>Mainteneur ext.</th><th>IDFM</th><th>DG TN</th>
            </tr></thead>
            <tbody>
              {RACI_PROCESSUS.map(r => <tr key={r.process}>
                <td style={{ fontWeight: 700 }}>{r.process}</td>
                {[r.gaif, r.resp, r.copat, r.maint, r.idfm, r.dg].map((v, i) =>
                  <td key={i} style={{ textAlign: 'center', fontWeight: 700,
                    color: v.includes('R') ? 'var(--red)' : v.includes('A') ? 'var(--bl)' : v.includes('C') ? 'var(--or)' : 'var(--g400)'
                  }}>{v || '—'}</td>
                )}
              </tr>)}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12, fontSize: 10 }}>
          {[
            { l: 'R — Responsable', c: 'var(--red)' }, { l: 'A — Approbateur', c: 'var(--bl)' },
            { l: 'C — Consulte', c: 'var(--or)' }, { l: 'I — Informe', c: 'var(--g400)' }
          ].map(x => <span key={x.l} style={{ fontWeight: 700, color: x.c }}>{x.l}</span>)}
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-h"><h3>Outils SI du systeme de gestion d'actifs — PSGA §4.6</h3></div>
      <div className="card-b">
        <table className="tbl">
          <thead><tr><th>Patrimoine</th><th>Referencement</th><th>GMAO</th><th>Gestion d'actifs</th></tr></thead>
          <tbody>
            {OUTILS_SI.map(o => <tr key={o.patrimoine}>
              <td style={{ fontWeight: 700 }}>{o.patrimoine}</td>
              <td>{o.ref}</td><td>{o.gmao}</td>
              <td style={{ color: 'var(--g400)' }}>{o.ga}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>

    <div style={{ marginTop: 16 }}>
      <button className={`btn ${showAudit ? 'btn-p' : 'btn-o'}`} onClick={() => setShowAudit(!showAudit)}>
        {showAudit ? '▾' : '▸'} Audit ISO 55001 — Etat de maturite
      </button>
    </div>

    {showAudit && <div className="card fade" style={{ marginTop: 12 }}>
      <div className="card-h"><h3>Analyse SWOT du systeme de gestion d'actifs — Sept. 2024</h3></div>
      <div className="card-b">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { key: 'forces', title: 'Forces +', bg: '#F0FDF4', border: '#86EFAC', color: '#065F46' },
            { key: 'faiblesses', title: 'Faiblesses -', bg: '#FEF2F2', border: '#FCA5A5', color: '#991B1B' },
            { key: 'opportunites', title: 'Opportunites +', bg: '#EFF6FF', border: '#93C5FD', color: '#1D4ED8' },
            { key: 'risques', title: 'Risques -', bg: '#FEF3C7', border: '#FCD34D', color: '#92400E' },
          ].map(s =>
            <div key={s.key} style={{ padding: 14, borderRadius: 8, background: s.bg, border: `1px solid ${s.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: s.color, marginBottom: 8 }}>{s.title}</div>
              <ul style={{ fontSize: 11, color: s.color, paddingLeft: 16, lineHeight: 1.7 }}>
                {swot[s.key].map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div className="slbl" style={{ marginTop: 20 }}>Axes d'amelioration identifies</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Connaissance des actifs et de leurs etats', 'Creation et harmonisation des processus', 'Gouvernance'].map(a =>
            <div key={a} style={{ flex: 1, padding: 12, background: 'var(--red-l)', borderRadius: 8, border: '1px solid var(--red)', textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--red)' }}>
              {a}
            </div>
          )}
        </div>
      </div>
    </div>}
  </>
}

// ─── MAIN APP ──────────────────────────────────────────────

const PAGES = [
  { id: 'dash', label: 'Tableau de bord', icon: '📊' },
  { id: 'inv', label: 'Inventaire du parc', icon: '📋' },
  { id: 'crit', label: 'Matrice de criticite', icon: '⚠️' },
  { id: 'traj', label: 'Trajectoire investissement', icon: '📈' },
  { id: 'prio', label: 'Priorisation projets', icon: '🎯' },
  { id: 'plan', label: 'Plan d\'actions', icon: '📑' },
  { id: 'cyc', label: 'Cycle de vie', icon: '🔄' },
  { id: 'gouv', label: 'Gouvernance & RACI', icon: '👥' },
]

export default function App() {
  const [page, setPage] = useState('dash')
  const [budget, setBudget] = useState(8200)
  const [assets, setAssets] = useState([...DEMO_ASSETS])
  const [projets, setProjets] = useState([...PROJETS])

  return <>
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo-sncf.png" alt="SNCF Voyageurs" />
        <span>Gestion d'Actifs IF</span>
      </div>

      <div className="sidebar-section">Modules GA IF</div>
      <nav className="sidebar-nav">
        {PAGES.map(p =>
          <button key={p.id} className={`nav-item ${page === p.id ? 'active' : ''}`} onClick={() => setPage(p.id)}>
            <span className="nav-icon">{p.icon}</span>
            {p.label}
            {p.id === 'inv' && <span className="badge-count">{assets.length}</span>}
            {p.id === 'prio' && <span className="badge-count">{projets.length}</span>}
          </button>
        )}
      </nav>

      <div className="sidebar-section">Referentiels</div>
      <nav className="sidebar-nav">
        <button className="nav-item"><span className="nav-icon">📘</span>PSGA v2</button>
        <button className="nav-item"><span className="nav-icon">📄</span>Prescriptions</button>
      </nav>

      <div className="sidebar-bottom">
        <div className="user-row">
          <div className="avatar">ML</div>
          <div>
            <div className="user-name">M. Laurent</div>
            <div className="user-role">Expert GA IF — TN GAIF</div>
          </div>
        </div>
      </div>
    </aside>

    <div className="main">
      <div className="topbar">
        <h1>{PAGES.find(p => p.id === page)?.icon} {PAGES.find(p => p.id === page)?.label}</h1>
        <div className="topbar-badges">
          <span className="tbadge" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>ISO 55001</span>
          <span className="tbadge" style={{ background: 'var(--red-l)', color: 'var(--red)' }}>PSGA Transilien v2</span>
          <span className="tbadge" style={{ background: '#D1FAE5', color: '#065F46' }}>NF EN 13306</span>
        </div>
      </div>
      <div className="content">
        <div className="fade" key={page}>
          {page === 'dash' && <PageDashboard budget={budget} projets={projets} onNavigate={setPage} />}
          {page === 'inv' && <PageInventaire assets={assets} setAssets={setAssets} />}
          {page === 'crit' && <PageCriticite />}
          {page === 'traj' && <PageTrajectoire budget={budget} setBudget={setBudget} projets={projets} />}
          {page === 'prio' && <PagePriorisation budget={budget} projets={projets} setProjets={setProjets} />}
          {page === 'plan' && <PagePlanActions budget={budget} projets={projets} />}
          {page === 'cyc' && <PageCycleVie />}
          {page === 'gouv' && <PageGouvernance />}
        </div>
      </div>
    </div>
  </>
}
