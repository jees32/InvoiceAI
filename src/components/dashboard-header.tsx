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
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage 
              src={user.user_metadata?.avatar_url || user.user_metadata?.picture} 
              alt="User Avatar" 
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              {getInitials(user.user_metadata?.first_name, user.user_metadata?.last_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-foreground">
              {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]}
            </span>
            <span className="text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      )}
    </header>
  )
}