import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, NavLink, BrowserRouter as Router } from 'react-router-dom';
import Polls from '../container/Polls.jsx';
import Poll from '../container/Poll.jsx';
import CreatePoll from '../container/CreatePoll.jsx';
import Notfound from '../presentational/NotFound.jsx';
import { Navbar, Nav } from 'react-bootstrap';

const routing = (
  <Router>
    <div>
      <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to='/' exact>Home</Nav.Link>
          <Nav.Link as={NavLink} to='/create'>Create New</Nav.Link>
        </Nav>
      </Navbar>
      <Route exact path="/" component={Polls} />
      <Route exact path="/polls" component={Polls} />
      <Route path="/polls/:Id" component={Poll} />
      <Route path="/create" component={CreatePoll} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
