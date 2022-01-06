import React from "react";
import { Navbar, Form, FormControl } from "react-bootstrap";
import logo from "../images/logo.png";
export default function NavBar(props) {
  return (
    <Navbar className="Nav" expand="md">
      <Navbar.Brand href="#">
        <img
          src={logo}
          className="d-inline-block align-top"
          alt="Cuchitos Pet Tracker"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={props.search}
            onChange={props.updateSearch}
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

// class NavBar extends React.Component {
//   render() {
//     return (
//       <Navbar className="Nav" expand="lg">
//         <Navbar.Brand href="/">Cuchitos Pet Tracker</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Form inline>
//             <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.props.search} onChange={this.props.updateSearch.bind(this)}/>
//           </Form>
//         </Navbar.Collapse>
//       </Navbar>
//     );
//   }
// }

// export default NavBar;
