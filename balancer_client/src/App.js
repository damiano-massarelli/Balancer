import React from 'react';
import Container from 'react-bootstrap/Container';
import RoutedNavbar from './components/nav/MainNavbar';
import UserMenu from './components/users/UserMenu';
import GroupMenu from './components/groups/GroupMenu';
import ExpenseMenu from './components/expenses/ExpenseMenu';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { UserProvider } from './context/users/UserState';
import { GroupProvider } from './context/groups/GroupState';

function App(props) {
  return (
    <BrowserRouter>

      <RoutedNavbar />
      <Container>
        <Switch>
          <UserProvider>
            <Route exact path="/users/" component={ UserMenu } />
            <GroupProvider>
              <Route exact path="/groups/" component={ GroupMenu } />
              <Route exact path="/" component={ ExpenseMenu } />
            </GroupProvider>
          </UserProvider>
        </Switch>
      </Container>
    </BrowserRouter>

  );
}

export default App;
