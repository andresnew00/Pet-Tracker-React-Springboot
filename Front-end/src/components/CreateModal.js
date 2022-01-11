import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

import axios from "axios";

export default function CreateModal(props) {
  const [newClient, setNewClient] = useState({
    petName: "",
    clientName: "",
    phoneNumber: "",
    behavior: "",
    banned: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formIsValid = props.validateForm(newClient);

    if (formIsValid) {
      axios
        .post("http://localhost:8080/pet/newPet", newClient)
        .then((res) => {
          //update list after adding new element
          props.setUpdateList(!props.updateList);
          props.toggleCreateModal();
          props.setToastContent({
            toastTitle: `Client Created Successfully`,
            toastContent: `${newClient.petName} has been created successfully`,
          });
          props.toggleShowToast();
        })
        .catch((error) => {
          props.toggleCreateModal();
          props.setToastContent({
            toastTitle: "Error When Adding New Client",
            toastContent: error.response.data.message,
            toastColor: {
              backgroundColor: "#FFCCCC",
              color: "black",
            },
          });
          props.toggleShowToast();
        });
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setNewClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputBooleanChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setNewClient((prevState) => ({
      ...prevState,
      [name]: value === "true",
    }));
  };

  return (
    <div className="CreateModal">
      <section>
        <div className="topBar">
          <Row>
            <Col>
              <h2>Create New Patient</h2>
            </Col>
            <Col className="closeButton">
              <Button onClick={props.toggleCreateModal}>
                <i className="fa fa-close fa-lg"></i>
              </Button>
            </Col>
          </Row>
        </div>
        <div className="modalContent">
          <Form noValidate className="form" onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Pet Name</Form.Label>
                  <Form.Control
                    required
                    name="petName"
                    value={newClient.petName}
                    placeholder="Pet Name"
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                  <div className="error-message">
                    {props.errors.petNameError}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    required
                    name="clientName"
                    placeholder="Client Name"
                    value={newClient.clientName}
                    onChange={handleInputChange}
                    autocomplete="off"
                  />
                  <div className="error-message">
                    {props.errors.clientNameError}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    required
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={newClient.phoneNumber}
                    onChange={handleInputChange}
                    autocomplete="off"
                  />
                  <div className="error-message">
                    {props.errors.phoneNumberError}
                  </div>
                  <Form.Text
                    className="text-muted"
                    onChange={handleInputChange}
                  >
                    Please add phone number in the following format 555 1117777
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Pet Behavior</Form.Label>
                  <Form.Control
                    required
                    name="behavior"
                    placeholder="Pet Behavior"
                    value={newClient.behavior}
                    onChange={handleInputChange}
                    autocomplete="off"
                  />
                  <div className="error-message">
                    {props.errors.behaviorError}
                  </div>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Fired Client?</Form.Label>
                  <Form.Control
                    as="select"
                    name="banned"
                    onChange={handleInputBooleanChange}
                    autocomplete="off"
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