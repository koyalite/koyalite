import type {
    User,
    Organization,
    Role,
    Permission,
    PermissionAction,
    PermissionResource,
    OrganizationRole,
} from "@koyalite/core-types";

// Default permission maps for each role
const rolePermissions: Record<OrganizationRole, Permission[]> = {
    owner: [
        { action: "manage", resource: "organization" },
        { action: "manage", resource: "project" },
        { action: "manage", resource: "user" },
        { action: "manage", resource: "role" },
        { action: "manage", resource: "policy" },
        { action: "manage", resource: "function" },
    ],
    admin: [
        { action: "read", resource: "organization" },
        { action: "manage", resource: "project" },
        { action: "manage", resource: "user" },
        { action: "read", resource: "role" },
        { action: "manage", resource: "policy" },
        { action: "manage", resource: "function" },
    ],
    member: [
        { action: "read", resource: "organization" },
        { action: "read", resource: "project" },
        { action: "create", resource: "project" },
        { action: "update", resource: "project" },
        { action: "read", resource: "user" },
        { action: "read", resource: "policy" },
        { action: "read", resource: "function" },
    ],
    viewer: [
        { action: "read", resource: "organization" },
        { action: "read", resource: "project" },
        { action: "read", resource: "user" },
        { action: "read", resource: "policy" },
        { action: "read", resource: "function" },
    ],
};

/**
 * Check if a user has permission to perform an action on a resource
 */
export function hasPermission(
    role: Role,
    action: PermissionAction,
    resource: PermissionResource
): boolean {
    // Check for manage permission first (implies all other permissions)
    const hasManagePermission = role.permissions.some(
        (p) => p.action === "manage" && p.resource === resource
    );

    if (hasManagePermission) return true;

    // Check for specific action permission
    return role.permissions.some((p) => p.action === action && p.resource === resource);
}

/**
 * Check if a user is an owner of an organization
 */
export function isOrganizationOwner(role: Role): boolean {
    return role.name === "owner";
}

/**
 * Check if a user can manage an organization
 */
export function canManageOrganization(role: Role): boolean {
    return hasPermission(role, "manage", "organization");
}

/**
 * Check if a user can manage projects in an organization
 */
export function canManageProjects(role: Role): boolean {
    return hasPermission(role, "manage", "project");
}

/**
 * Check if a user can manage users in an organization
 */
export function canManageUsers(role: Role): boolean {
    return hasPermission(role, "manage", "user");
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(roleName: OrganizationRole): Permission[] {
    return rolePermissions[roleName];
}

/**
 * Check if a role has sufficient permissions to perform all actions of another role
 */
export function canAssignRole(assignerRole: Role, roleToAssign: Role): boolean {
    if (assignerRole.name === "owner") return true;
    if (assignerRole.name === "admin" && roleToAssign.name !== "owner") return true;
    return false;
}
