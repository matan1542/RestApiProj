const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { BugApp } from './js/pages/BugApp.jsx';
import { BugDetails } from './js/pages/BugDetails.jsx';

export function App() {
    
  return (
    <Router>
      <main>
        <Switch>
          <Route component={BugDetails} path='/api/bug/:bugId/read' />
          <Route component={BugApp} path='/' />
        </Switch>
      </main>
    </Router>
  );
}
