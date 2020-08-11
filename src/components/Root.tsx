import { ConnectedRouter } from 'connected-react-router';
import React, { Component, Suspense, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { SnackbarProvider } from 'notistack';
import Layout from './Layout';
import { TReduxStore, THistory } from '#/types';
import Error404 from './Error404';
import Loader from '../shared/Loader';
import GlobalStyle from '../theme';

const Home = React.lazy(() => import('../pages/Home'));

export type TRootProps = {
  store: TReduxStore;
  history: THistory;
};

class Root extends Component<TRootProps> {
  render(): ReactNode {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Suspense fallback={<Loader />}>
            <GlobalStyle />
            <React.StrictMode>
              <SnackbarProvider>
                <Layout>
                  <Switch>
                    <Route exact={true} path='/' component={Home} />
                    <Route component={Error404} />
                  </Switch>
                </Layout>
              </SnackbarProvider>
            </React.StrictMode>
          </Suspense>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
