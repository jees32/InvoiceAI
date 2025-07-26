'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, User as UserIcon, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { DashboardSidebar } from "./dashboard-sidebar"
import Link from "next/link"
import { useSupabaseAuth } from '@/lib/SupabaseAuthProvider';
import { supabase } from '@/lib/supabaseClient';

export function DashboardHeader() {
  const { user } = useSupabaseAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to home after logout
  };

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    if (!firstName && !lastName) return 'U'
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background">
      <div className="text-xl font-bold">Dashboard</div>
      {user && (
        <div className="flex items-center gap-4">
          {user.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border"
            />
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-destructive text-white hover:bg-destructive/80 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}