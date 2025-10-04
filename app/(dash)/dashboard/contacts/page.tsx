// app/(dash)/dashboard/contacts/page.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { DataTableViewOptions } from '@/components/ui/data-table-view-options'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Search, ArrowRight, Eye, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  country_code?: string
  subject?: string
  message?: string
  status: string
  converted_to_quote_id?: number
  created_at: string
  updated_at: string
  country?: {
    country_name: string
    flag_emoji?: string
  }
}

// Client-safe RBAC helpers (no server imports)
type ClientPermission = { module: string; action: string; scope: 'ALL' | 'OWN' | string }
type ClientUserPermissions = { userId: number; permissions: ClientPermission[] }

function clientHasPermission(up: ClientUserPermissions | null, module: string, action: string, scope: 'ALL' | 'OWN' | string = 'ALL') {
  if (!up) return false
  return up.permissions?.some((p) => p.module === module && p.action === action && (p.scope === 'ALL' || p.scope === scope))
}

function clientCanAccessResource(up: ClientUserPermissions | null, module: string, action: string, resourceOwnerId?: number) {
  if (!up) return false
  if (clientHasPermission(up, module, action, 'ALL')) return true
  if (clientHasPermission(up, module, action, 'OWN')) return resourceOwnerId === up.userId
  return false
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  converted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
}

