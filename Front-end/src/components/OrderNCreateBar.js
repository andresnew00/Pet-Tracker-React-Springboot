import React from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

export default function OrderNCreateBar(props) {
  return (
    <Container fluid className="OrderNCreate">
      <Row>
        <Col className="orderBy display-inline">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {props.orderOfItems}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={props.changeOrder}>
                Date Older - Newer
              </Dropdown.Item>
              <Dropdown.Item onClick={props.changeOrder}>
                Date Newer - Older
              </Dropdown.Item>
              <Dropdown.Item onClick={props.changeOrder}>
                Alphabetical
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="createButton justify-content-end">
          <Button variant="primary" onClick={props.toggleCreateModal}>
            Create new Patient <i className="fa fa-plus"></i>{" "}
          </Button>{" "}
        </Col>
      </Row>
    </Container>
  );
}
