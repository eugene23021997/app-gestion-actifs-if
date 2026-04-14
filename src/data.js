// ===== REFERENTIELS PSGA V2 / PRESCRIPTIONS =====

export const ENTITES = [
  { id: 'tn', label: 'Transilien (TN)', region: 'Ile-de-France', color: '#C8002D', bg: '#FFF0F3' },
  { id: 'ter', label: 'TER', region: 'National', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'ic', label: 'Intercites (IC)', region: 'National', color: '#7C3AED', bg: '#EDE9FE' },
];

export const TECHNICENTRES = [
  // TN — Ile-de-France
  { id: 'sdn', name: 'TC Industriel Saint-Denis', tranche: 'Nord', entite: 'tn' },
  { id: 'pno', name: 'TC Paris Nord', tranche: 'Nord', entite: 'tn' },
  { id: 'pes', name: 'TC Paris Est', tranche: 'Nord', entite: 'tn' },
  { id: 'vsg', name: 'TC Villeneuve Saint-Georges', tranche: 'Sud', entite: 'tn' },
  { id: 'ard', name: 'TC Les Ardoines', tranche: 'Sud', entite: 'tn' },
  { id: 'tmr', name: 'TC Trappes-Montrouge (Montrouge)', tranche: 'Sud', entite: 'tn' },
  { id: 'ttr', name: 'TC Trappes-Montrouge (Trappes)', tranche: 'Sud', entite: 'tn' },
  { id: 'lev', name: 'TC PSL — Levallois', tranche: 'Nord', entite: 'tn' },
  { id: 'vnd', name: 'TC PSL — Val Notre-Dame', tranche: 'Nord', entite: 'tn' },
  { id: 'ach', name: 'TC PSL — Acheres', tranche: 'Nord', entite: 'tn' },
  // TER — National (DTER)
  { id: 'lyon', name: 'TC Lyon-Oullins', tranche: 'DTER Aura', entite: 'ter' },
  { id: 'tlse', name: 'TC Toulouse', tranche: 'DTER Occitanie', entite: 'ter' },
  { id: 'dijo', name: 'TC Dijon-Perrigny', tranche: 'DTER BFC', entite: 'ter' },
  { id: 'mars', name: 'TC Marseille-Blancarde', tranche: 'DTER Sud PACA', entite: 'ter' },
  { id: 'nant', name: 'TC Nantes-Blottereau', tranche: 'DTER SVSA', entite: 'ter' },
  { id: 'bord', name: 'TC Bordeaux', tranche: 'DTER SVSA', entite: 'ter' },
  { id: 'lill', name: 'TC Lille-Hellemmes', tranche: 'DTER Hauts-de-France', entite: 'ter' },
  { id: 'stras', name: 'TC Strasbourg-Bischheim', tranche: 'DTER Grand Est', entite: 'ter' },
  // IC — National
  { id: 'mass', name: 'TC Massena Paris', tranche: 'IC National', entite: 'ic' },
  { id: 'cler', name: 'TC Clermont-Ferrand', tranche: 'IC National', entite: 'ic' },
  { id: 'toul', name: 'TC Toulouse-IC', tranche: 'IC National', entite: 'ic' },
];

export const PATRIMOINES = [
  { id: 'ferro', label: 'Ferroviaire', icon: '🛤', color: '#B45309', bg: '#FEF3C7' },
  { id: 'immo', label: 'Immobilier', icon: '🏗', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'io', label: 'Installations & Outillages', icon: '⚙', color: '#4338CA', bg: '#E0E7FF' },
];

export const GRANULARITE = {
  ferro: {
    niveaux: ['Famille d\'equipement', 'Sous-ensemble', 'Objet ferroviaire', 'Composant'],
    categories: [
      { id: 'vdv', label: 'Voies et appareils de voie', fonction: 'Guidage des trains' },
      { id: 'cat', label: 'Caténaires et EALE', fonction: 'Fourniture energie electrique' },
      { id: 'oa', label: 'Ouvrages d\'art / en terre', fonction: 'Support des voies' },
      { id: 'sig', label: 'Signalisation', fonction: 'Espacement entre trains' },
      { id: 'tel', label: 'Telecom', fonction: 'Transmission d\'informations' },
    ],
    critiques: ['Voies et ADV entree/sortie faisceau', 'Voies et ADV acces voies de travail', 'Appareils IFTE', 'Postes de signalisation N1/N0'],
  },
  immo: {
    niveaux: ['Unite Topographique (UT)', 'Lot (terrain)', 'Batiment', 'Local'],
    categories: [
      { id: 'abr', label: 'Abriter — Gros oeuvre', fonction: 'Structure / charpente / couverture / portes' },
      { id: 'ame', label: 'Amenager — Second oeuvre', fonction: 'Platerie, electricite, plomberie, cloisons' },
      { id: 'equ', label: 'Equiper — Equipements techniques', fonction: 'Ascenseurs, CVC, monte-charges' },
      { id: 'ach', label: 'Acheminer — Amenagements ext.', fonction: 'VRD, fluides, evacuation, flux routier' },
    ],
    critiques: ['Portes ferroviaires', 'Structure des batiments', 'Charpente / couverture', 'Monte-charges'],
    moyens: ['Circuit electrique (CF/Cf)', 'Reseaux humides / assainissement', 'Equipements lutte incendie'],
  },
  io: {
    niveaux: ['Categorie', 'Famille', 'Installation ou Outillage', 'Composant'],
    categories: [
      { id: 'lev', label: 'Levage et manutention', fonction: 'Installation + outillage specifique MR' },
      { id: 'pro', label: 'Protection personnel / MR', fonction: 'Mouvement ferroviaire + catenaire' },
      { id: 'fon', label: 'Fonctionnement du site', fonction: 'Outillages divers' },
      { id: 'mif', label: 'Production MR — MIF', fonction: 'Module Inventaire Fosse' },
      { id: 'mip', label: 'Production MR — MIP', fonction: 'Module Inventaire Passerelle' },
      { id: 'mit', label: 'Production MR — MIT', fonction: 'Module Inventaire Terre-Plein' },
    ],
    types: ['Installation (fixe, grande taille)', 'Outillage — Hors ESM (mobile)', 'Outillage — ESM (surveillance/mesure)'],
  },
};

export const OCCURRENCE = [
  { v: 0, label: 'Improbable', sub: 'Satisfaisant', color: '#10B981' },
  { v: 1, label: 'Rare', sub: 'Acceptable', color: '#F59E0B' },
  { v: 2, label: 'Probable', sub: 'Moyen', color: '#EA580C' },
  { v: 3, label: 'Frequente', sub: 'Insuffisant', color: '#DC2626' },
];

export const IMPACTS = {
  immo: [
    { id: 'sec', label: 'Securite', lo: 'Accident mineur', hi: 'Catastrophe, victimes' },
    { id: 'prod', label: 'Production', lo: 'Impact mineur', hi: 'Impossibilite sortie rames' },
    { id: 'fin', label: 'Financier', lo: '<2% budget IMMO', hi: '>1 000 k (>10%)' },
    { id: 'soc', label: 'Social', lo: 'Pas d\'impact', hi: 'Mouvement social' },
    { id: 'img', label: 'Image', lo: '<2%', hi: '>10%' },
  ],
  ferro: [
    { id: 'expl', label: 'Exploitation', lo: 'Pas d\'impact', hi: 'Impossibilite sortie rames' },
    { id: 'cont', label: 'Contournement', lo: 'Sans impact', hi: 'Aucune solution' },
    { id: 'cimp', label: 'Cout improductivite', lo: 'Faible % cout actif', hi: 'Eleve % cout actif' },
    { id: 'crem', label: 'Cout remise en etat', lo: 'Faible % cout actif', hi: 'Eleve % cout actif' },
  ],
  io: [
    { id: 'cont', label: 'Contournement', lo: 'Equipement disponible', hi: 'Aucune solution' },
    { id: 'red', label: 'Redondance', lo: 'IO equivalent', hi: 'Aucune' },
    { id: 'sec', label: 'Securite (SST/SEF)', lo: 'Aucun impact', hi: 'Impact majeur' },
    { id: 'fin', label: 'Cout IO', lo: 'Faible', hi: 'Tres eleve' },
    { id: 'regl', label: 'Verification reglementaire', lo: 'Non obligatoire', hi: 'Obligatoire' },
    { id: 'prod', label: 'Impact production', lo: 'Aucun', hi: 'Arret production' },
  ],
};

