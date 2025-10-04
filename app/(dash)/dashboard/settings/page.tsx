// app/(dash)/dashboard/settings/page.tsx
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata = {
  title: 'Settings | D.E. Technics',
  description: 'Manage your dashboard settings',
}

export default function SettingsIndexPage() {
  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in-50">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage users, roles, and permissions.</p>
      </div>
      <Separator className="my-4" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="motion-safe:animate-in motion-safe:fade-in-50">
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure roles and their permissions for your team.
            </p>
            <Separator />
            <Link href="/dashboard/settings/roles" className="text-sm font-medium text-primary hover:underline">
              Manage Roles
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
