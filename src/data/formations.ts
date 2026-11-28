export type FacultyKey = 'medecine' | 'pharmacie' | 'medecine-dentaire'
export type CourseLevel = 'fundamentals' | 'clinical' | 'residency'

export interface CourseChapter {
  title: string
  subtitle: string
  meta: string
  isExam?: boolean
}

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
  /** données détaillées de la formation */
  price?: number
  duration?: string
  qcmCount?: string
  resourcesLabel?: string
  instructor?: string
  startDate?: string
  lessonSummary?: string
  overview?: string
  outcomes?: string[]
  chapters?: CourseChapter[]
  driveUrl?: string
  qcmDriveUrl?: string
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

export const LEVEL_BADGES: Record<CourseLevel, string> = {
  fundamentals: 'Pré-clinique',
  clinical: 'Clinique',
  residency: 'Résidanat',
}

/** Coordonnées de paiement EliteMed (BaridiMob / CCP). */
export const PAYMENT_INFO = {
  rip: '00799999 0012345678 90',
  ccp: '0012345678 Clé 90',
  holder: 'EliteMed Algérie',
  whatsappPhone: '213549312699',
  telegramHandle: 'elitemed_dz',
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
      price: 4500,
      duration: '36 heures',
      qcmCount: '450+ QCM',
      resourcesLabel: 'Vidéos & PDF',
      instructor: 'Dr. K. Benali',
      startDate: 'lundi 1 décembre 2026',
      lessonSummary: '5 chapitres · 28 leçons',
      overview:
        "Maîtrisez l'anatomie générale descriptive, l'ostéologie complète des membres, l'arthrologie et la myologie avec des schémas annotés, des cours vidéo HD et des banques de QCM corrigés par des majors de promotion.",
      outcomes: [
        'Identifier chaque repère osseux, articulation et insertion musculaire du membre supérieur et inférieur.',
        'Comprendre la vascularisation artérielle, veineuse et l’innervation périphérique des loges anatomiques.',
        "Résoudre efficacement les QCM d'examen grâce aux pièges classiques et annales classées par faculté.",
        'Réviser rapidement avant les épreuves avec des fiches synoptiques et planches anatomiques en haute résolution.',
      ],
      chapters: [
        {
          title: 'Chapitre 1 : Introduction & Plans anatomiques',
          subtitle: 'Terminologie, axes de référence et généralités ostéo-articulaires',
          meta: '4 leçons · 4h 30',
        },
        {
          title: 'Chapitre 2 : Ostéologie du Membre Supérieur',
          subtitle: 'Clavicule, scapula, humérus, radius, ulna et squelette de la main',
          meta: '7 leçons · 9h 00',
        },
        {
          title: 'Chapitre 3 : Ostéologie du Membre Inférieur',
          subtitle: 'Os coxal, fémur, patella, tibia, fibula et architecture du pied',
          meta: '7 leçons · 9h 30',
        },
        {
          title: 'Chapitre 4 : Arthrologie & Myologie Fonctionnelle',
          subtitle: 'Articulations synoviales, ceintures et loges musculaires',
          meta: '6 leçons · 8h 00',
        },
        {
          title: 'Chapitre 5 : Annales & Examens Blancs Corrigés',
          subtitle: "Sujets types d'Alger, Oran, Constantine et correction vidéo détaillée",
          meta: '4 séances · 5h 00',
          isExam: true,
        },
      ],
    },
    {
      id: 'physiologie-neuro-anatomie',
      yearLabel: '2ème année',
      years: [2],
      level: 'fundamentals',
      title: 'Physiologie & Neuro-anatomie',
      text: 'Physiologie des grands appareils, Biochimie métabolique intégrée, Histologie spéciale et génétique médicale.',
      tags: ['Physiologie', 'Histologie', 'Fiches Synoptiques'],
      price: 4500,
    },
    {
      id: 'semiologie-pharmacologie',
      yearLabel: '3ème année',
      years: [3],
      level: 'clinical',
      title: 'Sémiologie & Pharmacologie',
      text: 'Examen clinique méthodique par appareil, sémiologie chirurgicale, pharmacologie générale et initiations thérapeutiques.',
      tags: ['Sémiologie', 'Pharmacologie', 'Vidéos Examen'],
      price: 5000,
    },
    {
      id: 'cardiologie-pneumologie',
      yearLabel: '4ème à 6ème année',
      years: [4, 5, 6],
      level: 'clinical',
      title: 'Cardiologie & Pneumologie',
      text: 'Cardiologie, Pneumologie, Neurologie, Urgences & Réanimation. Fiches structurées et dossiers progressifs.',
      tags: ['Tous Items EDN', 'Dossiers Progressifs'],
      price: 5500,
    },
    {
      id: 'pediatrie-gynecologie',
      yearLabel: '5ème année',
      years: [5],
      level: 'clinical',
      title: 'Pédiatrie & Gynécologie',
      text: 'Pathologies pédiatriques, suivi de grossesse, urgences obstétricales et conduites à tenir commentées.',
      tags: ['Pédiatrie', 'Annales 2018-2024'],
      price: 5500,
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
      price: 7500,
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
      price: 4500,
    },
    {
      id: 'chimie-organique',
      yearLabel: '2ème année',
      years: [2],
      level: 'fundamentals',
      title: 'Chimie Organique',
      text: 'Mécanismes réactionnels, chimie analytique quantitative, spectroscopie et physiologie intégrée.',
      tags: ['Organique', 'Analytique', 'Fiches'],
      price: 4500,
    },
    {
      id: 'pharmacologie-generale',
      yearLabel: '3ème année',
      years: [3],
      level: 'clinical',
      title: 'Pharmacologie Générale',
      text: 'Pharmacocinétique, pharmacodynamie, pharmacognosie et chimie thérapeutique des principes actifs.',
      tags: ['Pharmacocinétique', 'Pharmacognosie'],
      price: 5200,
    },
    {
      id: 'toxicologie-hematologie',
      yearLabel: '4ème année',
      years: [4],
      level: 'clinical',
      title: 'Toxicologie & Hématologie',
      text: 'Toxicologie clinique et analytique, biochimie métabolique, microbiologie et immunologie médicale.',
      tags: ['Toxicologie', 'Cas Cliniques'],
      price: 5200,
    },
    {
      id: 'pharmacie-galenique',
      yearLabel: '5ème année',
      years: [5],
      level: 'clinical',
      title: 'Pharmacie Galénique',
      text: 'Formulation industrielle, contrôle qualité du médicament, pharmacie hospitalière et législation.',
      tags: ['Formulation', 'Contrôle Qualité'],
      price: 5500,
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
      price: 7500,
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
      price: 4500,
    },
    {
      id: 'biomateriaux-prothese',
      yearLabel: '2ème année',
      years: [2],
      level: 'fundamentals',
      title: 'Biomatériaux & Prothèse',
      text: 'Propriétés des biomatériaux dentaires, occlusodontie fondamentale et bases de prothèse conjointe.',
      tags: ['Occlusodontie', 'Prothèse', 'Fiches'],
      price: 4800,
    },
    {
      id: 'pathologie-endodontie',
      yearLabel: '3ème année',
      years: [3],
      level: 'clinical',
      title: 'Pathologie & Endodontie',
      text: 'Odontologie conservatrice, protocoles endodontiques, radiologie dentaire et sémiologie buccale.',
      tags: ['Endodontie', 'Radiologie'],
      price: 5000,
    },
    {
      id: 'parodontologie-chirurgie',
      yearLabel: '4ème année',
      years: [4],
      level: 'clinical',
      title: 'Parodontologie & Chirurgie',
      text: "Thérapeutiques parodontales, chirurgie orale, extractions complexes et bases d'implantologie.",
      tags: ['Parodontologie', 'Vidéos Cliniques'],
      price: 5200,
    },
    {
      id: 'orthopedie-dento-faciale',
      yearLabel: '5ème année',
      years: [5],
      level: 'clinical',
      title: 'Orthopédie Dento-Faciale',
      text: 'Analyse céphalométrique, diagnostic des dysmorphoses, odontologie pédiatrique et prothèse maxillo-faciale.',
      tags: ['Céphalométrie', 'Annales'],
      price: 5500,
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
      price: 7500,
    },
  ],
}

