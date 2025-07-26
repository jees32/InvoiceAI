"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface SupabaseAuthContextProps {
  user: any;
  session: any;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextProps>({ user: null, session: null });

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN" && session?.user) {
        // Upsert user in database
        await fetch("/api/upsert-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: session.user.id,
            email: session.user.email,
            firstName: session.user.user_metadata?.full_name || session.user.user_metadata?.name || "",
            lastName: "",
            imageUrl: session.user.user_metadata?.avatar_url || ""
          })
        });
        router.push("/dashboard");
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
        setSession(null);
        router.push("/login");
      }
    });
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <SupabaseAuthContext.Provider value={{ user, session }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  return useContext(SupabaseAuthContext);
} 