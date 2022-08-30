import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { RootState, RootAction } from '@common/models/Interfaces';
import { initialRootState } from './localStorage';
import dependencies from '@common/epic-templates';
import epics from '@store/reducers/epics';
import reducers from './reducers';

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>({
    dependencies
});

const store = configureStore({
    reducer: reducers,
    middleware: [epicMiddleware],
    preloadedState: initialRootState,
});

epicMiddleware.run(epics);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => store.dispatch;

export default store;
