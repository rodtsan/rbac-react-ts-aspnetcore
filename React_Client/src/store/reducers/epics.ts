/* Combined Epics from store folder */
import { combineEpics, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RootAction, RootState } from '@common/models/Interfaces';
/** Axios HTTP Request */
import Dependencies from '@common/epic-templates';
/** Epics */
import * as profiles from './manage/profile';
import * as users from './manage/users';
import * as roles from './manage/roles';
import * as login from './account';
import * as weatherForcast from './weatherForcast';

export default (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    dependencies: typeof Dependencies
): Observable<RootAction> =>
    combineEpics(
        login.loginEpic,
        login.registerEpic,
        login.revokeEpic,
        login.getUserEpic,
        profiles.getProfileEpic,
        profiles.updateProfileEpic,
        users.getUsersPerPageEpic,
        users.getUserRolesEpic,
        users.addUserRolesEpic,
        users.updateUserEpic,
        users.deleteUserEpic,
        roles.getRolesPerPageEpic,
        roles.updateRoleEpic,
        weatherForcast.getWeatherForcastEpic
    )(action$, state$, dependencies).pipe(
        catchError((error, source) => {
            console.error(error);
            return source;
        })
    );
