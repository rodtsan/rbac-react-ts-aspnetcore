export interface Register {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface Login {
    email: string;
    password: string;
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

export interface ForgotPassword {
    email: string;
    forgotPasswordReturnUrl: string;
}

export interface RefreshToken {
    accessToken?: string;
    refreshToken?: string;
}

export interface ConfirmEmail {
    userId: string;
    token: string;
}
