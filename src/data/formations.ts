export type FacultyKey = 'medecine' | 'pharmacie' | 'medecine-dentaire'
export type CourseLevel = 'fundamentals' | 'clinical' | 'residency'

export interface Course {
  id: string
  /** libellé affiché dans la pastille */
  yearLabel: string
  /** années concernées (sert au filtre du menu latéral) */
  years: number[]
  level: CourseLevel
  title: string
  text: string
  tags: string[]
  /** tag mis en avant (fond jaune) */
  highlight?: string
  /** carte "Résidanat" : bordure jaune + pastille sombre */
  featured?: boolean
}

export interface Faculty {
  key: FacultyKey
  name: string
  /** nombre d'années d'étude (= boutons du filtre) */
  yearCount: number
  searchPlaceholder: string
  courses: Course[]
}

/** Textes de l'interface (conformes au Figma) — à traduire ici si besoin. */
export const LABELS = {
  filterTitle: 'Search and Filter',
  all: 'ALL',
  level: 'LEVEL',
  allLevels: 'All levels',
  levels: {
    fundamentals: 'Fundamentals',
    clinical: 'Clinical',
    residency: 'Residency',
  } satisfies Record<CourseLevel, string>,
  empty: 'No courses match your search.',
  openCourse: 'Accéder aux cours',
  openProgram: 'Voir le programme',
}

export function yearName(n: number) {
  const suffix = n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'
  return `${n}${suffix} Year`
}

const SELECTIVE = 'Haute sélectivité'

const MEDECINE: Faculty = {
  key: 'medecine',
  name: 'Médecine',
  yearCount: 7,
  searchPlaceholder: 'Search for a module or course...',
  courses: [
    {
      id: 'anatomie-osteologie',
      yearLabel: '1ère année',
      years: [1],
      level: 'fundamentals',
      title: 'Anatomie & Ostéologie',
      text: 'Biophysique médicale, Anatomie générale descriptive, Embryologie humaine et Biochimie structurale. Entraînements intensifs de sélection.',
      tags: ['Biophysique', 'Anatomie', 'QCM Chronométrés'],
    },
    {
      id: 'physiologie-neuro-anatomie',
      yearLabel: '2ème année',
      years: [2],
      level: 'fundamentals',
      title: 'Physiologie & Neuro-anatomie',
      text: 'Physiologie des grands appareils, Biochimie métabolique intégrée, Histologie spéciale et génétique médicale.',
      tags: ['Physiologie', 'Histologie', 'Fiches Synoptiques'],
    },
    {
      id: 'semiologie-pharmacologie',
      yearLabel: '3ème année',
      years: [3],
      level: 'clinical',
      title: 'Sémiologie & Pharmacologie',
      text: 'Examen clinique méthodique par appareil, sémiologie chirurgicale, pharmacologie générale et initiations thérapeutiques.',
      tags: ['Sémiologie', 'Pharmacologie', 'Vidéos Examen'],
    },
    {
      id: 'cardiologie-pneumologie',
      yearLabel: '4ème à 6ème année',
      years: [4, 5, 6],
      level: 'clinical',
      title: 'Cardiologie & Pneumologie',
      text: 'Cardiologie, Pneumologie, Neurologie, Urgences & Réanimation. Fiches structurées et dossiers progressifs.',
      tags: ['Tous Items EDN', 'Dossiers Progressifs'],
    },
    {
      id: 'pediatrie-gynecologie',
      yearLabel: '5ème année',
      years: [5],
      level: 'clinical',
      title: 'Pédiatrie & Gynécologie',
      text: 'Pathologies pédiatriques, suivi de grossesse, urgences obstétricales et conduites à tenir commentées.',
      tags: ['Pédiatrie', 'Annales 2018-2024'],
    },
    {
      id: 'synthese-internat-residanat',
      yearLabel: '7ème année · Résidanat',
      years: [7],
      level: 'residency',
      title: 'Synthèse Internat & Résidanat',
      text: "Banques d'épreuves classantes, Dossiers Cliniques Progressifs (DP), QROC et séances de corrigés en direct.",
      tags: ['Méga-Annales', 'Coaching Major'],
      highlight: SELECTIVE,
      featured: true,
    },
  ],
}

