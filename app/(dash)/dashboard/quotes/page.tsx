// app/(dash)/dashboard/quotes/page.tsx
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
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { DataTableViewOptions } from '@/components/ui/data-table-view-options'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select as ShadSelect, SelectContent as ShadSelectContent, SelectItem as ShadSelectItem, SelectTrigger as ShadSelectTrigger, SelectValue as ShadSelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { Plus, Search, Filter, Calendar as CalendarIcon, Download, Eye, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import type { DateRange } from 'react-day-picker'

interface Quote {
  id: number
  name: string
  email: string
  phone?: string
  country_code?: string
  product?: string
  message?: string
  status: 'pending' | 'in_review' | 'sent' | 'won' | 'lost' | 'archived'
  owner_id?: number
  estimated_value: number
  created_at: string
  updated_at: string
  owner?: { username: string }
  country?: { country_name: string; flag_emoji?: string }
}

// Client-safe RBAC helpers (do not import server perms/db)
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
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  in_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  sent: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  won: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
}

const columnHelper = createColumnHelper<Quote>()

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteQuoteId, setDeleteQuoteId] = useState<number | null>(null)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [userPermissions, setUserPermissions] = useState<any>(null)
  const [csrfToken, setCsrfToken] = useState<string>('')
  const router = useRouter()

  const columns = useMemo<ColumnDef<Quote, any>[]>(
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
      columnHelper.accessor('product', {
        header: 'Product',
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate">{row.getValue('product') || '—'}</div>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as keyof typeof statusColors
          return (
            <Badge variant="secondary" className={cn(statusColors[status], 'whitespace-nowrap')}>
              {status.replace('_', ' ')}
            </Badge>
          )
        },
      }),
      columnHelper.accessor('estimated_value', {
        header: 'Value',
        cell: ({ row }) => {
          const value = row.getValue('estimated_value') as number
          return (
            <div className="font-medium">
              {value > 0 ? `$${value.toLocaleString()}` : '—'}
            </div>
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
      columnHelper.display({
        id: 'owner',
        header: 'Owner',
        cell: ({ row }) => {
          const owner = row.original.owner
          return owner ? (
            <div className="text-sm">{owner.username}</div>
          ) : (
            <span className="text-muted-foreground">Unassigned</span>
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
          const quote = row.original
          const permittedToDelete = (q: Quote) => clientCanAccessResource(userPermissions, 'QUOTES', 'DELETE', q.owner_id)
          const permittedToUpdate = (q: Quote) => clientCanAccessResource(userPermissions, 'QUOTES', 'UPDATE', q.owner_id)
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/dashboard/quotes/${quote.id}`)}
                aria-label="View quote"
                title="View"
              >
                <Eye className="h-4 w-4" />
              </Button>
              {permittedToUpdate(quote) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/dashboard/quotes/${quote.id}/edit`)}
                  aria-label="Edit quote"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {permittedToDelete(quote) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(quote.id)}
                  aria-label="Delete quote"
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
    [router, userPermissions]
  )

  const table = useReactTable({
    data: quotes,
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
  
  const selectedQuotes = useMemo(() => {
    return table.getFilteredSelectedRowModel().rows.map((row) => row.original as Quote)
  }, [table])

  const handleDeleteClick = (id: number) => {
    setDeleteDialogOpen(true)
    setDeleteQuoteId(id)
  }

  // Single delete confirm
  const handleDeleteConfirm = async () => {
    if (!deleteQuoteId) return
    setIsDeleting(true)
    try {
      const resp = await fetch(`/api/quotes/${deleteQuoteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      })
      if (!resp.ok) throw new Error('Delete failed')
      setQuotes((prev) => prev.filter((q) => q.id !== deleteQuoteId))
      toast.success('Quote deleted successfully')
    } catch (e) {
      toast.error('Failed to delete quote')
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setDeleteQuoteId(null)
    }
  }

  // Bulk operations
  const handleBulkDelete = async () => {
    const targets = selectedQuotes.filter((q) => clientCanAccessResource(userPermissions, 'QUOTES', 'DELETE', q.owner_id))
    if (targets.length === 0) return
    setIsDeleting(true)
    const results = await Promise.allSettled(
      targets.map((q) =>
        fetch(`/api/quotes/${q.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
        }).then((r) => {
          if (!r.ok) throw new Error(String(r.status))
          return r
        })
      )
    )
    const succeeded = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.length - succeeded
    if (succeeded > 0) {
      const ids = new Set(targets.map((q) => q.id))
      setQuotes((prev) => prev.filter((q) => !ids.has(q.id)))
    }
    if (failed > 0) {
      toast.error(`${succeeded} deleted, ${failed} failed`)
    } else {
      toast.success(`${succeeded} quote(s) deleted`)
    }
    setRowSelection({})
    setBulkDeleteDialogOpen(false)
    setIsDeleting(false)
  }

  const handleBulkStatusUpdate = async (newStatus: Quote['status']) => {
    const targets = selectedQuotes.filter((q) => clientCanAccessResource(userPermissions, 'QUOTES', 'UPDATE', q.owner_id))
    if (targets.length === 0) return
    setIsDeleting(true)
    const results = await Promise.allSettled(
      targets.map((q) =>
        fetch(`/api/quotes/${q.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify({ status: newStatus }),
        }).then((r) => {
          if (!r.ok) throw new Error(String(r.status))
          return r
        })
      )
    )
    const succeeded = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.length - succeeded
    if (succeeded > 0) {
      const ids = new Set(targets.map((q) => q.id))
      setQuotes((prev) => prev.map((q) => (ids.has(q.id) ? { ...q, status: newStatus } : q)))
    }
    if (failed > 0) {
      toast.error(`${succeeded} updated, ${failed} failed`)
    } else {
      toast.success(`${succeeded} quote(s) updated`)
    }
    setRowSelection({})
    setIsDeleting(false)
  }

  useEffect(() => {
    fetchQuotes()
    fetchSession()
  }, [statusFilter, dateRange])

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/session')
      if (!res.ok) return
      const data = await res.json()
      setUserPermissions({ userId: data.user.id, permissions: data.user.permissions })
      setCsrfToken(data.csrfToken || '')
    } catch (e) {
      // no-op
    }
  }

  const fetchQuotes = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }
      
      if (dateRange?.from) {
        params.append('from', dateRange.from.toISOString())
      }
      
      if (dateRange?.to) {
        params.append('to', dateRange.to.toISOString())
      }

      const response = await fetch(`/api/quotes?${params}`)
      if (!response.ok) throw new Error('Failed to fetch quotes')
      
      const data = await response.json()
      setQuotes(data.quotes || [])
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      const response = await fetch('/api/quotes/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters: { status: statusFilter, dateRange: dateRange || {} } })
      })
      
      if (!response.ok) throw new Error('Export failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `quotes-${format(new Date(), 'yyyy-MM-dd')}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
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
          <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
          <p className="text-muted-foreground">
            Manage and track your sales quotes
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard/quotes/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Quote
        </Button>
      </div>
      <Separator className="my-4" />

      {/* Filters */}
      <Card className="motion-safe:animate-in motion-safe:fade-in-50">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
          <CardDescription>
            Filter quotes by status, date range, and search terms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Global Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search quotes..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !dateRange?.from && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, 'LLL dd, y')} -{' '}
                        {format(dateRange.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(dateRange.from, 'LLL dd, y')
                    )
                  ) : (
                    'Pick a date range'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange || undefined}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {/* Export Button */}
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk actions bar (visible when selection > 0) */}
      {selectedQuotes.length > 0 && (
        <div className="flex items-center justify-between rounded-md border bg-card p-3 shadow-sm motion-safe:animate-in motion-safe:fade-in-50">
          <div className="text-sm">{selectedQuotes.length} selected</div>
          <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm" onClick={() => setBulkDeleteDialogOpen(true)} disabled={isDeleting} title="Delete selected quotes">
              <Trash2 className="mr-2 h-4 w-4" /> Delete selected
            </Button>
            <ShadSelect onValueChange={(v) => handleBulkStatusUpdate(v as Quote['status'])}>
              <ShadSelectTrigger className="w-[200px]" disabled={isDeleting} title="Bulk update status">
                <ShadSelectValue placeholder="Bulk status update" />
              </ShadSelectTrigger>
              <ShadSelectContent>
                <ShadSelectItem value="pending">Pending</ShadSelectItem>
                <ShadSelectItem value="in_review">In Review</ShadSelectItem>
                <ShadSelectItem value="sent">Sent</ShadSelectItem>
                <ShadSelectItem value="won">Won</ShadSelectItem>
                <ShadSelectItem value="lost">Lost</ShadSelectItem>
                <ShadSelectItem value="archived">Archived</ShadSelectItem>
              </ShadSelectContent>
            </ShadSelect>
          </div>
        </div>
      )}

      {/* Data Table */}
      <Card className="motion-safe:animate-in motion-safe:fade-in-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quotes ({quotes.length})</CardTitle>
              <CardDescription>
                {table.getFilteredRowModel().rows.length} of {quotes.length} quote(s) shown
              </CardDescription>
            </div>
            <DataTableViewOptions table={table} />
          </div>
        </CardHeader>
        <CardContent>
          {quotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center rounded-md border bg-muted/10">
              <p className="text-sm text-muted-foreground">No quotes yet.</p>
              {userPermissions && clientHasPermission(userPermissions, 'QUOTES', 'CREATE') && (
                <Button onClick={() => router.push('/dashboard/quotes/new')}>
                  <Plus className="mr-2 h-4 w-4" /> New Quote
                </Button>
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
            <DialogTitle>Delete quote?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isDeleting}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm bulk delete dialog */}
      <Dialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete selected quotes?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkDeleteDialogOpen(false)} disabled={isDeleting}>Cancel</Button>
            <Button variant="destructive" onClick={handleBulkDelete} disabled={isDeleting}>Delete selected</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
