'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ModeToggle } from '@/components/theme-toggle'
import { MobileSidebar } from '@/components/dashboard/sidebar'
import { LogOut, Settings, User, ExternalLink } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

interface TopbarProps {
  user?: {
    username: string
    email: string
    role: string
  }
}

export function Topbar({ user }: TopbarProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Derive a professional page title and subtitle from the current route
  const getPageMeta = (path: string): { title: string; subtitle?: string } => {
    // Normalize and strip trailing slashes
    const p = (path || '').replace(/\/$/, '')
    if (p.startsWith('/dashboard/quotes')) return { title: 'Quotes', subtitle: 'Manage and track quotations' }
    if (p.startsWith('/dashboard/contacts')) return { title: 'Contacts', subtitle: 'Leads and customer directory' }
    if (p.startsWith('/dashboard/reports')) return { title: 'Reports', subtitle: 'Performance and insights' }
    if (p.startsWith('/dashboard/settings')) return { title: 'Settings', subtitle: 'Account and workspace preferences' }
    if (p === '/dashboard') return { title: 'Dashboard', subtitle: 'Overview' }
    return { title: 'Dashboard', subtitle: 'Management Console' }
  }

  const { title, subtitle } = getPageMeta(pathname)

  // Keep the browser tab title in sync with the current dashboard section
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `${title} | D.E. Technics Admin`
    }
  }, [title])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 supports-[backdrop-filter:blur(0)]:bg-background/60 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <MobileSidebar />
        {/* Page Title */}
        <div className="ml-3 flex flex-col">
          <h1 className="text-sm sm:text-base font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <span className="text-xs text-muted-foreground leading-none">
              {subtitle}
            </span>
          )}
        </div>
        
        <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
          <ModeToggle />
          
          {/* View Website Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs hover:bg-accent/60"
            onClick={() => window.open('/', '_blank')}
          >
            <ExternalLink className="mr-1 h-3 w-3" />
            View Site
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-accent hover:text-accent-foreground focus-visible:ring-1">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt={user?.username || 'User'} />
                  <AvatarFallback>
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.username || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
