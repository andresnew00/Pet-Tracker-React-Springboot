import React from "react";
import { Button, Modal } from "react-bootstrap";

import axios from "axios";

export default class CheckInModal extends React.Component {
  updateLastime( clientId ) {
    const url = "http://localhost:8080/pet/checkin/" + clientId;

    axios
      .put(url)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
    
    this.props.getAllClients();
  };

  render() {
    return (
      <Modal
        show={this.props.showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="CheckInModal"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            CheckIn {this.props.petName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Would you like to checkin {this.props.petName}? Phone Number{" "}
            {this.props.clientPhoneNumber}, and owner name{" "}
            {this.props.clientName}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="yesButton" onClick={() => {this.updateLastime(this.props.clientId) ; this.props.onHide();}}>
            Yes
          </Button>
          <Button onClick={this.props.onHide}>No</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
