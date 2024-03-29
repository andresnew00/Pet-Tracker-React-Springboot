import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import axios from "axios";

export default function EditModal(props) {
  const handleSubmit = (event, clientId) => {
    event.preventDefault();

    const url = `http://localhost:8080/pet/updatePet/${clientId}`;

    const formIsValid = props.validateForm(props.selectedClient);

    if (formIsValid) {
      axios
        .put(url, props.selectedClient)
        .then((res) => {
          props.setUpdateList(!props.updateList);
          props.toggleEditModal();
          props.setToastContent({
            toastTitle: `Client Edited Successfully`,
            toastContent: `${props.selectedClient.petName} has been updated successfully`,
          });
          props.toggleShowToast();
        })
        .catch((error) => {
          props.toggleEditModal();
          props.setToastContent({
            toastTitle: "Error When Editing The Client",
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

    props.setSelectedClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputBooleanChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    props.setSelectedClient((prevState) => ({
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
              <h2>Edit Patient</h2>
            </Col>
            <Col className="closeButton">
              <Button onClick={props.toggleEditModal}>
                <i className="fa fa-close fa-lg"></i>
              </Button>
            </Col>
          </Row>
        </div>
        <div className="modalContent">
          <Form
            className="form"
            onSubmit={(event) => {
              handleSubmit(event, props.selectedClient.petId);
            }}
          >
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Pet Name</Form.Label>
                  <Form.Control
                    name="petName"
                    value={props.selectedClient.petName}
                    onChange={handleInputChange}
                  />
                  <div className="error-message">
                    {props.errors.petNameError}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    name="clientName"
                    value={props.selectedClient.clientName}
                    onChange={handleInputChange}
                  />
                  <div className="error-message">
                    {props.errors.clientNameError}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    name="phoneNumber"
                    value={props.selectedClient.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <Form.Text
                    className="text-muted"
                    onChange={handleInputChange}
                  >
                    Please add phone number in the following format 555 1117777
                  </Form.Text>
                  <div className="error-message">
                    {props.errors.phoneNumberError}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Pet Behavior</Form.Label>
                  <Form.Control
                    name="behavior"
                    value={props.selectedClient.behavior}
                    onChange={handleInputChange}
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
                    value={props.selectedClient.banned}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <div className="buttonbottom">
              <Button justify-content-end variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}