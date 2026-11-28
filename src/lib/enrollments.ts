import { supabase } from './supabase'

export type EnrollmentStatus = 'en_attente' | 'confirme' | 'paye' | 'rejete'
export type ReceiptChannel = 'whatsapp' | 'telegram'

export interface Enrollment {
  id: string
  ref: string
  created_at: string
  course_id?: string
  course_title: string
  level_label: string
  price: number
  student_name: string
  student_phone: string | null
  receipt_channel: ReceiptChannel | null
  status: EnrollmentStatus
}

export const STATUS_LABELS: Record<EnrollmentStatus, string> = {
  en_attente: 'En Attente',
  confirme: 'Confirmé',
  paye: 'Payé',
  rejete: 'Rejeté',
}

/** Les demandes les plus anciennes d'abord : c'est la file à traiter. */
export async function fetchEnrollments() {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*')
    .order('created_at', { ascending: true })
  return { data: (data ?? []) as Enrollment[], error }
}

/** Inscriptions de l'étudiant connecté, les plus récentes d'abord. */
export async function fetchMyEnrollments(userId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data: (data ?? []) as Enrollment[], error }
}

/** Récupère une inscription par son identifiant. */
export async function fetchEnrollmentById(id: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  return { data: data as Enrollment | null, error }
}

export interface CreateEnrollmentInput {
  user_id: string
  course_id: string
  course_title: string
  level_label: string
  price: number
  student_name: string
  student_phone: string
}

/** Crée une nouvelle demande d'inscription (statut initial `en_attente`). */
export async function createEnrollment(input: CreateEnrollmentInput) {
  const { data, error } = await supabase
    .from('enrollments')
    .insert({ ...input, status: 'en_attente' })
    .select()
    .single()
  return { data: data as Enrollment | null, error }
}

export async function updateEnrollmentStatus(id: string, status: EnrollmentStatus) {
  const { data, error } = await supabase
    .from('enrollments')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  return { data: data as Enrollment | null, error }
}

export const formatPrice = (n: number) =>
  `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} DA`

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

export function receiptText(channel: ReceiptChannel | null) {
  if (channel === 'whatsapp') return 'Reçu envoyé via WhatsApp'
  if (channel === 'telegram') return 'Reçu envoyé via Telegram'
  return 'En attente de reçu'
}
