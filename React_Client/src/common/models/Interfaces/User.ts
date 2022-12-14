/* Return payloads */
export interface UserRole {
    userId?: string;
    roleId?: string;
    name?: string;
    description?: string;
    selected?: boolean;
}

export interface User {
    userId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    emailConfirmed?: boolean;
    phoneNumberConfirmed?: boolean;
    lockoutEnabled?: boolean;
    lockoutEnd?: string;
    twoFactorEnabled?: boolean;
    accessFailedCount?: number;
    createdWhen?: string;
    lastEditedWhen?: string;
    roles?: string[];
    deleted?: boolean;
}

export interface UserRoles {
    userId: string;
    roles: string[];
}
