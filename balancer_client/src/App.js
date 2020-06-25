import React from 'react';
import Container from 'react-bootstrap/Container';
import RoutedNavbar from './components/nav/MainNavbar';
import UserMenu from './components/users/UserMenu';
import GroupMenu from './components/groups/GroupMenu';
import TransactionMenu from './components/expenses/TransactionMenu';
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
              <Route exact path="/" component={ TransactionMenu } />
            </GroupProvider>
          </UserProvider>
          <Route exact path="/history/" component={ TransactionMenu } />
        </Switch>
      </Container>
    </BrowserRouter>

  );
}

export default App;
