'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, LayoutDashboard, Package, User, LayoutTemplate } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Logo } from "./logo"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/invoices", icon: FileText, label: "Invoices" },
  { href: "/dashboard/invoice-templates", icon: LayoutTemplate, label: "Invoice Templates" },
  { href: "/dashboard/products", icon: Package, label: "Products" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-full flex-col border-r bg-card sm:flex">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo />
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4 sm:px-4">
            <TooltipProvider>
              {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  return (
                    <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                            <Link
                                href={item.href}
                                className={cn(
                                    "my-1 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                    isActive && "bg-primary/10 text-primary"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>{item.label}</p>
                        </TooltipContent>
                    </Tooltip>
                  )
              })}
            </TooltipProvider>
        </nav>
    </aside>
  )
}
