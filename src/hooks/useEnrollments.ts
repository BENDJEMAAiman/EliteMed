import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import {
  fetchEnrollments,
  updateEnrollmentStatus,
  type Enrollment,
  type EnrollmentStatus,
} from '../lib/enrollments'

export function useEnrollments() {
  const [items, setItems] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    const { data, error } = await fetchEnrollments()
    if (error) setError(error.message)
    else {
      setError('')
      setItems(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()

    // Nouvelles demandes / changements en direct (si Realtime est activé)
    const channel = supabase
      .channel('enrollments-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enrollments' }, () => {
        load()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [load])

  const setStatus = useCallback(async (id: string, status: EnrollmentStatus) => {
    setBusyId(id)
    setError('')
    const { data, error } = await updateEnrollmentStatus(id, status)
    if (error) setError(error.message)
    else if (data) setItems((prev) => prev.map((e) => (e.id === id ? data : e)))
    setBusyId(null)
  }, [])

  return { items, loading, error, busyId, setStatus }
}
