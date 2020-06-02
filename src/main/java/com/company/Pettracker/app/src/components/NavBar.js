import React from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar className="Nav" expand="lg">
        <Navbar.Brand href="/">Cuchitos Pet Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button>
              <i className="fa fa-search" aria-hidden="true"></i>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
