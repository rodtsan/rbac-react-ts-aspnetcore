import { Role } from './Role';
import { User, UserRole } from './User';

/* Action/return payload */
export interface Paging<T = {}> {
    page?: number;
    pageSize?: number;
    recordCount?: number;
    keywords?: string;
    orderBy?: string;
    records?: T[];
    deleted?: boolean;
}

/* Return payload */
export interface UserLogin {
    userId?: string;
    firstName?: string;
    lastName?: string;
    pictureUrl?: string;
    email?: string;
    emailConfirmed?: boolean;
    lockoutEnabled?: boolean;
    lockoutEnd?: string;
    accessFailedCount?: number;
    createdWhen?: string;
    lastEditedWhen?: string;
    roles?: string[];
}

export interface TokenResponse {
    userId?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface ErrorEmpty {
    message?: string;
}

export interface RootState {
    users: {
        loading: boolean;
        paging: Paging<User>;
        userRoles: UserRole[];
        error: Error | ErrorEmpty;
    };
    roles: {
        loading: boolean;
        paging: Paging<Role>;
        error: Error | ErrorEmpty;
    };
    account: {
        loading: boolean;
        isLoggedIn: boolean;
        isRegistered: boolean;
        isEmailConfirmed: boolean;
        isPasswordChanged: boolean;
        error: Error | ErrorEmpty;
        userLogin: UserLogin;
    };
    profiles: {
        loading: boolean;
        error: Error | ErrorEmpty;
        profile: {};
    };
    weatherForcast: {
        loading: boolean;
        records: never[] | [];
        error: Error | ErrorEmpty;
    };
}
