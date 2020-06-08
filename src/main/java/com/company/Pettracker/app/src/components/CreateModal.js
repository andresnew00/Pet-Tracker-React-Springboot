import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default class CreateModal extends React.Component {
  render() {
    return (
      <div className="CreateModal">
        <section>
          <div className="topBar">
            <Row>
              <Col>
                <h2>Create New Patient</h2>
              </Col>
              <Col className="closeButton">
                <Button onClick={this.props.toggleCreateModal}>
                  <i className="fa fa-close fa-lg"></i>
                </Button>
              </Col>
            </Row>
          </div>
          <div className="modalContent">
            <Form className="form">
              <Row>
                <Col>
                  <Form.Group controlId="formPetName">
                    <Form.Label>Pet Name</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control />
                    <Form.Text className="text-muted">
                      Please add phone number in the following format 555 1117777
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Pet Behavior</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Fired Client?</Form.Label>
                    <Form.Control as="select">
                      <option>No</option>
                      <option>Yes</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="buttonbottom">
            <Button justify-content-end variant="primary" type="submit">
              Create
            </Button>
          </div>
        </section>
      </div>
    );
  }
}