export const IMPACT_LEVELS = ['Faible', 'Moyen', 'Fort', 'Eleve'];

export const INDICATEURS_GA = [
  { id: 'dispo', label: 'Taux de disponibilite residuel', unite: '%',
    seuils_critique: { faible: 30, acceptable: 15, optimal: 0 },
    seuils_autre: { faible: 70, acceptable: 40, optimal: 0 },
    desc: 'Temps dispo pour production / temps total prevu' },
  { id: 'conform', label: 'Taux de non-conformite', unite: '%',
    seuils_critique: { faible: 5, acceptable: 1, optimal: 0 },
    seuils_autre: { faible: 8, acceptable: 5, optimal: 0 },
    desc: 'Actifs non conformes / total actifs x 100' },
  { id: 'cout', label: 'Cout gestion d\'actifs / rame', unite: 'EUR/rame',
    desc: 'Couts exploitation + maintenance + fin de vie / nb rames en service' },
];

export const INDICATEURS_PILOTAGE = [
  { cat: 'Performance maintenance', items: ['Taux de disponibilite', 'Taux d\'utilisation'] },
  { cat: 'Conformite / Securite', items: ['Nb incidents lie a un actif', 'Taux de conformite', 'Consommation ressources (eau, elec.)'] },
  { cat: 'Performance financiere', items: ['Cout maintenance', 'Cout de possession', 'Cout exploitation actif', 'Cout exploitation / m2'] },
];

export const OUTILS_SI = [
  { patrimoine: 'Ferroviaire', ref: 'GAIA / ARMEN', gmao: 'GMAO prestataires', ga: '—' },
  { patrimoine: 'Immobilier', ref: 'IMMOSIS', gmao: 'Carnet de Sante / IGO', ga: '—' },
  { patrimoine: 'IO', ref: 'Maximo v8', gmao: 'Maximo v8', ga: '—' },
  { patrimoine: 'Foncier', ref: 'GEOPRISM', gmao: '—', ga: '—' },
];

export const RACI_PROCESSUS = [
  { process: 'Suivi indicateurs', gaif: 'A', resp: 'R', copat: 'C', maint: 'I', idfm: 'I', dg: 'I' },
  { process: 'Mise a jour PSGA', gaif: 'R', resp: 'C', copat: 'I', maint: 'I', idfm: 'A', dg: 'I' },
  { process: 'Gestion Budget Actifs', gaif: 'R', resp: 'C', copat: 'A', maint: 'I', idfm: 'I', dg: 'C' },
  { process: 'Analyse Besoin', gaif: 'R', resp: 'C', copat: 'C', maint: '', idfm: 'A', dg: 'C' },
  { process: 'Strategie cycle de vie', gaif: 'C', resp: 'C', copat: 'R', maint: 'C', idfm: 'A', dg: 'C' },
  { process: 'Exploitation actif', gaif: 'I', resp: 'I', copat: 'C', maint: 'C', idfm: 'A/R', dg: 'I' },
  { process: 'Audit SGA', gaif: 'R', resp: 'C', copat: 'C', maint: 'I', idfm: 'I', dg: 'A/I' },
  { process: 'Gestion non-conformites', gaif: 'I', resp: 'I', copat: 'R', maint: 'I', idfm: 'I', dg: 'I' },
];

export const CYCLE_VIE = [
  { id: 'besoin', label: 'Analyse besoin', icon: '📋', ref: 'Prescription Investissement' },
  { id: 'projet', label: 'Processus projet', icon: '📐', ref: 'Schema directeur' },
  { id: 'recep', label: 'Reception / Mise en service', icon: '🏁', ref: 'PV reception + inventaire' },
  { id: 'exploit', label: 'Exploitation', icon: '⚡', ref: 'Prescription Exploitation' },
  { id: 'maint', label: 'Maintenance', icon: '🔧', ref: 'Prescription Maintenance' },
  { id: 'finvie', label: 'Fin de vie', icon: '♻️', ref: 'Prescription Fin de vie' },
];

export const DEMO_ASSETS = [
  { id: 1, nom: 'Hall A — Batiment principal', pat: 'immo', tc: 'sdn', cat: 'Abriter — Couverture', crit: 3, etat: 'Insuffisant', conform: false },
  { id: 2, nom: 'Voie 3-4 — APP entree faisceau', pat: 'ferro', tc: 'sdn', cat: 'Voies et ADV', crit: 3, etat: 'Moyen', conform: true },
  { id: 3, nom: 'Station lavage — Pompes ICPE', pat: 'io', tc: 'sdn', cat: 'Production MR — MIF', crit: 2, etat: 'Moyen', conform: false },
  { id: 4, nom: 'Batiment social B12', pat: 'immo', tc: 'sdn', cat: 'Amenager — Second oeuvre', crit: 2, etat: 'Moyen', conform: true },
  { id: 5, nom: 'Pont roulant fosse 2', pat: 'io', tc: 'sdn', cat: 'Levage et manutention', crit: 2, etat: 'Acceptable', conform: true },
  { id: 6, nom: 'Reseau EU/EP zone nord', pat: 'immo', tc: 'sdn', cat: 'Acheminer — VRD', crit: 1, etat: 'Acceptable', conform: true },
  { id: 7, nom: 'Tour en Fosse TF-01', pat: 'io', tc: 'vsg', cat: 'Production MR — MIF', crit: 3, etat: 'Insuffisant', conform: false },
  { id: 8, nom: 'Poste signalisation N1', pat: 'ferro', tc: 'ard', cat: 'Signalisation', crit: 3, etat: 'Moyen', conform: true },
  { id: 9, nom: 'Porte ferroviaire Hall C', pat: 'immo', tc: 'pno', cat: 'Abriter — Portes ferro', crit: 2, etat: 'Moyen', conform: true },
  { id: 10, nom: 'Banc mesure essieux BM-03', pat: 'io', tc: 'vsg', cat: 'Production MR — MIT', crit: 1, etat: 'Satisfaisant', conform: true },
  { id: 11, nom: 'Catenaire faisceau sud', pat: 'ferro', tc: 'ard', cat: 'Caténaires et EALE', crit: 2, etat: 'Acceptable', conform: true },
  { id: 12, nom: 'Monte-charge MC-02', pat: 'immo', tc: 'ttr', cat: 'Equiper — Equipements tech.', crit: 2, etat: 'Moyen', conform: false },
  // TER
  { id: 13, nom: 'Hall maintenance voie A', pat: 'immo', tc: 'lyon', cat: 'Abriter — Gros oeuvre', crit: 2, etat: 'Acceptable', conform: true },
  { id: 14, nom: 'Pont roulant PR-12', pat: 'io', tc: 'lyon', cat: 'Levage et manutention', crit: 3, etat: 'Moyen', conform: false },
  { id: 15, nom: 'Voie acces faisceau Est', pat: 'ferro', tc: 'tlse', cat: 'Voies et ADV', crit: 2, etat: 'Acceptable', conform: true },
  { id: 16, nom: 'Batiment administratif B1', pat: 'immo', tc: 'mars', cat: 'Amenager — Second oeuvre', crit: 1, etat: 'Satisfaisant', conform: true },
  { id: 17, nom: 'Station lavage AGC', pat: 'io', tc: 'nant', cat: 'Production MR — MIF', crit: 2, etat: 'Moyen', conform: true },
  // IC
  { id: 18, nom: 'Hall revision grandes lignes', pat: 'immo', tc: 'mass', cat: 'Abriter — Gros oeuvre', crit: 2, etat: 'Moyen', conform: true },
  { id: 19, nom: 'Tour en fosse TF-IC-01', pat: 'io', tc: 'mass', cat: 'Production MR — MIF', crit: 3, etat: 'Insuffisant', conform: false },
  { id: 20, nom: 'Catenaire faisceau nord', pat: 'ferro', tc: 'cler', cat: 'Caténaires et EALE', crit: 1, etat: 'Acceptable', conform: true },
];

