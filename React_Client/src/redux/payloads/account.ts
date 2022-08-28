export interface ResetPasswordPayload {
    userId?: string;
    token?: string;
    password?: string;
}

export interface ForgotPassworddPayload {
    email?: string;
}

export interface RefreshTokenPayload {
    accessToken?: string;
    refreshToken?: string;
}

export interface ConfirmEmailPayload {
    userId: string;
    token: string;
}
