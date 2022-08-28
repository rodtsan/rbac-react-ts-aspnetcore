export interface LoginPayload {
    email?: string;
    password?: string;
}

export interface RegisterPayload extends LoginPayload {
    firstName?: string;
    lastName?: string;
    confirmEmailUrl?: string;
    roles?: string[]
}

export interface RefreshTokenPayload {
    accessToken?: string;
    refreshToken?: string;
}

export interface ConfirmEmailPayload {
    userId: string;
    token: string;
}
