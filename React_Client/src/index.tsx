import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import App from './appRoot';
import './assets/scss/style.scss';
import 'cropperjs/dist/cropper.css';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>
);

// For development
// store.subscribe(() => {
//     saveState(store.getState());
// });
