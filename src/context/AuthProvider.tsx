import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { AuthContext, type AuthContextValue } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  // Résultat de la vérification du rôle, lié à l'utilisateur concerné
  const [adminCheck, setAdminCheck] = useState<{
    uid: string;
    value: boolean;
  } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, next) => {
        setSession(next);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const uid = session?.user.id;

  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", uid)
      .maybeSingle()
      .then(({ data, error }) => {
        console.log("[admin check]", { uid, data, error });
        if (!cancelled) setAdminCheck({ uid, value: !!data });
      });

    return () => {
      cancelled = true;
    };
  }, [uid]);

  const value = useMemo<AuthContextValue>(() => {
    const adminResolved = !uid || adminCheck?.uid === uid;
    return {
      session,
      user: session?.user ?? null,
      isAdmin: !!uid && adminCheck?.uid === uid && adminCheck.value,
      loading: !sessionReady || !adminResolved,
      signOut: async () => {
        await supabase.auth.signOut();
      },
    };
  }, [session, sessionReady, uid, adminCheck]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
