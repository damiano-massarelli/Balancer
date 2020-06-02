import React from 'react';
import Container from 'react-bootstrap/Container';
import RoutedNavbar from './components/nav/MainNavbar'
import UserMenu from './components/users/UserMenu'
import GroupMenu from './components/groups/GroupMenu'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

function App(props) {
  return (
    <BrowserRouter>

      <RoutedNavbar />
      <Container>
        <Switch>
          <Route exact path="/users/" component={UserMenu} />
          <Route exact path="/groups/" component={GroupMenu} />
        </Switch>
      </Container>
    </BrowserRouter>

  );
}

export default App;
