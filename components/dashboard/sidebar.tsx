'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const navigation = [
  { name: 'Quotes', href: '/dashboard/quotes', icon: FileText },
  { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
  className?: string
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function Sidebar({ className, collapsed: collapsedProp, onCollapsedChange }: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = collapsedProp ?? internalCollapsed
  const setCollapsed = (next: boolean) => {
    if (onCollapsedChange) onCollapsedChange(next)
    else setInternalCollapsed(next)
  }
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-sidebar text-sidebar-foreground border-sidebar-border overflow-hidden rounded-r-xl",
        collapsed ? "w-0 border-r-0" : "w-64 border-r",
        className
      )}
      aria-hidden={collapsed}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-4 bg-sidebar/90 supports-[backdrop-filter:blur(0)]:bg-sidebar/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">DT</span>
          </div>
          {!collapsed && (
            <span className="font-semibold">D.E. Technics</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)
            
            return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:rounded-full before:content-[''] before:opacity-0",
                  collapsed && "justify-center px-2",
                  isActive && "before:bg-sidebar-primary before:opacity-100"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span className="ml-2">{item.name}</span>}
              </Button>
            </Link>
          )
        })}
        </nav>
      </ScrollArea>
    </div>
  )
}

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground border-sidebar-border">
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">DT</span>
            </div>
            <span className="font-semibold">D.E. Technics</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:rounded-full before:content-[''] before:opacity-0",
                      isActive && "before:bg-sidebar-primary before:opacity-100"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="ml-2">{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
