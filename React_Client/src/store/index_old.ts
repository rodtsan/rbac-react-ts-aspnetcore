import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers from './reducers';
import combinedEpics from './reducers/epics';
import dependencies from '@common/epic-templates';
import { RootAction, RootState } from '@common/models/Interfaces';
import { initialRootState } from './localStorage'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}
const composeEnhancers =
    (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>({
    dependencies
});

function configureStore(initialState: RootState) {
    const middleware = [epicMiddleware];
    const enhancer = composeEnhancers(applyMiddleware(...middleware));
    return createStore(reducers, initialState, enhancer);
}

const store = configureStore(initialRootState);

epicMiddleware.run(combinedEpics);

export type AppDispatch = typeof store.dispatch;

export default store;