// ===== DOMAINES D'INVESTISSEMENT =====

export const DOMAINES = [
  { id: 'if', label: 'Installations Fixes', icon: '🔧', color: '#C8002D', bg: '#FFF0F3' },
  { id: 'construction', label: 'Construction neuve', icon: '🏗', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'capacitaire', label: 'Capacitaire', icon: '🚄', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'digital', label: 'Transformation digitale', icon: '💻', color: '#0D9488', bg: '#CCFBF1' },
  { id: 'rse', label: 'RSE / Environnement', icon: '🌱', color: '#059669', bg: '#D1FAE5' },
];

export const IMPACTS_GENERIQUES = [
  { id: 'sec', label: 'Securite', lo: 'Aucun impact', hi: 'Impact majeur' },
  { id: 'prod', label: 'Production', lo: 'Impact mineur', hi: 'Arret production' },
  { id: 'fin', label: 'Financier', lo: 'Faible', hi: 'Tres eleve' },
  { id: 'soc', label: 'Social', lo: 'Pas d\'impact', hi: 'Mouvement social' },
  { id: 'img', label: 'Image', lo: 'Pas d\'impact', hi: 'Impact majeur' },
];

// ===== PROJETS D'INVESTISSEMENT =====

export const PROJETS = [
  // --- Domaine : Installations Fixes ---
  {
    id: 1, nom: 'Refection toiture Hall A',
    desc: 'Refection complete de la toiture du hall A suite aux infiltrations repetees. Structure metallique vieillissante avec risque d\'effondrement partiel identifie lors du DTA amiante.',
    domaine: 'if', pat: 'immo', cat: 'Abriter — Couverture', tc: 'sdn',
    montant: 1850, score: 92, priorite: 'P1',
    annee: 2026, trim: 'T2', duree: 18,
    impacts: { sec: 3, prod: 2, fin: 2, soc: 1, img: 2 },
    roi: 420, conformite: 'DTA Amiante', phase: 'Maint',
  },
  {
    id: 2, nom: 'Renouvellement voies ferrees 3 & 4',
    desc: 'Renouvellement complet des voies 3 et 4 du faisceau d\'entree. Usure avancee des rails et traverses, ralentissements imposes a 30 km/h.',
    domaine: 'if', pat: 'ferro', cat: 'Voies et ADV', tc: 'sdn',
    montant: 2300, score: 95, priorite: 'P1',
    annee: 2026, trim: 'T1', duree: 24,
    impacts: { expl: 3, cont: 2, cimp: 3, crem: 2 },
    roi: 580, conformite: null, phase: 'Maint',
  },
  {
    id: 3, nom: 'Remplacement Tour en Fosse TF-01',
    desc: 'Remplacement complet de la tour en fosse TF-01 arrivee en fin de vie. Pannes recurrentes impactant la production maintenance.',
    domaine: 'if', pat: 'io', cat: 'Production MR — MIF', tc: 'vsg',
    montant: 890, score: 88, priorite: 'P1',
    annee: 2026, trim: 'T3', duree: 12,
    impacts: { cont: 3, red: 2, sec: 2, fin: 2, regl: 1, prod: 3 },
    roi: 310, conformite: null, phase: 'Maint',
  },
  {
    id: 4, nom: 'Mise en conformite ICPE station lavage',
    desc: 'Mise en conformite environnementale ICPE de la station de lavage. Echeance reglementaire DREAL fixee au 31/12/2026.',
    domaine: 'if', pat: 'io', cat: 'Production MR — MIF', tc: 'sdn',
    montant: 620, score: 82, priorite: 'P2',
    annee: 2026, trim: 'T2', duree: 8,
    impacts: { cont: 1, red: 1, sec: 1, fin: 2, regl: 3, prod: 2 },
    roi: 185, conformite: 'ICPE', phase: 'Maint',
  },
  {
    id: 5, nom: 'Rehabilitation batiment social B12',
    desc: 'Rehabilitation complete du batiment social B12 (vestiaires, sanitaires, salle de repos). Conditions de travail degradees signalees par le CHSCT.',
    domaine: 'if', pat: 'immo', cat: 'Amenager — Second oeuvre', tc: 'sdn',
    montant: 480, score: 71, priorite: 'P2',
    annee: 2026, trim: 'T4', duree: 10,
    impacts: { sec: 1, prod: 1, fin: 1, soc: 3, img: 2 },
    roi: 95, conformite: null, phase: 'Maint',
  },
  {
    id: 6, nom: 'Remplacement pont roulant fosse 2',
    desc: 'Remplacement du pont roulant de la fosse 2 arrive en limite de duree de vie. Rapport de controle technique defavorable.',
    domaine: 'if', pat: 'io', cat: 'Levage et manutention', tc: 'sdn',
    montant: 390, score: 76, priorite: 'P2',
    annee: 2027, trim: 'T1', duree: 6,
    impacts: { cont: 2, red: 1, sec: 2, fin: 1, regl: 2, prod: 2 },
    roi: 120, conformite: 'CT defavorable', phase: 'Maint',
  },
  {
    id: 7, nom: 'Mise aux normes electriques Hall B',
    desc: 'Remise aux normes de l\'installation electrique du Hall B. Non-conformites identifiees lors du diagnostic C13.200.',
    domaine: 'if', pat: 'immo', cat: 'Amenager — Electricite', tc: 'sdn',
    montant: 520, score: 74, priorite: 'P2',
    annee: 2027, trim: 'T1', duree: 8,
    impacts: { sec: 2, prod: 1, fin: 1, soc: 1, img: 1 },
    roi: 145, conformite: 'NF C13-200', phase: 'Maint',
  },
  {
    id: 8, nom: 'Regeneration catenaire faisceau sud',
    desc: 'Regeneration de l\'alimentation catenaire du faisceau sud. Vetuste des supports et de la ligne de contact.',
    domaine: 'if', pat: 'ferro', cat: 'Caténaires et EALE', tc: 'ard',
    montant: 1400, score: 69, priorite: 'P2',
    annee: 2027, trim: 'T2', duree: 14,
    impacts: { expl: 2, cont: 2, cimp: 2, crem: 2 },
    roi: 280, conformite: null, phase: 'Maint',
  },
  {
    id: 9, nom: 'Reseaux eau / EP zone Nord',
    desc: 'Renovation des reseaux d\'eau potable et d\'eaux pluviales de la zone Nord. Fuites recurrentes et risque de contamination.',
    domaine: 'if', pat: 'immo', cat: 'Acheminer — VRD', tc: 'sdn',
    montant: 275, score: 58, priorite: 'P3',
    annee: 2027, trim: 'T3', duree: 6,
    impacts: { sec: 1, prod: 1, fin: 1, soc: 1, img: 1 },
    roi: 65, conformite: null, phase: 'Maint',
  },
  {
    id: 10, nom: 'Renouvellement catenaire Nord',
    desc: 'Renouvellement complet de la catenaire du faisceau Nord. Programme pluriannuel de regeneration des EALE.',
    domaine: 'if', pat: 'ferro', cat: 'Caténaires et EALE', tc: 'sdn',
    montant: 1800, score: 40, priorite: 'P3',
    annee: 2030, trim: 'T1', duree: 18,
    impacts: { expl: 2, cont: 1, cimp: 2, crem: 2 },
    roi: 320, conformite: null, phase: 'Maint',
  },
  // --- Domaine : Construction neuve ---
  {
    id: 11, nom: 'Construction nouveau TC Sud-Est',
    desc: 'Construction d\'un nouveau technicentre en zone Sud-Est pour absorber la montee en charge du RER NG. Site de 4 hectares, 8 voies de maintenance.',
    domaine: 'construction', pat: null, cat: 'Technicentre', tc: 'vsg',
    montant: 45000, score: 85, priorite: 'P1',
    annee: 2026, trim: 'T1', duree: 48,
    impacts: { sec: 1, prod: 3, fin: 3, soc: 2, img: 3 },
    roi: 2800, conformite: null, phase: 'Projet',
  },
  {
    id: 12, nom: 'Extension site Trappes — 4 voies',
    desc: 'Extension du technicentre de Trappes avec 4 voies supplementaires couvertes pour la maintenance du futur materiel roulant.',
    domaine: 'construction', pat: null, cat: 'Extension site', tc: 'ttr',
    montant: 18500, score: 72, priorite: 'P2',
    annee: 2027, trim: 'T2', duree: 36,
    impacts: { sec: 1, prod: 3, fin: 2, soc: 2, img: 2 },
    roi: 1200, conformite: null, phase: 'Projet',
  },
  {
    id: 13, nom: 'Atelier de revision RER NG',
    desc: 'Creation d\'un atelier dedie a la revision des rames RER NG au sein du TC Saint-Denis. Equipements specifiques nouvelle generation.',
    domaine: 'construction', pat: null, cat: 'Atelier', tc: 'sdn',
    montant: 12000, score: 68, priorite: 'P2',
    annee: 2028, trim: 'T1', duree: 24,
    impacts: { sec: 1, prod: 3, fin: 2, soc: 1, img: 2 },
    roi: 950, conformite: null, phase: 'Projet',
  },
  // --- Domaine : Capacitaire ---
  {
    id: 14, nom: 'Adaptation voies longues RER NG',
    desc: 'Allongement des voies de maintenance pour accueillir les rames RER NG (130m). Modification des gabarits et des installations de voie.',
    domaine: 'capacitaire', pat: null, cat: 'Adaptation materiel', tc: 'sdn',
    montant: 5600, score: 80, priorite: 'P1',
    annee: 2026, trim: 'T3', duree: 18,
    impacts: { sec: 1, prod: 3, fin: 2, soc: 1, img: 2 },
    roi: 750, conformite: null, phase: 'Projet',
  },
  {
    id: 15, nom: 'Augmentation capacite lavage',
    desc: 'Doublement de la capacite de la station de lavage pour repondre a l\'augmentation du parc roulant (+30% en 2028).',
    domaine: 'capacitaire', pat: null, cat: 'Capacite production', tc: 'sdn',
    montant: 2800, score: 65, priorite: 'P2',
    annee: 2027, trim: 'T4', duree: 14,
    impacts: { sec: 0, prod: 3, fin: 2, soc: 1, img: 1 },
    roi: 380, conformite: null, phase: 'Projet',
  },
  // --- Domaine : Transformation digitale ---
  {
    id: 16, nom: 'Deploiement IoT maintenance predictive',
    desc: 'Installation de capteurs IoT sur les actifs critiques (vibrations, temperature, usure) et deploiement d\'une plateforme de maintenance predictive basee sur l\'IA.',
    domaine: 'digital', pat: null, cat: 'IoT / IA', tc: 'sdn',
    montant: 3200, score: 73, priorite: 'P2',
    annee: 2027, trim: 'T1', duree: 18,
    impacts: { sec: 1, prod: 2, fin: 2, soc: 1, img: 2 },
    roi: 520, conformite: null, phase: 'Projet',
  },
  {
    id: 17, nom: 'Jumeau numerique TC Saint-Denis',
    desc: 'Modelisation 3D/BIM du technicentre Saint-Denis pour optimiser les flux, planifier les interventions et former les agents.',
    domaine: 'digital', pat: null, cat: 'BIM / Jumeau numerique', tc: 'sdn',
    montant: 1500, score: 52, priorite: 'P3',
    annee: 2028, trim: 'T2', duree: 12,
    impacts: { sec: 0, prod: 1, fin: 1, soc: 1, img: 2 },
    roi: 180, conformite: null, phase: 'Projet',
  },
  // --- Domaine : RSE / Environnement ---
  {
    id: 18, nom: 'Plan decarbonation sites Nord',
    desc: 'Programme de decarbonation des 5 sites de la tranche Nord : remplacement chaufferies gaz par PAC, panneaux solaires toitures, LED, isolation thermique.',
    domaine: 'rse', pat: null, cat: 'Decarbonation', tc: 'sdn',
    montant: 4200, score: 70, priorite: 'P2',
    annee: 2027, trim: 'T1', duree: 30,
    impacts: { sec: 0, prod: 0, fin: 2, soc: 1, img: 3 },
    roi: 350, conformite: 'RE2020', phase: 'Projet',
  },
  {
    id: 19, nom: 'Station de recyclage eaux usees',
    desc: 'Installation d\'une station de traitement et recyclage des eaux de lavage pour reduire la consommation d\'eau de 60%.',
    domaine: 'rse', pat: null, cat: 'Eau / Dechets', tc: 'sdn',
    montant: 1800, score: 58, priorite: 'P3',
    annee: 2028, trim: 'T3', duree: 10,
    impacts: { sec: 0, prod: 0, fin: 1, soc: 1, img: 2 },
    roi: 220, conformite: 'ICPE', phase: 'Projet',
  },
  // --- TER ---
  {
    id: 20, nom: 'Remplacement pont roulant PR-12 Lyon',
    desc: 'Remplacement du pont roulant PR-12 arrive en fin de vie. Controle technique defavorable, impact direct sur la production maintenance TER Aura.',
    domaine: 'if', pat: 'io', cat: 'Levage et manutention', tc: 'lyon',
    montant: 450, score: 84, priorite: 'P1',
    annee: 2026, trim: 'T3', duree: 8,
    impacts: { cont: 3, red: 2, sec: 2, fin: 1, regl: 2, prod: 3 },
    roi: 180, conformite: 'CT defavorable', phase: 'Maint',
  },
  {
    id: 21, nom: 'Renovation toiture hall maintenance Nantes',
    desc: 'Refection de la toiture du hall de maintenance du TC Nantes-Blottereau. Infiltrations repetees impactant les conditions de travail.',
    domaine: 'if', pat: 'immo', cat: 'Abriter — Couverture', tc: 'nant',
    montant: 780, score: 72, priorite: 'P2',
    annee: 2027, trim: 'T1', duree: 12,
    impacts: { sec: 2, prod: 1, fin: 2, soc: 2, img: 1 },
    roi: 195, conformite: null, phase: 'Maint',
  },
  {
    id: 22, nom: 'Mise en conformite ICPE station lavage Toulouse',
    desc: 'Mise en conformite environnementale de la station de lavage TER Toulouse. Echeance reglementaire DREAL.',
    domaine: 'if', pat: 'io', cat: 'Production MR — MIF', tc: 'tlse',
    montant: 340, score: 68, priorite: 'P2',
    annee: 2027, trim: 'T2', duree: 6,
    impacts: { cont: 1, red: 1, sec: 1, fin: 1, regl: 3, prod: 1 },
    roi: 85, conformite: 'ICPE', phase: 'Maint',
  },
  // --- IC ---
  {
    id: 23, nom: 'Remplacement tour en fosse TF-IC-01 Massena',
    desc: 'Remplacement de la tour en fosse principale du TC Massena. Pannes recurrentes, impact sur la maintenance des rames Intercites.',
    domaine: 'if', pat: 'io', cat: 'Production MR — MIF', tc: 'mass',
    montant: 920, score: 86, priorite: 'P1',
    annee: 2026, trim: 'T4', duree: 10,
    impacts: { cont: 3, red: 2, sec: 2, fin: 2, regl: 1, prod: 3 },
    roi: 340, conformite: null, phase: 'Maint',
  },
];

