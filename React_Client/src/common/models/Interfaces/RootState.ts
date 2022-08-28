/* Action/return payload */
export interface Paging<T = {}> {
    page: number;
    pageSize: number;
    recordCount: number;
    keywords?: string;
    orderBy?: string;
    records?: T[] | never[];
    deleted?: boolean;
}

/* Return payload */
export interface UserLogin {
    userId: string;
    firstName: string;
    lastName: string;
    pictureUrl: string;
    email: string;
    emailConfirmed?: boolean;
    lockoutEnabled?: boolean;
    lockoutEnd?: string;
    accessFailedCount?: number;
    createdWhen?: string;
    lastEditedWhen?: string;
    roles: string[]; 
}

export interface TokenResponse {
    userId?: string;
    accessToken?: string;
    refreshToken?: string;
}

export default interface RootState {
    users: {
        loading: boolean;
        paging: Paging | {};
        userRoles: [],
        error: Error;
    };
    roles: {
        loading: boolean;
        paging: Paging | {};
        error: Error;
    };
    account: {
        loading: boolean;
        error: Error;
        isLoggedIn: boolean;
        userLogin: UserLogin | {};
        isRegistered: boolean;
        isPasswordReset: boolean;
    };
    profiles: {
        loading: boolean;
        error: Error;
        profile: {};
    };
    weatherForcast: {
        loading: boolean;
        records: never[];
        error: Error;
    };
}