export const FACULTIES: Record<FacultyKey, Faculty> = {
  medecine: MEDECINE,
  pharmacie: PHARMACIE,
  'medecine-dentaire': DENTAIRE,
}

export interface ResolvedCourse {
  faculty: Faculty
  course: Course
  price: number
  duration: string
  qcmCount: string
  resourcesLabel: string
  instructor: string
  startDate: string
  lessonSummary: string
  overview: string
  outcomes: string[]
  chapters: CourseChapter[]
  driveUrl: string
  qcmDriveUrl: string
}

/** Retrouve un cours (et complète ses valeurs par défaut si non renseignées). */
function resolveDetails(faculty: Faculty, course: Course): ResolvedCourse {
  return {
    faculty,
    course,
    price: course.price ?? 4500,
    duration: course.duration ?? '36 heures',
    qcmCount: course.qcmCount ?? '450+ QCM',
    resourcesLabel: course.resourcesLabel ?? 'Vidéos & PDF',
    instructor: course.instructor ?? 'Dr. K. Benali',
    startDate: course.startDate ?? 'lundi 1 décembre 2026',
    lessonSummary: course.lessonSummary ?? '5 chapitres · 28 leçons',
    overview: course.overview ?? course.text,
    outcomes: course.outcomes ?? [
      `Maîtriser les notions fondamentales du module ${course.title}.`,
      'Assimiler les mécanismes clés grâce aux fiches synoptiques illustrées.',
      "S'entraîner sur des banques de QCM chronométrés et corrigés.",
      'Préparer efficacement les examens grâce aux annales commentées par faculté.',
    ],
    chapters: course.chapters ?? [
      {
        title: `Chapitre 1 : Introduction à ${course.title}`,
        subtitle: 'Concepts généraux, définitions et bases fondamentales',
        meta: '4 leçons · 4h 30',
      },
      {
        title: 'Chapitre 2 : Approche systématique & Pathophysiologie',
        subtitle: 'Étude détaillée des mécanismes et corrélations cliniques',
        meta: '7 leçons · 9h 00',
      },
      {
        title: 'Chapitre 3 : Applications pratiques & Cas cliniques',
        subtitle: 'Méthodologie de résolution et synthèses visuelles',
        meta: '7 leçons · 9h 30',
      },
      {
        title: 'Chapitre 4 : Fiches de révision & Pièges classiques',
        subtitle: 'Points clés à haute valeur ajoutée pour les épreuves',
        meta: '6 leçons · 8h 00',
      },
      {
        title: 'Chapitre 5 : Annales & Examens Blancs Corrigés',
        subtitle: "Sujets types d'Alger, Oran, Constantine et correction vidéo détaillée",
        meta: '4 séances · 5h 00',
        isExam: true,
      },
    ],
    driveUrl: course.driveUrl ?? 'https://drive.google.com/',
    qcmDriveUrl: course.qcmDriveUrl ?? 'https://drive.google.com/',
  }
}

export function findCourse(facultyKey: string | undefined, courseId: string | undefined): ResolvedCourse | null {
  if (!facultyKey || !courseId) return null
  const faculty = FACULTIES[facultyKey as FacultyKey]
  if (!faculty) return null
  const course = faculty.courses.find((c) => c.id === courseId)
  return course ? resolveDetails(faculty, course) : null
}

export function findCourseById(courseId: string | undefined): ResolvedCourse | null {
  if (!courseId) return null
  for (const faculty of Object.values(FACULTIES)) {
    const course = faculty.courses.find((c) => c.id === courseId)
    if (course) return resolveDetails(faculty, course)
  }
  return null
}
