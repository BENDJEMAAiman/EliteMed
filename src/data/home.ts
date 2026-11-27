export interface City {
  name?: string
  x: number
  y: number
  /** décalage du libellé par rapport au point */
  dx?: number
  dy?: number
  anchor?: 'start' | 'end' | 'middle'
}

export const HERO_BADGES = [
  { icon: 'check', label: 'Contenu médical complet' },
  { icon: 'cap', label: 'Support pédagogique interactif' },
  { icon: 'users', label: 'Par des étudiants pour des étudiants' },
] as const

export const FEATURES = [
  {
    icon: 'users',
    title: 'Enseignants Experts',
    text: 'Apprenez auprès de résidents et majors passionnés qui apportent expertise clinique, rigueur et méthodes interactives pour réussir vos épreuves.',
    tone: 'navy',
  },
  {
    icon: 'headset',
    title: 'Tuteurs Quotidiens',
    text: 'Connectez-vous avec des tuteurs chaque jour via des séances en direct et des entraînements QCM pour rester régulier et confiant.',
    tone: 'blue',
  },
  {
    icon: 'award',
    title: 'Apprentissage Interactif',
    text: "Profitez de leçons interactives, d'arbres décisionnels et d'ateliers cliniques thématiques animés par des praticiens de terrain.",
    tone: 'yellow',
  },
] as const

export const MODULES = [
  {
    badge: '1ère année',
    title: 'Prépa Médecine & Sciences Fondamentales',
    text: 'Biophysique médicale, Anatomie générale descriptive, Embryologie humaine et Biochimie structurale. Entraînements intensifs de sélection.',
    tags: ['Biophysique', 'Anatomie', 'QCM Chronométrés'],
    to: '/medecine',
  },
  {
    badge: '2ème année',
    title: 'Physiologie & Mécanismes Cellulaires',
    text: 'Physiologie des grands appareils, Biochimie métabolique intégrée, Histologie spéciale et génétique médicale.',
    tags: ['Physiologie', 'Histologie', 'Fiches Synoptiques'],
    to: '/medecine',
  },
  {
    badge: '3ème année',
    title: 'Sémiologie Médicale & Pharmacologie',
    text: 'Examen clinique méthodique par appareil, sémiologie chirurgicale, pharmacologie générale et initiations thérapeutiques.',
    tags: ['Sémiologie', 'Pharmacologie', 'Vidéos Examen'],
    to: '/medecine',
  },
  {
    badge: '4ème à 6ème année',
    title: 'Spécialités Cliniques & Pathologies',
    text: 'Cardiologie, Pneumologie, Neurologie, Pédiatrie, Gynécologie, Urgences & Réanimation. Fiches Rang A et B systématisées.',
    tags: ['Tous Items EDN', 'Dossiers Progressifs'],
    to: '/medecine',
  },
  {
    badge: 'résidanat',
    badgeTone: 'dark',
    featured: true,
    title: "Préparation Concours d'Élite",
    text: "Banques d'épreuves classantes, Dossiers Cliniques Progressifs (DP), Questions à Réponses Ouvertes Courtes (QROC) et séances de corrigés en direct.",
    tags: ['Méga-Annales'],
    to: '/medecine',
  },
  {
    badge: 'post-graduation',
    title: 'Pratique Hospitalière & Protocoles',
    text: "Guides thérapeutiques de garde, décisions aux urgences, ordonnances types commentées et transition sécurisée vers l'autonomie médicale.",
    tags: ['Guides de Garde', 'Prescriptions'],
    to: '/medecine',
  },
] as const

export const TESTIMONIALS = [
  {
    quote:
      'Les arbres de décision en cardiologie et pneumologie ont rendu les révisions beaucoup plus structurées pour l’examen de fin d’année.',
    name: 'Yasmine B.',
    role: ' 5ème Année de médecine, Cardiologie',
  },
  {
    quote:
      'Ce que j’ai le plus apprécié, c’est la clarté des explications. Les corrigés détaillés m’ont permis d’aborder les épreuves théoriques avec confiance.',
    name: 'Amine K.',
    role: '6ème Année de médecine, Résidanat',
  },
  {
    quote:
      'Un tutorat sérieux et bien pensé : des cours clairs, des annales corrigées et un contenu validé qui fait gagner un temps précieux.',
    name: 'Douaa B.',
    role: '5ème Année de médecine, Pneumologie',
  },
] as const

export const CONTACT = {
  email: 'contact@elitemed.dz',
  phone: '+213 549 312 699',
  address: 'Alger Centre, Algérie',
}

/** Coordonnées dans le repère du viewBox de AlgeriaMap (1280 × Figma). */
export const CITIES: City[] = [
  { name: 'Alger Center', x: 1112, y: 264, dx: -22, dy: -19, anchor: 'middle' },
  { name: 'Tizi Ouzou', x: 1156, y: 254, dx: 2, dy: -10, anchor: 'middle' },
  { name: 'Béjaïa', x: 1215, y: 252, dx: 14, dy: -9, anchor: 'start' },
  { name: 'Oran', x: 1040, y: 280, dx: -10, dy: -7, anchor: 'end' },
  { name: 'Blida', x: 1082, y: 268, dx: 36, dy: 7, anchor: 'start' },
  { name: 'Sétif', x: 1171, y: 264, dx: 2, dy: 11, anchor: 'middle' },
  { name: 'Constantine', x: 1197, y: 264, dx: 10, dy: 9, anchor: 'start' },
  { name: 'Eluila', x: 1135, y: 285, dx: 18, dy: -4, anchor: 'start' },
  { name: 'Batna', x: 1183, y: 289, dx: 8, dy: 2, anchor: 'start' },
  { name: 'Chlef', x: 1088, y: 284, dx: 4, dy: 13, anchor: 'middle' },
  { name: 'Tlemcen', x: 1025, y: 303, dx: -9, dy: 2, anchor: 'end' },
  { name: 'Sidi Bel Abbès', x: 1049, y: 296, dx: 16, dy: 12, anchor: 'start' },
  { name: 'Djelfa', x: 1127, y: 304, dx: 3, dy: 12, anchor: 'start' },
  { name: 'Tiaret', x: 1096, y: 315, dx: 5, dy: 11, anchor: 'start' },
  { name: 'Biskra', x: 1187, y: 328, dx: 8, dy: 12, anchor: 'start' },
  { name: 'Donge', x: 1056, y: 329, dx: 3, dy: 13, anchor: 'start' },
  { name: 'Masurla', x: 1003, y: 375, dx: 12, dy: 2, anchor: 'start' },
  { name: 'Belan', x: 1174, y: 361, dx: 2, dy: 12, anchor: 'start' },
  { name: 'Lilar', x: 892, y: 454, dx: 10, dy: 2, anchor: 'start' },
  { name: 'Adrar', x: 970, y: 495, dx: 10, dy: 2, anchor: 'start' },
  { name: 'Tamanrasset', x: 1166, y: 544, dx: 1, dy: 13, anchor: 'middle' },
  { x: 1117, y: 325 },
  { x: 1138, y: 353 },
  { x: 1057, y: 460 },
  { x: 1066, y: 478 },
  { x: 1049, y: 281 },
  { x: 1134, y: 257 },
]