export const SCENARIOS = [
  { id: 'degrade', label: 'Degrade', color: '#DC2626', desc: 'Budget minimal — maintenance curative uniquement',
    budgets: [5000, 5200, 5400, 5500, 5600, 5800] },
  { id: 'contraint', label: 'Contraint', color: '#F59E0B', desc: 'Budget reduit — priorisation stricte P1',
    budgets: [6500, 6800, 7000, 7200, 7500, 7800] },
  { id: 'cible', label: 'Cible', color: '#10B981', desc: 'Budget optimal — couverture P1 + P2',
    budgets: [8200, 8500, 8800, 9100, 9400, 9800] },
  { id: 'besoin', label: 'Besoin total', color: '#3B82F6', desc: 'Couverture integrale de tous les besoins identifies',
    budgets: [12000, 12500, 13000, 13500, 14000, 14500] },
];

export const ANNEES = [2026, 2027, 2028, 2029, 2030, 2031];

// ===== INDUSTRIALISATION GAIF =====

// --- Feuille de route ---

export const PHASES_MISSION = [
  {
    id: 'phase1', label: 'Phase 1 — Diagnostic & feuille de route', moisDebut: 1, moisFin: 1,
    color: '#C8002D', bg: '#FFF0F3',
    desc: 'Diagnostic complet de l\'organisation actuelle, cartographie des processus et ecarts ISO 55001. Production de la feuille de route d\'industrialisation.',
    jalons: [
      { label: 'Lancement mission & cadrage', mois: 1, fait: true },
      { label: 'Fin des entretiens individuels', mois: 1, fait: true },
      { label: 'Restitution diagnostic au CODIR', mois: 1, fait: false },
      { label: 'Validation feuille de route', mois: 1, fait: false },
    ],
    livrables: ['Rapport diagnostic complet', 'Matrice de maturite ISO 55001', 'Organisation cible a 3 ans', 'Feuille de route industrialisation', 'Analyse adequation ressources/competences'],
    actions: [
      {
        theme: 'Cadrage & gouvernance de la mission',
        icon: '🎯',
        items: [
          { label: 'Reunion de lancement avec le CODIR GAIF', mois: 1, semaine: 1 },
          { label: 'Definition du perimetre, jalons et instances de pilotage', mois: 1, semaine: 1 },
          { label: 'Mise en place du dispositif PMO (outils, reporting, rituels)', mois: 1, semaine: 1 },
        ],
      },
      {
        theme: 'Entretiens & recueil de donnees',
        icon: '🎤',
        items: [
          { label: 'Entretiens CODIR : Directeur GAIF + 2 collaborateurs directs', mois: 1, semaine: 1 },
          { label: 'Entretiens individuels : 4 experts de l\'entite (1h chacun)', mois: 1, semaine: 2 },
          { label: 'Entretien Franck Montereau — topologie des talents', mois: 1, semaine: 2 },
          { label: 'Entretiens A2P : Directeur GPI + Secretaire technique (1h-1h30)', mois: 1, semaine: 2 },
          { label: 'Collecte documentaire : PSGA, prescriptions, organigrammes, comitologies', mois: 1, semaine: 1 },
        ],
      },
      {
        theme: 'Diagnostic organisationnel',
        icon: '🔍',
        items: [
          { label: 'Analyse de l\'organisation actuelle GAIF TN et des interfaces GPI', mois: 1, semaine: 2 },
          { label: 'Cartographie des processus existants (cycle de vie, gouvernance, pilotage)', mois: 1, semaine: 2 },
          { label: 'Evaluation de la maturite des processus selon ISO 55001', mois: 1, semaine: 3 },
          { label: 'Analyse des outils SI en place (Maximo, GAIA, IMMOSIS, Carnet de Sante)', mois: 1, semaine: 3 },
          { label: 'Identification des forces, faiblesses, opportunites et risques (SWOT)', mois: 1, semaine: 3 },
        ],
      },
      {
        theme: 'Analyse ressources & competences',
        icon: '🎓',
        items: [
          { label: 'Cartographie des competences actuelles (savoir, savoir-etre, niveaux)', mois: 1, semaine: 2 },
          { label: 'Definition du referentiel de competences cible pour l\'entite nationale', mois: 1, semaine: 3 },
          { label: 'Analyse des ecarts et identification des besoins (recrutement, formation)', mois: 1, semaine: 3 },
        ],
      },
      {
        theme: 'Production des livrables Phase 1',
        icon: '📄',
        items: [
          { label: 'Redaction du rapport de diagnostic complet', mois: 1, semaine: 3 },
          { label: 'Proposition d\'organisation cible a 3 ans et trajectoire de mise en oeuvre', mois: 1, semaine: 4 },
          { label: 'Mise a jour du catalogue de services de l\'entite', mois: 1, semaine: 4 },
          { label: 'Proposition d\'indicateurs de performance (Clients, Agilite, Juste besoin, Innovation)', mois: 1, semaine: 4 },
          { label: 'Materialisation de l\'industrialisation : processus, outils, methodes + plan d\'actions', mois: 1, semaine: 4 },
          { label: 'Restitution formelle au CODIR et validation de la feuille de route', mois: 1, semaine: 4 },
        ],
      },
    ],
  },
  {
    id: 'phase2', label: 'Phase 2 — Mise en oeuvre', moisDebut: 2, moisFin: 7,
    color: '#3B82F6', bg: '#EFF6FF',
    desc: 'Deploiement des processus standardises, du catalogue de services et des outils. Formation des equipes TER pilotes et integration IC.',
    jalons: [
      { label: 'Lancement PMO & comitologie', mois: 2, fait: false },
      { label: 'Catalogue de services v1 deploye', mois: 3, fait: false },
      { label: 'Processus standardises valides', mois: 4, fait: false },
      { label: 'Formation equipes TER pilotes', mois: 5, fait: false },
      { label: 'KPIs industrialisation operationnels', mois: 6, fait: false },
      { label: 'Revue a mi-parcours avec CODIR', mois: 7, fait: false },
    ],
    livrables: ['Processus standardises deployes', 'Catalogue de services v1', 'Referentiel competences', 'Tableau de bord KPIs', 'Plan de formation', 'Outils de pilotage operationnels'],
    actions: [
      {
        theme: 'Mise en place du dispositif PMO',
        icon: '📋',
        items: [
          { label: 'Installation de la comitologie de suivi (COPIL mensuel, points hebdo)', mois: 2, semaine: 1 },
          { label: 'Mise en place des outils de pilotage (tableau de bord, suivi jalons, risques)', mois: 2, semaine: 1 },
          { label: 'Definition des roles et responsabilites de l\'equipe projet', mois: 2, semaine: 1 },
          { label: 'Planning detaille des 6 mois avec jalons intermediaires', mois: 2, semaine: 2 },
        ],
      },
      {
        theme: 'Standardisation des processus',
        icon: '⚙',
        items: [
          { label: 'Formalisation des processus cibles : inventaire, criticite, priorisation, maintenance', mois: 2, semaine: 2 },
          { label: 'Redaction des fiches processus standardisees (entrees, sorties, RACI, outils)', mois: 3, semaine: 1 },
          { label: 'Harmonisation des methodes entre patrimoines (Ferro, Immo, IO)', mois: 3, semaine: 2 },
          { label: 'Validation des processus par les responsables de poles (Ex.Pat, EMG)', mois: 4, semaine: 1 },
          { label: 'Test des processus sur le perimetre TN avant extension', mois: 4, semaine: 2 },
        ],
      },
      {
        theme: 'Deploiement du catalogue de services',
        icon: '📦',
        items: [
          { label: 'Finalisation du catalogue de services v1 (missions FREE et FIXE)', mois: 2, semaine: 2 },
          { label: 'Definition des niveaux de service (SLA) par prestation', mois: 3, semaine: 1 },
          { label: 'Communication du catalogue aux parties prenantes (BU, SD, IDFM)', mois: 3, semaine: 2 },
          { label: 'Mise en place du processus de demande et suivi des prestations', mois: 3, semaine: 2 },
        ],
      },
      {
        theme: 'Outils SI & transformation digitale',
        icon: '💻',
        items: [
          { label: 'Audit des outils SI actuels et identification des besoins d\'evolution', mois: 2, semaine: 2 },
          { label: 'Harmonisation des referentiels (GAIA/Maximo/IMMOSIS) entre entites', mois: 3, semaine: 1 },
          { label: 'Conception du tableau de bord de pilotage industrialisation', mois: 4, semaine: 1 },
          { label: 'Parametrage des KPIs dans les outils de reporting', mois: 5, semaine: 1 },
        ],
      },
      {
        theme: 'Formation & montee en competences',
        icon: '🎓',
        items: [
          { label: 'Elaboration du plan de formation (ISO 55001, outils SI, conduite du changement)', mois: 3, semaine: 1 },
          { label: 'Construction des supports de formation et guides utilisateurs', mois: 3, semaine: 2 },
          { label: 'Formation des equipes TN aux processus standardises', mois: 4, semaine: 1 },
          { label: 'Formation des equipes TER pilotes (Aura, SVSA)', mois: 5, semaine: 1 },
          { label: 'Sessions de coaching pour les managers de proximite', mois: 5, semaine: 2 },
        ],
      },
      {
        theme: 'Extension TER & IC (sites pilotes)',
        icon: '🚄',
        items: [
          { label: 'Diagnostic specifique des sites TER pilotes (Lyon-Oullins, Nantes)', mois: 3, semaine: 1 },
          { label: 'Adaptation des processus au contexte TER (specificites regionales)', mois: 4, semaine: 1 },
          { label: 'Deploiement des processus standardises sur sites TER pilotes', mois: 5, semaine: 1 },
          { label: 'Premier diagnostic IC (TC Massena, TC Clermont)', mois: 5, semaine: 2 },
          { label: 'Collecte des premiers retours terrain et ajustements', mois: 6, semaine: 1 },
        ],
      },
      {
        theme: 'Pilotage & KPIs',
        icon: '📊',
        items: [
          { label: 'Definition detaillee des 4 marqueurs (Clients, Agilite, Juste besoin, Innovation)', mois: 4, semaine: 1 },
          { label: 'Mise en place de la collecte de donnees pour chaque KPI', mois: 5, semaine: 1 },
          { label: 'Premier tableau de bord KPIs industrialisation', mois: 6, semaine: 1 },
          { label: 'Revue a mi-parcours : bilan, ajustements, go/no-go Phase 2bis', mois: 7, semaine: 1 },
        ],
      },
    ],
  },
  {
    id: 'phase2bis', label: 'Phase 2bis — Accompagnement', moisDebut: 7, moisFin: 13,
    color: '#10B981', bg: '#D1FAE5',
    desc: 'Accompagnement terrain des equipes TER et IC dans la mise en oeuvre des nouveaux processus et outils. Deploiement national et transfert vers l\'equipe interne.',
    jalons: [
      { label: 'Lancement accompagnement terrain', mois: 7, fait: false },
      { label: 'Extension TER 5 DTER validee', mois: 9, fait: false },
      { label: 'REX & ajustements processus', mois: 10, fait: false },
      { label: 'Deploiement national IC effectif', mois: 11, fait: false },
      { label: 'Transfert PMO vers equipe interne', mois: 12, fait: false },
      { label: 'Bilan final & validation organisation cible', mois: 13, fait: false },
    ],
    livrables: ['Bilan accompagnement', 'Organisation cible A2P validee', 'Feuille de route 3 ans finalisee', 'Guide de perennisation', 'Retour d\'experience capitalise'],
    actions: [
      {
        theme: 'Accompagnement terrain TER',
        icon: '🤝',
        items: [
          { label: 'Presence terrain sur sites TER pilotes (Aura, SVSA) — coaching equipes', mois: 7, semaine: 2 },
          { label: 'Animation d\'ateliers pratiques sur les processus standardises', mois: 8, semaine: 1 },
          { label: 'Accompagnement des coordinateurs GA IF TER dans leur prise de poste', mois: 8, semaine: 2 },
          { label: 'Supervision du deploiement sur les 5 DTER restantes (HdF, Grand Est, BFC, Occitanie, Sud PACA)', mois: 9, semaine: 1 },
          { label: 'Resolution des irritants terrain et adaptation des processus au contexte local', mois: 9, semaine: 2 },
        ],
      },
      {
        theme: 'Accompagnement terrain IC',
        icon: '🚆',
        items: [
          { label: 'Deploiement des processus sur les sites IC (Massena, Clermont, Toulouse)', mois: 10, semaine: 1 },
          { label: 'Formation des equipes IC aux outils et referentiels', mois: 10, semaine: 2 },
          { label: 'Accompagnement du responsable GA IF IC dans la structuration de son pole', mois: 11, semaine: 1 },
          { label: 'Validation du deploiement national IC', mois: 11, semaine: 2 },
        ],
      },
      {
        theme: 'Retour d\'experience & amelioration continue',
        icon: '🔄',
        items: [
          { label: 'Campagne de REX structuree aupres des 3 entites (TN, TER, IC)', mois: 10, semaine: 1 },
          { label: 'Analyse des ecarts entre processus cibles et realite terrain', mois: 10, semaine: 2 },
          { label: 'Ajustement des processus et outils sur la base des retours', mois: 11, semaine: 1 },
          { label: 'Mise a jour du catalogue de services (v2 integrant TER et IC)', mois: 11, semaine: 2 },
          { label: 'Animation d\'une communaute de pratiques inter-entites', mois: 12, semaine: 1 },
        ],
      },
      {
        theme: 'Consolidation du pilotage',
        icon: '📈',
        items: [
          { label: 'Consolidation du tableau de bord KPIs a l\'echelle nationale', mois: 9, semaine: 1 },
          { label: 'Premiere revue des indicateurs avec le CODIR A2P', mois: 10, semaine: 1 },
          { label: 'Benchmark des performances entre entites et identification des bonnes pratiques', mois: 11, semaine: 1 },
          { label: 'Stabilisation des rituels de pilotage (frequence, participants, contenu)', mois: 12, semaine: 1 },
        ],
      },
      {
        theme: 'Transfert & perennisation',
        icon: '🏁',
        items: [
          { label: 'Transfert progressif du dispositif PMO vers l\'equipe interne (cellule Transverse)', mois: 11, semaine: 2 },
          { label: 'Redaction du guide de perennisation (processus, outils, gouvernance, contacts)', mois: 12, semaine: 1 },
          { label: 'Formation de la cellule Methodes & Standardisation a l\'animation des processus', mois: 12, semaine: 2 },
          { label: 'Bilan final : evaluation de l\'atteinte des objectifs, ecarts residuels, recommandations', mois: 13, semaine: 1 },
          { label: 'Validation de l\'organisation cible A2P par la direction', mois: 13, semaine: 2 },
          { label: 'Livraison de la feuille de route 3 ans finalisee (2027-2029)', mois: 13, semaine: 2 },
        ],
      },
    ],
  },
];

