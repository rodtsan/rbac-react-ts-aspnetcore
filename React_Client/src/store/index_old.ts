import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers from '../redux/reducers';
import combinedEpics from '../redux/index';
import dependencies from '@common/epic-templates';
import { Action, RootState } from '@common/models';
import { initialRootState } from './localStorage'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}
const composeEnhancers =
    (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const epicMiddleware = createEpicMiddleware<Action<any>, Action<any>, RootState>({
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
