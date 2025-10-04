// app/(dash)/dashboard/settings/roles/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Edit, Trash2, Shield } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface Permission {
  id: number
  module: string
  action: string
  scope: string
}

interface Role {
  id: number
  name: string
  description: string
  permissions: Permission[]
  created_at: string
}

const MODULES = ['QUOTES', 'CONTACTS', 'REPORTS', 'CATALOG', 'TEMPLATES', 'SETTINGS', 'USERS']
const ACTIONS = ['VIEW', 'READ', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'CONVERT']
const SCOPES = ['ALL', 'OWN']

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissionIds: [] as number[]
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchRoles()
    fetchPermissions()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/settings/roles')
      if (!response.ok) throw new Error('Failed to fetch roles')
      const data = await response.json()
      setRoles(data.roles || [])
    } catch (error) {
      console.error('Error fetching roles:', error)
      toast.error('Error', { description: 'Failed to fetch roles' })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPermissions = async () => {
    try {
      const response = await fetch('/api/settings/permissions')
      if (!response.ok) throw new Error('Failed to fetch permissions')
      const data = await response.json()
      setPermissions(data.permissions || [])
    } catch (error) {
      console.error('Error fetching permissions:', error)
    }
  }

  const handleSaveRole = async () => {
    try {
      const url = editingRole ? `/api/settings/roles/${editingRole.id}` : '/api/settings/roles'
      const method = editingRole ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to save role')

      toast.success('Success', { description: `Role ${editingRole ? 'updated' : 'created'} successfully` })

      setIsDialogOpen(false)
      setEditingRole(null)
      setFormData({ name: '', description: '', permissionIds: [] })
      fetchRoles()
    } catch (error) {
      console.error('Error saving role:', error)
      toast.error('Error', { description: 'Failed to save role' })
    }
  }

  const handleEditRole = (role: Role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      description: role.description,
      permissionIds: role.permissions.map(p => p.id)
    })
    setIsDialogOpen(true)
  }

  const handleDeleteRole = async (roleId: number) => {
    if (!confirm('Are you sure you want to delete this role?')) return

    try {
      const response = await fetch(`/api/settings/roles/${roleId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete role')

      toast.success('Success', { description: 'Role deleted successfully' })

      fetchRoles()
    } catch (error) {
      console.error('Error deleting role:', error)
      toast.error('Error', { description: 'Failed to delete role' })
    }
  }

  const handlePermissionToggle = (permissionId: number) => {
    setFormData(prev => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(permissionId)
        ? prev.permissionIds.filter(id => id !== permissionId)
        : [...prev.permissionIds, permissionId]
    }))
  }

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = []
    }
    acc[permission.module].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)

  if (isLoading) {
    return (
      <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in-50">
        <Skeleton className="h-8 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
      <Separator className="my-4" />
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
          <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground">
            Manage user roles and their permissions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRole(null)
              setFormData({ name: '', description: '', permissionIds: [] })
            }}>
              <Plus className="mr-2 h-4 w-4" />
              New Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </DialogTitle>
              <DialogDescription>
                Define role details and assign permissions
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData(prev => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter role name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData(prev => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Enter role description"
                  />
                </div>
              </div>

              {/* Permissions Matrix */}
              <div>
                <Label className="text-base font-semibold">Permissions</Label>
                <div className="mt-4 space-y-6">
                  {MODULES.map(module => (
                    <div key={module} className="space-y-3">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        {module}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pl-6">
                        {(groupedPermissions[module] || []).map(permission => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`permission-${permission.id}`}
                              checked={formData.permissionIds.includes(permission.id)}
                              onCheckedChange={() => handlePermissionToggle(permission.id)}
                            />
                            <Label 
                              htmlFor={`permission-${permission.id}`}
                              className="text-sm cursor-pointer"
                            >
                              {permission.action}
                              {permission.scope !== 'ALL' && (
                                <Badge variant="outline" className="ml-1 text-xs">
                                  {permission.scope}
                                </Badge>
                              )}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveRole}>
                {editingRole ? 'Update Role' : 'Create Role'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles Table */}
      <Card className="motion-safe:animate-in motion-safe:fade-in-50">
        <CardHeader>
          <CardTitle>Existing Roles</CardTitle>
          <CardDescription>
            Current roles and their permission assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map(role => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{role.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map(permission => (
                        <Badge key={permission.id} variant="secondary" className="text-xs">
                          {permission.module}.{permission.action}
                        </Badge>
                      ))}
                      {role.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(role.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRole(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {role.name !== 'admin' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {roles.length === 0 && (
            <div className="text-center py-8 text-muted-foreground rounded-md border bg-muted/10">
              No roles found. Create your first role to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
