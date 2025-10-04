// BLOGS ROUTE TEMPORARILY DISABLED - Redirects to home
import { redirect } from 'next/navigation'

export default function BlogsPage() {
  // Redirect to home page while blogs are disabled
  redirect('/')
}
