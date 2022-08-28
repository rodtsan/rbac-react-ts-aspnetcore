import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { RootState, Action } from '@common/models';
import { initialRootState } from './localStorage';
import dependencies from '@common/epic-templates';
import epics from '@redux/.';
import reducers from '@redux/reducers';

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>({
    dependencies
});


const store = configureStore({
    reducer: reducers,
    middleware: [epicMiddleware],
    preloadedState: initialRootState
});

epicMiddleware.run(epics);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => store.dispatch;

export default store;