export const MARQUEURS_DEPLOIEMENT = [
  { annee: 2026, trimestre: 'T1', entite: 'tn', action: 'Consolidation GA IF TN', statut: 'fait' },
  { annee: 2026, trimestre: 'T2', entite: 'tn', action: 'Diagnostic & feuille de route', statut: 'en_cours' },
  { annee: 2026, trimestre: 'T3', entite: 'ter', action: 'Lancement diagnostic TER (sites pilotes Aura, SVSA)', statut: 'planifie' },
  { annee: 2026, trimestre: 'T4', entite: 'ter', action: 'Deploiement processus TER pilotes', statut: 'planifie' },
  { annee: 2027, trimestre: 'T1', entite: 'ic', action: 'Diagnostic IC (Massena, Clermont)', statut: 'planifie' },
  { annee: 2027, trimestre: 'T2', entite: 'ter', action: 'Extension TER — 5 DTER', statut: 'planifie' },
  { annee: 2027, trimestre: 'T3', entite: 'ic', action: 'Deploiement processus IC', statut: 'planifie' },
  { annee: 2027, trimestre: 'T4', entite: 'ter', action: 'Deploiement national TER', statut: 'planifie' },
  { annee: 2028, trimestre: 'T2', entite: 'ic', action: 'Deploiement national IC', statut: 'planifie' },
  { annee: 2028, trimestre: 'T4', entite: 'all', action: 'Organisation A2P nationale operationnelle', statut: 'planifie' },
];

