export interface Login {
    email?: string;
    password?: string;
}

export interface Register extends Login {
    firstName?: string;
    lastName?: string;
    confirmEmailUrl?: string;
    roles?: string[]
}

export interface RefreshToken {
    accessToken?: string;
    refreshToken?: string;
}

export interface ConfirmEmail {
    userId: string;
    token: string;
}

export interface ResetPassword {
    userId?: string;
    token?: string;
    password?: string;
}

export interface ForgotPasswordd {
    email?: string;
}

export interface RefreshToken {
    accessToken?: string;
    refreshToken?: string;
}

export interface ConfirmEmail {
    userId: string;
    token: string;
}
