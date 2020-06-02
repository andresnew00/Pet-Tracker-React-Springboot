import React from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

class OrderNCreateBar extends React.Component {
  render() {
    return (
      <Container fluid className="OrderNCreate">
        <Row>
          <Col className="orderBy">
            <h3>Order By:</h3>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                date
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="createButton">
            <Button variant="primary">
              Create new Patient <i className="fa fa-plus"></i>{" "}
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OrderNCreateBar;