// --- Organisation cible ---

export const ORGA_ACTUELLE = {
  label: 'Direction GA IF — TN GPI',
  responsable: 'C. Moenne-Loccoz',
  effectif: 15,
  children: [
    {
      label: 'Pole Excellence Patrimoine',
      responsable: 'F. Guerin',
      effectif: 9,
      children: [
        { label: 'Expertise Ferroviaire', responsable: 'C. Meyreau', effectif: 2 },
        { label: 'Expertise Immobiliere', responsable: 'O. Millet', effectif: 2 },
        { label: 'Expertise IO', responsable: null, effectif: 2 },
        { label: 'Expertise Fonciere', responsable: 'A. Thierion-Morard', effectif: 1 },
        { label: 'Pilotage transverse & GA', responsable: 'L. Floulou', effectif: 2 },
      ],
    },
    {
      label: 'Pole Emergence (EMG)',
      responsable: 'S. De Oliveira Lopes',
      effectif: 6,
      children: [
        { label: 'Responsables projets EMG', responsable: null, effectif: 4 },
        { label: 'PMO & coordination', responsable: null, effectif: 2 },
      ],
    },
  ],
};

export const ORGA_CIBLE = {
  label: 'Direction A2P — BL DSP',
  responsable: 'S. Leprince',
  effectif: 35,
  children: [
    {
      label: 'Direction GA IF',
      responsable: 'C. Moenne-Loccoz',
      effectif: 28,
      children: [
        {
          label: 'Pole TN — Ile-de-France',
          effectif: 12,
          children: [
            { label: 'Excellence Patrimoine TN', effectif: 7 },
            { label: 'Emergence TN', effectif: 5 },
          ],
        },
        {
          label: 'Pole TER — Regions',
          effectif: 8,
          children: [
            { label: 'Coordinateur GA IF TER Nord (HdF, Grand Est)', effectif: 2 },
            { label: 'Coordinateur GA IF TER Sud (Aura, Sud PACA, Occitanie)', effectif: 2 },
            { label: 'Coordinateur GA IF TER Ouest (SVSA, BFC)', effectif: 2 },
            { label: 'Referent methodes TER', effectif: 2 },
          ],
        },
        {
          label: 'Pole IC — National',
          effectif: 3,
          children: [
            { label: 'Responsable GA IF IC', effectif: 1 },
            { label: 'Charges de patrimoine IC', effectif: 2 },
          ],
        },
        {
          label: 'Cellule Transverse',
          effectif: 5,
          children: [
            { label: 'Pilotage & SI', effectif: 2 },
            { label: 'Methodes & Standardisation', effectif: 2 },
            { label: 'Formation & Accompagnement', effectif: 1 },
          ],
        },
      ],
    },
    {
      label: 'Secretariat Technique & Numerique',
      responsable: 'S. Chakir Alaoui',
      effectif: 3,
    },
    {
      label: 'Direction MOA',
      responsable: 'A pourvoir',
      effectif: 4,
    },
  ],
};

