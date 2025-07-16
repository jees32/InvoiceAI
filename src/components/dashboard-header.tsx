'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUser, useClerk } from "@clerk/nextjs"
import { LogOut, User as UserIcon, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { DashboardSidebar } from "./dashboard-sidebar"
import Link from "next/link"

export function DashboardHeader() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    if (!firstName && !lastName) return 'U'
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs p-0">
                <DashboardSidebar />
            </SheetContent>
        </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Avatar>
              <AvatarImage src={user?.imageUrl || ''} alt={user?.fullName || 'User'} />
              <AvatarFallback>{getInitials(user?.firstName, user?.lastName)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.fullName || user?.primaryEmailAddress?.emailAddress}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/dashboard/profile" passHref>
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
