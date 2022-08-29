import { AnyAction } from 'redux';
import RootState, { Paging, UserLogin, TokenResponse } from './RootState';
import Profile, { ProfileProps } from './Profile';
import Role from './Role';
import User, { UserRole, UserRoles } from './User';
import RegisterProps, { LoginProps } from './Register';
export interface RootAction extends AnyAction {}
export {
    RootState,
    Paging,
    UserLogin,
    TokenResponse,
    Profile,
    ProfileProps,
    Role,
    User,
    UserRole,
    UserRoles,
    RegisterProps,
    LoginProps
};
