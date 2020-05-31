import React from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

function OrderNCreateBar() {


  return (
    <Container fluid className="OrderNCreate">
      <Row>
        <Col className="orderBy">
          <h3>Order By:</h3>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
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
        <Button variant="primary">Create new Patient</Button>{' '}
        </Col>
      </Row>
    </Container>
  );
}

export default OrderNCreateBar;
