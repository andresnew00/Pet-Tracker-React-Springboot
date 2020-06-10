import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import axios from "axios";

export default class CreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petName: "",
      clientName: "",
      phoneNumber: "",
      behavior: "",
      banned: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const data = this.state;
    console.log(data);

    axios
      .post("http://localhost:8080/pet/newPet", data)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { petName, clientName, phoneNumber, behavior } = this.state;
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
            <Form className="form" onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Pet Name</Form.Label>
                    <Form.Control
                      name="petName"
                      value={petName}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control
                      name="clientName"
                      value={clientName}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={this.handleInputChange}
                    />
                    <Form.Text
                      className="text-muted"
                      onChange={this.handleInputChange}
                    >
                      Please add phone number in the following format 555
                      1117777
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Pet Behavior</Form.Label>
                    <Form.Control
                      name="behavior"
                      value={behavior}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>Fired Client?</Form.Label>
                    <Form.Control
                      as="select"
                      name="banned"
                      onChange={this.handleInputChange}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <div className="buttonbottom">
                <Button justify-content-end variant="primary" type="submit">
                  Create
                </Button>
              </div>
            </Form>
          </div>
        </section>
      </div>
    );
  }
}
