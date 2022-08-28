/* Combined reducers from store folder */
import { combineReducers } from '@reduxjs/toolkit';
import profiles from './manage/profile/reducer';
import users from './manage/users/reducer';
import roles from './manage/roles/reducer';
import account from './account/reducer';
import weatherForcast from './weatherForcast/reducer';

export default combineReducers({
    account,
    profiles,
    users,
    roles,
    weatherForcast
});
