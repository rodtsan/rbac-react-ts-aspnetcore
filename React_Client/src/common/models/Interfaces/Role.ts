/** Return Payload */
export default interface Role {
    roleId?: string;
    name?: string;
    description?: string;
    usersCount?: number;
    createdWhen?: string;
}

export interface RolePayload {
    roleId?: string;
    name?: string;
    description?: string;
}