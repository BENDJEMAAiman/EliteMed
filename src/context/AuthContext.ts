import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

export interface AuthContextValue {
  session: Session | null
  user: User | null
  /** true si l'utilisateur figure dans la table `admins` */
  isAdmin: boolean
  /** true tant que la session (et le rôle) ne sont pas résolus */
  loading: boolean
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
