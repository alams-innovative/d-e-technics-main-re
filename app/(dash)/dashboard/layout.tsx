// app/(dash)/dashboard/layout.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Topbar } from '@/components/dashboard/topbar'
import { MobileDrawer } from '@/components/dashboard/mobile-drawer'
import { ThemeProvider } from '@/components/theme-provider'
import { ChevronRight } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

interface User {
  id: number
  username: string
  email: string
  role: string
  permissions: Array<{
    module: string
    action: string
    scope: string
  }>
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session')
        if (!response.ok) {
          router.push('/login')
          return
        }
        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        console.error('Session fetch failed:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div data-dashboard className="min-h-screen bg-background antialiased selection:bg-primary/20 selection:text-primary-foreground">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed left-0 top-0 z-30 h-full">
          <Sidebar
            className={undefined}
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
          />
        </div>

        {sidebarCollapsed && (
          <button
            type="button"
            aria-label="Expand sidebar"
            title="Expand sidebar"
            onClick={() => setSidebarCollapsed(false)}
            className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 h-12 w-4 items-center justify-center rounded-r-md bg-muted/40 hover:bg-muted/60 text-foreground border border-l-0 border-border ring-1 ring-border/60 hover:ring-border/80 motion-safe:transition-colors"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        {/* Mobile Drawer */}
        <MobileDrawer />

        {/* Topbar - spans full width */
        }
        <div
          className={cn(
            'motion-safe:transition-[padding] duration-200 ease-out',
            sidebarCollapsed ? 'lg:pl-0' : 'lg:pl-64'
          )}
        >
          <Topbar user={user || undefined} />
        </div>

        {/* Main Content */}
        <div
          className={cn(
            'motion-safe:transition-[padding] duration-200 ease-out',
            sidebarCollapsed ? 'lg:pl-0' : 'lg:pl-64'
          )}
        >
          {/* Page Content */}
          <main className="px-6 pb-6 pt-0">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>

        <Toaster />
      </div>
    </ThemeProvider>
  )
}