const columnHelper = createColumnHelper<Contact>()

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [convertingId, setConvertingId] = useState<number | null>(null)
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteContactId, setDeleteContactId] = useState<number | null>(null)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)
  const [csrfToken, setCsrfToken] = useState<string>('')
  const [userPermissions, setUserPermissions] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  const columns = useMemo<ColumnDef<Contact, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all visible"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('name')}</div>
        ),
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground">{row.getValue('email')}</div>
        ),
      }),
      columnHelper.accessor('subject', {
        header: 'Subject',
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate">{row.getValue('subject') || '—'}</div>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as keyof typeof statusColors
          return (
            <Badge variant="secondary" className={cn(statusColors[status] || statusColors.new, 'whitespace-nowrap')}>
              {status}
            </Badge>
          )
        },
      }),
      columnHelper.display({
        id: 'country',
        header: 'Country',
        cell: ({ row }) => {
          const country = row.original.country
          return country ? (
            <div className="flex items-center gap-2">
              <span>{country.flag_emoji}</span>
              <span className="text-sm">{country.country_name}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">—</span>
          )
        },
      }),
      columnHelper.accessor('created_at', {
        header: 'Created',
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground">
            {format(new Date(row.getValue('created_at')), 'MMM dd, yyyy')}
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const c = row.original
          const canUpdate = clientCanAccessResource(userPermissions, 'CONTACTS', 'UPDATE', (c as any).owner_id)
          const canDelete = clientCanAccessResource(userPermissions, 'CONTACTS', 'DELETE', (c as any).owner_id)
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/dashboard/contacts/${c.id}`)}
                aria-label="View contact"
                title="View"
              >
                <Eye className="h-4 w-4" />
              </Button>
              {canUpdate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/dashboard/contacts/${c.id}`)}
                  aria-label="Edit contact"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {!c.converted_to_quote_id && canUpdate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConvertToQuote(c.id)}
                  disabled={convertingId === c.id}
                  title="Convert to Quote"
                  aria-label="Convert to Quote"
                >
                  {convertingId === c.id ? 'Converting...' : (<><ArrowRight className="h-4 w-4 mr-1" />Convert</>)}
                </Button>
              )}
              {c.converted_to_quote_id && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/dashboard/quotes/${c.converted_to_quote_id}`)}
                  title="View Quote"
                  aria-label="View Quote"
                >
                  View Quote
                </Button>
              )}
              {canDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(c.id)}
                  aria-label="Delete contact"
                  title="Delete"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )
        },
      }),
    ],
    [router, convertingId, userPermissions]
  )

  const table = useReactTable({
    data: contacts,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection,
    },
  })

  useEffect(() => {
    fetchContacts()
    fetchSession()
  }, [statusFilter])

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/session')
      if (!res.ok) return
      const data = await res.json()
      setUserPermissions({ userId: data.user.id, permissions: data.user.permissions })
      setCsrfToken(data.csrfToken || '')
    } catch {
      // no-op
    }
  }

  const fetchContacts = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }

      const response = await fetch(`/api/contacts?${params}`)
      if (!response.ok) throw new Error('Failed to fetch contacts')
      
      const data = await response.json()
      setContacts(data.contacts || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
      toast.error('Error', { description: 'Failed to fetch contacts' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConvertToQuote = async (contactId: number) => {
    try {
      setConvertingId(contactId)
      const response = await fetch(`/api/contacts/${contactId}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
      })

      if (!response.ok) throw new Error('Failed to convert contact')

      const data = await response.json()
      
      toast.success('Success', { description: 'Contact converted to quote successfully' })

      // Refresh contacts list
      fetchContacts()
      
      // Navigate to the new quote
      router.push(`/dashboard/quotes/${data.quote.id}`)
    } catch (error) {
      console.error('Error converting contact:', error)
      toast.error('Error', { description: 'Failed to convert contact to quote' })
    } finally {
      setConvertingId(null)
    }
  }

  const handleDeleteClick = (id: number) => {
    setDeleteContactId(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteContactId) return
    try {
      const resp = await fetch(`/api/contacts/${deleteContactId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
      })
      if (!resp.ok) throw new Error('Delete failed')
      setContacts((prev) => prev.filter((c) => c.id !== deleteContactId))
      toast.success('Success', { description: 'Contact deleted' })
    } catch {
      toast.error('Error', { description: 'Failed to delete contact' })
    } finally {
      setDeleteDialogOpen(false)
      setDeleteContactId(null)
    }
  }

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedContacts = selectedRows.map((r) => r.original as Contact)

  const handleBulkDelete = async () => {
    const targets = selectedContacts.filter((c) => clientCanAccessResource(userPermissions, 'CONTACTS', 'DELETE', (c as any).owner_id))
    if (targets.length === 0) return
    const results = await Promise.allSettled(
      targets.map((c) =>
        fetch(`/api/contacts/${c.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        })
      )
    )
    const succeeded = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.length - succeeded
    if (succeeded > 0) {
      const ids = new Set(targets.map((c) => c.id))
      setContacts((prev) => prev.filter((c) => !ids.has(c.id)))
    }
    toast[failed > 0 ? 'error' : 'success'](failed > 0 ? 'Partial success' : 'Success', { description: `${succeeded} deleted${failed ? `, ${failed} failed` : ''}` })
    setRowSelection({})
    setBulkDeleteDialogOpen(false)
  }

  const handleBulkConvert = async () => {
    const targets = selectedContacts.filter((c) => clientCanAccessResource(userPermissions, 'CONTACTS', 'UPDATE', (c as any).owner_id))
    if (targets.length === 0) return
    const results = await Promise.allSettled(
      targets.map((c) =>
        fetch(`/api/contacts/${c.id}/convert`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        })
      )
    )
    const succeeded = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.length - succeeded
    toast[failed > 0 ? 'error' : 'success'](failed > 0 ? 'Partial success' : 'Success', { description: `${succeeded} converted${failed ? `, ${failed} failed` : ''}` })
    setRowSelection({})
    fetchContacts()
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
        </div>
        <Separator className="my-4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">
            Manage customer inquiries and convert them to quotes
          </p>
        </div>
      </div>
      <Separator className="my-4" />

      {/* Filters */}
      <Card className="motion-safe:animate-in motion-safe:fade-in-50">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
          <CardDescription>
            Filter contacts by status and search terms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Global Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk actions bar (visible when selection > 0) */}
      {selectedContacts.length > 0 && (
        <div className="flex items-center justify-between rounded-md border bg-card p-3 shadow-sm motion-safe:animate-in motion-safe:fade-in-50">
          <div className="text-sm">{selectedContacts.length} selected</div>
          <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm" onClick={() => setBulkDeleteDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete selected
            </Button>
            <Button variant="outline" size="sm" onClick={handleBulkConvert}>
              <ArrowRight className="mr-2 h-4 w-4" /> Convert to Quote
            </Button>
          </div>
        </div>
      )}

      {/* Data Table */}
      <Card className="motion-safe:animate-in motion-safe:fade-in-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contacts ({contacts.length})</CardTitle>
              <CardDescription>
                {table.getFilteredRowModel().rows.length} of {contacts.length} contact(s) shown
              </CardDescription>
            </div>
            <DataTableViewOptions table={table} />
          </div>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center rounded-md border bg-muted/10">
              <p className="text-sm text-muted-foreground">No contacts yet.</p>
              {userPermissions && clientHasPermission(userPermissions, 'CONTACTS', 'CREATE') && (
                <Button onClick={() => router.push('/dashboard/contacts/new')}>Add Contact</Button>
              )}
            </div>
          ) : (
            <DataTable table={table} />
          )}
          <div className="mt-4">
            <DataTablePagination table={table} />
          </div>
        </CardContent>
      </Card>

      {/* Confirm delete dialog (single) */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete contact?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm bulk delete dialog */}
      <Dialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete selected contacts?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleBulkDelete}>Delete selected</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
