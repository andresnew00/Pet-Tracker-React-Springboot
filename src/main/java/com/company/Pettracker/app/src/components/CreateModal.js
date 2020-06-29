import React from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import SuccessCreationModal from "./SuccessCreationModal";

import axios from "axios";

const initialState = {
  petName: "",
  clientName: "",
  phoneNumber: "",
  behavior: "",
  banned: false,
  petNameError: "",
  clientNameError: "",
  phoneNumberError: "",
  behaviorError: "",
  showModal: false,
};

export default class CreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  validateForm = () => {
    let petNameError = "";
    let clientNameError = "";
    let phoneNumberError = "";
    let behaviorError = "";

    if (!this.state.petName.match(/^([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+$/)) {
      petNameError = "Pet name should only contain valid characters.";
    }

    if (this.state.petName.length > 15) {
      petNameError = "Pet's name can not be longer than 15 characters";
    }

    if (this.state.clientName.length < 2 || this.state.clientName.length > 30) {
      clientNameError =
        "Name should be more than 2 characters and less than 30";
    }

    if (!this.state.clientName.match(/^([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+$/)) {
      clientNameError = "Client name should only include letters";
    }

    if (!this.state.phoneNumber.match(/^((\d{3})\s)?(\d{7})$/)) {
      phoneNumberError =
        "format should be area code, space then 7 digits ex. 000 0000000";
    }

    if (!this.state.behavior.match(/^[a-zA-Z]+$/)) {
      behaviorError = "this field should only contain letters and no spaces";
    }

    if (petNameError || clientNameError || phoneNumberError || behaviorError) {
      this.setState({
        petNameError,
        clientNameError,
        phoneNumberError,
        behaviorError,
      });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const isValid = this.validateForm();

    if (isValid) {
      const clientInfo = {
        petName: this.state.petName,
        clientName: this.state.clientName,
        phoneNumber: this.state.phoneNumber,
        behavior: this.state.behavior,
        banned: this.state.banned,
      };

      console.log(clientInfo);

      // axios
      //   .post("http://localhost:8080/pet/newPet", clientInfo)
      //   .then((res) => console.log(res))
      //   .catch((error) => {
      //     console.log(error.response.data.message);
      //   });
      //TODO confirm submit of form
      this.handleShow();
      console.log(this.state.showModal);
      //clear form
      this.setState(initialState);
    }
    // const data = this.state;
    //   console.log(data);
  };

  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleInputBooleanChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value === "true",
    });
  };

  //TODO PLAYGROUND

  handleClose = () => {
    this.setState({ showModal: false})
    console.log(this.state.showModal)
  }

  handleShow = () => {
    this.setState({ showModal: true })
    console.log(this.state.showModal)
  }

  render() {
    const {
      petName,
      clientName,
      phoneNumber,
      behavior,
      validated,
    } = this.state;
    return (
      <div className="CreateModal">
        {/* <SuccessCreationModal
          show={this.state.showModal}
          handleShow={() => this.handleShow}
        /> */}
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
            <Form
              noValidate
              validated={validated}
              className="form"
              onSubmit={this.handleSubmit}
            >
              <Row>
                <Col>
                  <Button variant="primary" onClick={this.state.handleShow}>
                    Launch demo modal
                  </Button>

                  <Modal show={this.state.showModal} onHide={this.state.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.state.handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={this.state.handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Form.Group>
                    <Form.Label>Pet Name</Form.Label>
                    <Form.Control
                      required
                      name="petName"
                      value={petName}
                      placeholder="Pet Name"
                      onChange={this.handleInputChange}
                    />
                    <div className="error-message">
                      {this.state.petNameError}
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control
                      required
                      name="clientName"
                      placeholder="Client Name"
                      value={clientName}
                      onChange={this.handleInputChange}
                    />
                    <div className="error-message">
                      {this.state.clientNameError}
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      required
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={this.handleInputChange}
                    />
                    <div className="error-message">
                      {this.state.phoneNumberError}
                    </div>
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
                      required
                      name="behavior"
                      placeholder="Pet Behavior"
                      value={behavior}
                      onChange={this.handleInputChange}
                    />
                    <div className="error-message">
                      {this.state.behaviorError}
                    </div>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>Fired Client?</Form.Label>
                    <Form.Control
                      as="select"
                      name="banned"
                      onChange={this.handleInputBooleanChange}
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
