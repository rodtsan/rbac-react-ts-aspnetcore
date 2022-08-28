import { User } from "@common/models";

export interface UserRolesPayload {
    userId: string;
    roles: string[];
}


export interface UserPayload extends User {
    userId: string;
}