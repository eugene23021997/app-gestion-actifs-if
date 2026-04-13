// ===== REFERENTIELS PSGA V2 / PRESCRIPTIONS =====

export const TECHNICENTRES = [
  { id: 'sdn', name: 'TC Industriel Saint-Denis', tranche: 'Nord' },
  { id: 'pno', name: 'TC Paris Nord', tranche: 'Nord' },
  { id: 'pes', name: 'TC Paris Est', tranche: 'Nord' },
  { id: 'vsg', name: 'TC Villeneuve Saint-Georges', tranche: 'Sud' },
  { id: 'ard', name: 'TC Les Ardoines', tranche: 'Sud' },
  { id: 'tmr', name: 'TC Trappes-Montrouge (Montrouge)', tranche: 'Sud' },
  { id: 'ttr', name: 'TC Trappes-Montrouge (Trappes)', tranche: 'Sud' },
  { id: 'lev', name: 'TC PSL — Levallois', tranche: 'Nord' },
  { id: 'vnd', name: 'TC PSL — Val Notre-Dame', tranche: 'Nord' },
  { id: 'ach', name: 'TC PSL — Acheres', tranche: 'Nord' },
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
];

// ===== PROJETS D'INVESTISSEMENT =====

export const PROJETS = [
  {
    id: 1, nom: 'Refection toiture Hall A',
    desc: 'Refection complete de la toiture du hall A suite aux infiltrations repetees. Structure metallique vieillissante avec risque d\'effondrement partiel identifie lors du DTA amiante.',
    pat: 'immo', cat: 'Abriter — Couverture', tc: 'sdn',
    montant: 1850, score: 92, priorite: 'P1',
    annee: 2026, trim: 'T2', duree: 18,
    impacts: { sec: 3, prod: 2, fin: 2, soc: 1, img: 2 },
    roi: 420, conformite: 'DTA Amiante', phase: 'Maint',
  },
  {
    id: 2, nom: 'Renouvellement voies ferrees 3 & 4',
    desc: 'Renouvellement complet des voies 3 et 4 du faisceau d\'entree. Usure avancee des rails et traverses, ralentissements imposes a 30 km/h.',
    pat: 'ferro', cat: 'Voies et ADV', tc: 'sdn',
    montant: 2300, score: 95, priorite: 'P1',
    annee: 2026, trim: 'T1', duree: 24,
    impacts: { expl: 3, cont: 2, cimp: 3, crem: 2 },
    roi: 580, conformite: null, phase: 'Maint',
  },
  {
    id: 3, nom: 'Remplacement Tour en Fosse TF-01',
    desc: 'Remplacement complet de la tour en fosse TF-01 arrivee en fin de vie. Pannes recurrentes impactant la production maintenance.',
    pat: 'io', cat: 'Production MR — MIF', tc: 'vsg',
    montant: 890, score: 88, priorite: 'P1',
    annee: 2026, trim: 'T3', duree: 12,
    impacts: { cont: 3, red: 2, sec: 2, fin: 2, regl: 1, prod: 3 },
    roi: 310, conformite: null, phase: 'Maint',
  },
  {
    id: 4, nom: 'Mise en conformite ICPE station lavage',
    desc: 'Mise en conformite environnementale ICPE de la station de lavage. Echeance reglementaire DREAL fixee au 31/12/2026.',
    pat: 'io', cat: 'Production MR — MIF', tc: 'sdn',
    montant: 620, score: 82, priorite: 'P2',
    annee: 2026, trim: 'T2', duree: 8,
    impacts: { cont: 1, red: 1, sec: 1, fin: 2, regl: 3, prod: 2 },
    roi: 185, conformite: 'ICPE', phase: 'Maint',
  },
  {
    id: 5, nom: 'Rehabilitation batiment social B12',
    desc: 'Rehabilitation complete du batiment social B12 (vestiaires, sanitaires, salle de repos). Conditions de travail degradees signalees par le CHSCT.',
    pat: 'immo', cat: 'Amenager — Second oeuvre', tc: 'sdn',
    montant: 480, score: 71, priorite: 'P2',
    annee: 2026, trim: 'T4', duree: 10,
    impacts: { sec: 1, prod: 1, fin: 1, soc: 3, img: 2 },
    roi: 95, conformite: null, phase: 'Maint',
  },
  {
    id: 6, nom: 'Remplacement pont roulant fosse 2',
    desc: 'Remplacement du pont roulant de la fosse 2 arrive en limite de duree de vie. Rapport de controle technique defavorable.',
    pat: 'io', cat: 'Levage et manutention', tc: 'sdn',
    montant: 390, score: 76, priorite: 'P2',
    annee: 2027, trim: 'T1', duree: 6,
    impacts: { cont: 2, red: 1, sec: 2, fin: 1, regl: 2, prod: 2 },
    roi: 120, conformite: 'CT defavorable', phase: 'Maint',
  },
  {
    id: 7, nom: 'Mise aux normes electriques Hall B',
    desc: 'Remise aux normes de l\'installation electrique du Hall B. Non-conformites identifiees lors du diagnostic C13.200.',
    pat: 'immo', cat: 'Amenager — Electricite', tc: 'sdn',
    montant: 520, score: 74, priorite: 'P2',
    annee: 2027, trim: 'T1', duree: 8,
    impacts: { sec: 2, prod: 1, fin: 1, soc: 1, img: 1 },
    roi: 145, conformite: 'NF C13-200', phase: 'Maint',
  },
  {
    id: 8, nom: 'Regeneration catenaire faisceau sud',
    desc: 'Regeneration de l\'alimentation catenaire du faisceau sud. Vetuste des supports et de la ligne de contact.',
    pat: 'ferro', cat: 'Caténaires et EALE', tc: 'ard',
    montant: 1400, score: 69, priorite: 'P2',
    annee: 2027, trim: 'T2', duree: 14,
    impacts: { expl: 2, cont: 2, cimp: 2, crem: 2 },
    roi: 280, conformite: null, phase: 'Maint',
  },
  {
    id: 9, nom: 'Reseaux eau / EP zone Nord',
    desc: 'Renovation des reseaux d\'eau potable et d\'eaux pluviales de la zone Nord. Fuites recurrentes et risque de contamination.',
    pat: 'immo', cat: 'Acheminer — VRD', tc: 'sdn',
    montant: 275, score: 58, priorite: 'P3',
    annee: 2027, trim: 'T3', duree: 6,
    impacts: { sec: 1, prod: 1, fin: 1, soc: 1, img: 1 },
    roi: 65, conformite: null, phase: 'Maint',
  },
  {
    id: 10, nom: 'Extension parking agents',
    desc: 'Extension du parking agents pour absorber l\'augmentation d\'effectifs liee au nouveau plan de transport.',
    pat: 'immo', cat: 'Acheminer — VRD', tc: 'sdn',
    montant: 350, score: 42, priorite: 'P3',
    annee: 2028, trim: 'T1', duree: 8,
    impacts: { sec: 0, prod: 0, fin: 1, soc: 2, img: 1 },
    roi: 30, conformite: null, phase: 'Projet',
  },
  {
    id: 11, nom: 'Remplacement bancs de mesure essieux',
    desc: 'Remplacement des bancs de mesure essieux BM-02 et BM-03 vetustes. Pieces detachees indisponibles.',
    pat: 'io', cat: 'Production MR — MIT', tc: 'vsg',
    montant: 180, score: 55, priorite: 'P3',
    annee: 2028, trim: 'T2', duree: 4,
    impacts: { cont: 1, red: 1, sec: 1, fin: 1, regl: 1, prod: 1 },
    roi: 45, conformite: null, phase: 'Maint',
  },
  {
    id: 12, nom: 'Upgrade signalisation poste N1',
    desc: 'Modernisation du poste de signalisation N1 vers technologie PIPC. Composants obsoletes avec delai d\'approvisionnement critique.',
    pat: 'ferro', cat: 'Signalisation', tc: 'ard',
    montant: 950, score: 63, priorite: 'P3',
    annee: 2028, trim: 'T3', duree: 16,
    impacts: { expl: 2, cont: 1, cimp: 1, crem: 2 },
    roi: 190, conformite: null, phase: 'Maint',
  },
  {
    id: 13, nom: 'Restructuration Hall C',
    desc: 'Restructuration complete du Hall C pour accueillir les nouvelles rames RER NG. Adaptation des voies et de la structure.',
    pat: 'immo', cat: 'Abriter — Gros oeuvre', tc: 'pno',
    montant: 2200, score: 45, priorite: 'P3',
    annee: 2029, trim: 'T1', duree: 24,
    impacts: { sec: 1, prod: 2, fin: 2, soc: 1, img: 2 },
    roi: 350, conformite: null, phase: 'Projet',
  },
  {
    id: 14, nom: 'Modernisation portiques de levage',
    desc: 'Modernisation de l\'ensemble des portiques de levage du site. Mise en conformite avec la nouvelle directive machines 2023/1230.',
    pat: 'io', cat: 'Levage et manutention', tc: 'vsg',
    montant: 760, score: 48, priorite: 'P3',
    annee: 2029, trim: 'T2', duree: 10,
    impacts: { cont: 1, red: 1, sec: 2, fin: 1, regl: 2, prod: 1 },
    roi: 110, conformite: 'Dir. machines', phase: 'Maint',
  },
  {
    id: 15, nom: 'Renouvellement catenaire Nord',
    desc: 'Renouvellement complet de la catenaire du faisceau Nord. Programme pluriannuel de regeneration des EALE.',
    pat: 'ferro', cat: 'Caténaires et EALE', tc: 'sdn',
    montant: 1800, score: 40, priorite: 'P3',
    annee: 2030, trim: 'T1', duree: 18,
    impacts: { expl: 2, cont: 1, cimp: 2, crem: 2 },
    roi: 320, conformite: null, phase: 'Maint',
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