const PHARMACIE: Faculty = {
  key: 'pharmacie',
  name: 'Pharmacie',
  yearCount: 6,
  searchPlaceholder: 'Search for a pharmacy module or course...',
  courses: [
    {
      id: 'chimie-biologie',
      yearLabel: '1ère année',
      years: [1],
      level: 'fundamentals',
      title: 'Chimie & Biologie',
      text: 'Chimie générale et minérale, botanique pharmaceutique, biologie cellulaire et biostatistiques appliquées.',
      tags: ['Chimie Minérale', 'Botanique', 'QCM Corrigés'],
    },
    {
      id: 'chimie-organique',
      yearLabel: '2ème année',
      years: [2],
      level: 'fundamentals',
      title: 'Chimie Organique',
      text: 'Mécanismes réactionnels, chimie analytique quantitative, spectroscopie et physiologie intégrée.',
      tags: ['Organique', 'Analytique', 'Fiches'],
    },
    {
      id: 'pharmacologie-generale',
      yearLabel: '3ème année',
      years: [3],
      level: 'clinical',
      title: 'Pharmacologie Générale',
      text: 'Pharmacocinétique, pharmacodynamie, pharmacognosie et chimie thérapeutique des principes actifs.',
      tags: ['Pharmacocinétique', 'Pharmacognosie'],
    },
    {
      id: 'toxicologie-hematologie',
      yearLabel: '4ème année',
      years: [4],
      level: 'clinical',
      title: 'Toxicologie & Hématologie',
      text: 'Toxicologie clinique et analytique, biochimie métabolique, microbiologie et immunologie médicale.',
      tags: ['Toxicologie', 'Cas Cliniques'],
    },
    {
      id: 'pharmacie-galenique',
      yearLabel: '5ème année',
      years: [5],
      level: 'clinical',
      title: 'Pharmacie Galénique',
      text: 'Formulation industrielle, contrôle qualité du médicament, pharmacie hospitalière et législation.',
      tags: ['Formulation', 'Contrôle Qualité'],
    },
    {
      id: 'residanat-pharmacie',
      yearLabel: '6ème année · Résidanat',
      years: [6],
      level: 'residency',
      title: 'Résidanat Pharmacie',
      text: 'Préparation complète au concours de Résidanat en Pharmacie avec annales classées et séances en direct.',
      tags: ['Méga-Annales', 'Coaching Major'],
      highlight: SELECTIVE,
      featured: true,
    },
  ],
}

const DENTAIRE: Faculty = {
  key: 'medecine-dentaire',
  name: 'Médecine Dentaire',
  yearCount: 6,
  searchPlaceholder: 'Search for a dental module or course...',
  courses: [
    {
      id: 'anatomie-dentaire',
      yearLabel: '1ère année',
      years: [1],
      level: 'fundamentals',
      title: 'Anatomie Dentaire',
      text: "Morphologie dentaire, anatomie cervico-faciale, embryologie oro-faciale et histologie de l'émail.",
      tags: ['Morphologie', 'Histologie', 'QCM'],
    },
    {
      id: 'biomateriaux-prothese',
      yearLabel: '2ème année',
      years: [2],
      level: 'fundamentals',
      title: 'Biomatériaux & Prothèse',
      text: 'Propriétés des biomatériaux dentaires, occlusodontie fondamentale et bases de prothèse conjointe.',
      tags: ['Occlusodontie', 'Prothèse', 'Fiches'],
    },
    {
      id: 'pathologie-endodontie',
      yearLabel: '3ème année',
      years: [3],
      level: 'clinical',
      title: 'Pathologie & Endodontie',
      text: 'Odontologie conservatrice, protocoles endodontiques, radiologie dentaire et sémiologie buccale.',
      tags: ['Endodontie', 'Radiologie'],
    },
    {
      id: 'parodontologie-chirurgie',
      yearLabel: '4ème année',
      years: [4],
      level: 'clinical',
      title: 'Parodontologie & Chirurgie',
      text: "Thérapeutiques parodontales, chirurgie orale, extractions complexes et bases d'implantologie.",
      tags: ['Parodontologie', 'Vidéos Cliniques'],
    },
    {
      id: 'orthopedie-dento-faciale',
      yearLabel: '5ème année',
      years: [5],
      level: 'clinical',
      title: 'Orthopédie Dento-Faciale',
      text: 'Analyse céphalométrique, diagnostic des dysmorphoses, odontologie pédiatrique et prothèse maxillo-faciale.',
      tags: ['Céphalométrie', 'Annales'],
    },
    {
      id: 'residanat-dentaire',
      yearLabel: '6ème année · Résidanat',
      years: [6],
      level: 'residency',
      title: 'Résidanat Dentaire',
      text: 'Synthèse clinique pluridisciplinaire, annales de résidanat dentaire et coaching en direct.',
      tags: ['Méga-Annales', 'Coaching Major'],
      highlight: SELECTIVE,
      featured: true,
    },
  ],
}

export const FACULTIES: Record<FacultyKey, Faculty> = {
  medecine: MEDECINE,
  pharmacie: PHARMACIE,
  'medecine-dentaire': DENTAIRE,
}
