// lib/perms.ts
import { query } from './db'
import { logger } from './logger'

export interface Permission {
  id: number
  module: string
  action: string
  scope: string
}

export interface UserPermissions {
  userId: number
  role: string
  permissions: Permission[]
}

// Cache permissions for the duration of a request
const permissionCache = new Map<number, UserPermissions>()

export async function getUserPermissions(userId: number): Promise<UserPermissions | null> {
  // Check cache first
  if (permissionCache.has(userId)) {
    return permissionCache.get(userId)!
  }

  try {
    const result = await query(`
      SELECT 
        u.id as user_id,
        u.role,
        p.id as permission_id,
        p.module,
        p.action,
        p.scope
      FROM users u
      LEFT JOIN roles r ON u.role = r.name
      LEFT JOIN role_permissions rp ON r.id = rp.role_id
      LEFT JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = $1
    `, [userId])

    if (result.rows.length === 0) {
      return null
    }

    const userRow = result.rows[0]
    const permissions: Permission[] = result.rows
      .filter(row => row.permission_id)
      .map(row => ({
        id: row.permission_id,
        module: row.module,
        action: row.action,
        scope: row.scope
      }))

    const userPermissions: UserPermissions = {
      userId: userRow.user_id,
      role: userRow.role,
      permissions
    }

    // Cache for this request
    permissionCache.set(userId, userPermissions)
    
    return userPermissions
  } catch (error) {
    logger.error('Failed to get user permissions', { userId, error: error instanceof Error ? error.message : 'Unknown error' })
    return null
  }
}

export function hasPermission(
  userPermissions: UserPermissions,
  module: string,
  action: string,
  scope: string = 'ALL'
): boolean {
  return userPermissions.permissions.some(p => 
    p.module === module && 
    p.action === action && 
    (p.scope === 'ALL' || p.scope === scope)
  )
}

export function canViewModule(userPermissions: UserPermissions, module: string): boolean {
  return hasPermission(userPermissions, module, 'VIEW')
}

export function canAccessResource(
  userPermissions: UserPermissions,
  module: string,
  action: string,
  resourceOwnerId?: number
): boolean {
  // Check if user has permission with ALL scope
  if (hasPermission(userPermissions, module, action, 'ALL')) {
    return true
  }

  // Check if user has permission with OWN scope and owns the resource
  if (hasPermission(userPermissions, module, action, 'OWN')) {
    return resourceOwnerId === userPermissions.userId
  }

  return false
}

export function filterByScope<T extends { owner_id?: number }>(
  userPermissions: UserPermissions,
  module: string,
  action: string,
  items: T[]
): T[] {
  // If user has ALL scope, return all items
  if (hasPermission(userPermissions, module, action, 'ALL')) {
    return items
  }

  // If user has OWN scope, filter to only owned items
  if (hasPermission(userPermissions, module, action, 'OWN')) {
    return items.filter(item => item.owner_id === userPermissions.userId)
  }

  // No permission, return empty array
  return []
}

// Clear cache (call at end of request)
export function clearPermissionCache(): void {
  permissionCache.clear()
}