export const TRAJECTOIRE_ORGA = [
  { annee: 2026, label: 'Phase actuelle', desc: 'GAIF TN uniquement — consolidation', effectif: 15, tn: 15, ter: 0, ic: 0 },
  { annee: 2027, label: 'Phase intermediaire', desc: 'Extension TER sites pilotes + diagnostic IC', effectif: 25, tn: 15, ter: 7, ic: 3 },
  { annee: 2028, label: 'Organisation cible A2P', desc: 'Structure nationale operationnelle', effectif: 35, tn: 12, ter: 12, ic: 5 },
];

// --- KPI Industrialisation ---

export const MARQUEURS_INDUS = [
  {
    id: 'clients', label: 'Clients', icon: '👥', color: '#C8002D', bg: '#FFF0F3',
    desc: 'Satisfaction et qualite de service envers les parties prenantes (BU, SD, IDFM)',
    kpis: [
      { label: 'Satisfaction parties prenantes', valeur: 72, cible: 85, unite: '%', tendance: 'up' },
      { label: 'Delai moyen traitement demandes', valeur: 12, cible: 5, unite: 'jours', tendance: 'down', inverse: true },
      { label: 'Taux de respect engagements SLA', valeur: 78, cible: 95, unite: '%', tendance: 'up' },
    ],
  },
  {
    id: 'agilite', label: 'Agilite', icon: '⚡', color: '#3B82F6', bg: '#EFF6FF',
    desc: 'Capacite d\'adaptation et reactivite organisationnelle face a l\'extension nationale',
    kpis: [
      { label: 'Delai deploiement nouveau processus', valeur: 45, cible: 15, unite: 'jours', tendance: 'down', inverse: true },
      { label: 'Taux standardisation processus', valeur: 35, cible: 80, unite: '%', tendance: 'up' },
      { label: 'Entites deployees / cible', valeur: 1, cible: 3, unite: '', tendance: 'up' },
    ],
  },
  {
    id: 'juste_besoin', label: 'Juste besoin', icon: '🎯', color: '#10B981', bg: '#D1FAE5',
    desc: 'Adequation des moyens aux besoins reels — ni sur- ni sous-dimensionnement',
    kpis: [
      { label: 'Taux utilisation actifs critiques', valeur: 82, cible: 92, unite: '%', tendance: 'up' },
      { label: 'Ratio cout maintenance / valeur actif', valeur: 8.5, cible: 5, unite: '%', tendance: 'down', inverse: true },
      { label: 'Taux adequation ressources / charge', valeur: 68, cible: 90, unite: '%', tendance: 'up' },
    ],
  },
  {
    id: 'innovation', label: 'Innovation', icon: '💡', color: '#7C3AED', bg: '#EDE9FE',
    desc: 'Transformation digitale et amelioration continue des pratiques',
    kpis: [
      { label: 'Taux actifs avec capteurs IoT', valeur: 5, cible: 40, unite: '%', tendance: 'up' },
      { label: 'Processus digitalises', valeur: 2, cible: 8, unite: '/8', tendance: 'up' },
      { label: 'Score maturite SI gestion actifs', valeur: 2.1, cible: 4, unite: '/5', tendance: 'up' },
    ],
  },
];

export const INDUS_HISTORIQUE = [
  { mois: 'Jan 26', clients: 68, agilite: 20, juste_besoin: 60, innovation: 8 },
  { mois: 'Avr 26', clients: 70, agilite: 28, juste_besoin: 63, innovation: 10 },
  { mois: 'Jul 26', clients: 72, agilite: 35, juste_besoin: 68, innovation: 15 },
  { mois: 'Oct 26', clients: 75, agilite: 42, juste_besoin: 72, innovation: 20 },
  { mois: 'Jan 27', clients: 78, agilite: 50, juste_besoin: 76, innovation: 28 },
  { mois: 'Avr 27', clients: 80, agilite: 58, juste_besoin: 80, innovation: 35 },
  { mois: 'Jul 27', clients: 82, agilite: 65, juste_besoin: 83, innovation: 42 },
  { mois: 'Oct 27', clients: 85, agilite: 72, juste_besoin: 87, innovation: 50 },
];

// --- Catalogue de services ---

export const MATURITE_LABELS = [
  { level: 0, label: 'Non initie', color: '#9CA3AF', bg: '#F3F4F6' },
  { level: 1, label: 'Emergent', color: '#DC2626', bg: '#FEE2E2' },
  { level: 2, label: 'Defini', color: '#F59E0B', bg: '#FEF3C7' },
  { level: 3, label: 'Maitrise', color: '#10B981', bg: '#D1FAE5' },
  { level: 4, label: 'Optimise', color: '#3B82F6', bg: '#DBEAFE' },
];

