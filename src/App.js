import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar, Nav
} from 'react-bootstrap';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Request from './Request';
import Report from './Report'

function App() {
  return (
    <Router basename="parking">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Parking Lot</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#report">Report</Nav.Link>
            <Nav.Link href="#request">Request</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/report">
          <Report />
        </Route>
        <Route path="/request">
          <Request />
        </Route>
        <Route path="/">
          <Report />
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
