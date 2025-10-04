// app/(dash)/dashboard/page.tsx
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  // Redirect to quotes page by default
  redirect('/dashboard/quotes')
}
