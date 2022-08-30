import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { isAuthenticated } from '@store/localStorage';
/** Components*/
import routes, { ExtendedRouteProps } from './routes';
import Layout from '@pages/Shared/Layout';
import Spinner from '@components/controls/Spinner'


const AppRoot: React.FunctionComponent<{}> = () => {
    const privateRoutes = routes.filter(
        ({ isPublic, isAuthorize }) =>
            isPublic === true || isAuthorize === isAuthenticated()
    );
    return (
        <Router>
            <Suspense fallback={<Spinner>{}</Spinner>}>
                <Layout>
                    <Routes>
                        {privateRoutes.map((r: ExtendedRouteProps, key: number) => (
                            <Route key={key} {...r} />
                        ))}
                    </Routes>
                </Layout>
            </Suspense>
        </Router>
    );
};

export default AppRoot;
