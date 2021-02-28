import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import Layout from './containers/Layout';
import Home from './components/Home';
import Edit from './components/Edit';
import Settings from './components/Settings';

import history from './utils/history';
import { HOME_PAGE_ROUTE, EDIT_PAGE_ROUTE, SETTINGS_PAGE_ROUTE } from './utils/routes';

const App = () => (
  <Router history={history}>
    <Layout>
      <Switch>
        <Route path={HOME_PAGE_ROUTE} component={Home} />
        <Route path={`${EDIT_PAGE_ROUTE}/:type`} component={Edit} />
        <Route path={SETTINGS_PAGE_ROUTE} component={Settings} />
        <Route path="*" component={() => <div>Not found</div>} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