export const SERVICES_GAIF = [
  {
    mission: 'Definition & pilotage strategie IFT',
    icon: '🧭',
    services: [
      { id: 's1', label: 'Elaboration PSGA', desc: 'Redaction et mise a jour de la Politique du Systeme de Gestion d\'Actifs', type: 'FREE', parties: ['GAIF', 'DG', 'IDFM'], maturite: { tn: 3, ter: 0, ic: 0 } },
      { id: 's2', label: 'Pilotage strategique pluriannuel', desc: 'Definition des trajectoires d\'investissement et arbitrages budgetaires', type: 'FREE', parties: ['GAIF', 'DG', 'IDFM'], maturite: { tn: 3, ter: 0, ic: 0 } },
    ],
  },
  {
    mission: 'Connaissance du patrimoine',
    icon: '📋',
    services: [
      { id: 's3', label: 'Inventaire et referencement des actifs', desc: 'Tenue a jour de l\'inventaire exhaustif des actifs IF par patrimoine', type: 'FIXE', parties: ['GAIF', 'TC', 'Prestataires'], maturite: { tn: 3, ter: 1, ic: 0 } },
      { id: 's4', label: 'Evaluation de criticite', desc: 'Analyse multicritere de la criticite des actifs IF', type: 'FIXE', parties: ['GAIF', 'Resp. Pat.'], maturite: { tn: 3, ter: 0, ic: 0 } },
      { id: 's5', label: 'Diagnostic etat du parc', desc: 'Campagnes de diagnostic technique et compilation carnets de sante', type: 'FIXE', parties: ['GAIF', 'TC', 'Experts'], maturite: { tn: 2, ter: 1, ic: 0 } },
    ],
  },
  {
    mission: 'Emergence & gestion des projets',
    icon: '💡',
    services: [
      { id: 's6', label: 'Contribution aux schemas directeurs', desc: 'Participation aux SD pour identifier les besoins d\'investissement IF', type: 'FIXE', parties: ['GAIF', 'BU', 'SD', 'IDFM'], maturite: { tn: 2, ter: 0, ic: 0 } },
      { id: 's7', label: 'Hierarchisation des projets', desc: 'Priorisation multicritere des projets d\'investissement IF', type: 'FREE', parties: ['GAIF', 'DG'], maturite: { tn: 3, ter: 0, ic: 0 } },
    ],
  },
  {
    mission: 'Prescription politiques GA',
    icon: '📖',
    services: [
      { id: 's8', label: 'Prescription maintenance', desc: 'Definition des politiques de maintenance par patrimoine', type: 'FIXE', parties: ['GAIF', 'CoPat', 'Mainteneurs'], maturite: { tn: 3, ter: 1, ic: 0 } },
      { id: 's9', label: 'Prescription investissement', desc: 'Cadrage des politiques d\'investissement et de renouvellement', type: 'FREE', parties: ['GAIF', 'DG', 'IDFM'], maturite: { tn: 2, ter: 0, ic: 0 } },
      { id: 's10', label: 'Prescription fin de vie', desc: 'Politique de decommissionnement, economie circulaire et RSE', type: 'FREE', parties: ['GAIF', 'RSE', 'Prestataires'], maturite: { tn: 2, ter: 0, ic: 0 } },
    ],
  },
  {
    mission: 'Pilotage contrats & prestataires',
    icon: '📝',
    services: [
      { id: 's11', label: 'Pilotage contrats maintenance', desc: 'Suivi et pilotage des marches de maintenance externalises', type: 'FIXE', parties: ['GAIF', 'CoPat', 'Mainteneurs ext.'], maturite: { tn: 2, ter: 1, ic: 0 } },
      { id: 's12', label: 'Interface SNCF Immobilier / Reseau', desc: 'Coordination avec SNCF Immo et SNCF Reseau', type: 'FIXE', parties: ['GAIF', 'SNCF Immo', 'SNCF Reseau'], maturite: { tn: 2, ter: 0, ic: 0 } },
    ],
  },
  {
    mission: 'Support transverse',
    icon: '🤝',
    services: [
      { id: 's13', label: 'Reporting & indicateurs GA', desc: 'Production des tableaux de bord et KPIs gestion d\'actifs', type: 'FREE', parties: ['GAIF', 'IDFM', 'DG'], maturite: { tn: 2, ter: 0, ic: 0 } },
      { id: 's14', label: 'Audit ISO 55001', desc: 'Evaluation periodique de la maturite du systeme de gestion d\'actifs', type: 'FREE', parties: ['GAIF', 'Auditeurs'], maturite: { tn: 1, ter: 0, ic: 0 } },
      { id: 's15', label: 'Formation & accompagnement', desc: 'Programme de formation GA IF pour les equipes', type: 'FREE', parties: ['GAIF', 'RH', 'TC'], maturite: { tn: 1, ter: 0, ic: 0 } },
    ],
  },
];

// --- Ressources & Competences ---

export const COMPETENCES = [
  { id: 'c1', domaine: 'Savoir', label: 'Gestion d\'actifs (ISO 55001)', niveau_actuel: 3, niveau_cible: 4, criticite: 'haute' },
  { id: 'c2', domaine: 'Savoir', label: 'Analyse de risques / criticite', niveau_actuel: 3, niveau_cible: 4, criticite: 'haute' },
  { id: 'c3', domaine: 'Savoir', label: 'Gestion de projet IF', niveau_actuel: 2, niveau_cible: 3, criticite: 'moyenne' },
  { id: 'c4', domaine: 'Savoir', label: 'Connaissance reglementaire (ICPE, DTA, ERP)', niveau_actuel: 2, niveau_cible: 3, criticite: 'haute' },
  { id: 'c5', domaine: 'Savoir', label: 'Pilotage budgetaire et financier', niveau_actuel: 2, niveau_cible: 4, criticite: 'haute' },
  { id: 'c6', domaine: 'Savoir', label: 'SI / outils numeriques (GMAO, BIM, Maximo)', niveau_actuel: 1, niveau_cible: 3, criticite: 'moyenne' },
  { id: 'c7', domaine: 'Savoir-etre', label: 'Pilotage transverse multi-entites', niveau_actuel: 1, niveau_cible: 4, criticite: 'haute' },
  { id: 'c8', domaine: 'Savoir-etre', label: 'Communication & reporting', niveau_actuel: 2, niveau_cible: 3, criticite: 'moyenne' },
  { id: 'c9', domaine: 'Savoir-etre', label: 'Conduite du changement', niveau_actuel: 1, niveau_cible: 3, criticite: 'haute' },
  { id: 'c10', domaine: 'Savoir-etre', label: 'Animation d\'equipe & formation', niveau_actuel: 2, niveau_cible: 3, criticite: 'moyenne' },
];

export const EQUIPE_ACTUELLE = [
  { role: 'Directeur GA IF', pole: 'Direction', nb: 1, competences: ['c1', 'c5', 'c7'] },
  { role: 'Responsable Pole Ex. Patrimoine', pole: 'Excellence Patrimoine', nb: 1, competences: ['c1', 'c2', 'c3'] },
  { role: 'Charges patrimoine Ferroviaire', pole: 'Excellence Patrimoine', nb: 2, competences: ['c2', 'c4', 'c6'] },
  { role: 'Charges patrimoine Immobilier', pole: 'Excellence Patrimoine', nb: 2, competences: ['c2', 'c4'] },
  { role: 'Charges patrimoine IO', pole: 'Excellence Patrimoine', nb: 2, competences: ['c2', 'c6'] },
  { role: 'Pilotage transverse & GA', pole: 'Excellence Patrimoine', nb: 2, competences: ['c1', 'c5', 'c8'] },
  { role: 'Responsable Pole EMG', pole: 'Emergence', nb: 1, competences: ['c3', 'c7', 'c8'] },
  { role: 'Responsables projets EMG', pole: 'Emergence', nb: 3, competences: ['c3', 'c4'] },
  { role: 'PMO & coordination', pole: 'Emergence', nb: 1, competences: ['c5', 'c8', 'c10'] },
];

// --- Maturite processus (enhancement Cycle de vie) ---

export const PROCESSUS_MATURITE = [
  { processus: 'Inventaire des actifs', tn: 3, ter: 1, ic: 0 },
  { processus: 'Analyse de criticite', tn: 3, ter: 0, ic: 0 },
  { processus: 'Priorisation investissements', tn: 3, ter: 0, ic: 0 },
  { processus: 'Suivi plan maintenance', tn: 2, ter: 1, ic: 0 },
  { processus: 'Reporting KPIs', tn: 2, ter: 0, ic: 0 },
  { processus: 'Gestion fin de vie / RSE', tn: 1, ter: 0, ic: 0 },
  { processus: 'Audit conformite ISO 55001', tn: 2, ter: 0, ic: 0 },
];
