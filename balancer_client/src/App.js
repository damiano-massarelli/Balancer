import React from 'react';
import Container from 'react-bootstrap/Container';
import MainNavbar from './common/MainNavbar'
import UserList from './users/UserList'
import Groups from './groups/Groups'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

function App(props) {
  return (
      <Router>

        <MainNavbar />
        <Container>
          <Switch>
            <Route path="/users/" component={UserList} />
            <Route path="/groups/" component={Groups} />
          </Switch>
        </Container>
      </Router>

  );
}

export default App;
