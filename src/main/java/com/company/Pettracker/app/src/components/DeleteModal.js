import React from "react";
import { Button, Modal } from "react-bootstrap";

import axios from "axios";

export default class DeleteModal extends React.Component {
  deleteClient( clientId ) {
    const url = "http://localhost:8080/pet/deletePet/" + clientId;

    axios
      .delete(url)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
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
            Delete {this.props.petName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Would you like to DELETE {this.props.petName}? Phone Number{" "}
            {this.props.clientPhoneNumber}, and owner name {this.props.clientName} This action CAN NOT be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="yesButton" onClick={() => {this.deleteClient(this.props.clientId)}}>
            Yes
          </Button>
          <Button onClick={this.props.onHide}>No</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
