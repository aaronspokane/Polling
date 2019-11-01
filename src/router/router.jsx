import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, NavLink, Switch, BrowserRouter as Router } from 'react-router-dom';
import Polls from '../components/container/Polls.jsx';
import Poll from '../components/container/Poll.jsx';
import CreateEditPoll from '../components/container/CreateEditPoll.jsx';
import Notfound from '../components/presentational/NotFound.jsx';
import Answers from '../components/container/Answers.jsx';
import { Navbar, Nav } from 'react-bootstrap';

const routing = (
  <Router>
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to='/' exact>Home</Nav.Link>
          <Nav.Link as={NavLink} to='/create'>Create New</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Polls} />
        <Route exact path="/polls" component={Polls} />
        <Route path="/create" component={CreateEditPoll} />
        <Route path="/polls/:id" component={Poll} />
        <Route path="/answers/:id" component={Answers} />
        <Route path="/edit/:id" component={CreateEditPoll} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
