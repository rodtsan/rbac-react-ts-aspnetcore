export interface ApiPaths {
    signIn?: string;
    signUp?: string;
    refresh?: string;
    revoke?: string;
    confirmEmail?: string;
    getRolesPerPage?: string;
    getUsersPerPage?: string;
    getUserRoles?: string;
    addUserRoles?: string;
    getUserInfo?: string;
    updateUser?: string;
    deleteUser?: string;
    getProfile?: string;
    updateProfile?: string;
    weatherForcast?: string;
}

export const apiPaths: ApiPaths = {
    signIn: '/Account/SignIn',
    signUp: '/Account/SignUp',
    refresh: '/Account/Refresh',
    revoke: '/Account/Revoke',
    confirmEmail: '/Account/ConfirmEmail',
    getRolesPerPage: '/Roles/GetRolesPerPage',
    getUserRoles: '/Users/GetUserRoles/',
    addUserRoles: '/Users/AddUserRoles/',
    getUsersPerPage: '/Users/GetUsersPerPage',
    getUserInfo: '/Users/GetUserInfo/',
    updateUser: '/Users/UpdateUser/',
    deleteUser: '/Users/DeleteUser/',
    getProfile: '/Profiles/GetProfile/',
    updateProfile: '/Profiles/UpdateProfile/',
    weatherForcast: '/WeatherForecast'
};
