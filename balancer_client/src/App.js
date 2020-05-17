import React from 'react';
import Container from 'react-bootstrap/Container';
import MainNavbar from './common/MainNavbar'
import UserMenu from './users/UserMenu'
import GroupMenu from './groups/GroupMenu'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

function App(props) {
  return (
    <BrowserRouter>

      <MainNavbar />
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
