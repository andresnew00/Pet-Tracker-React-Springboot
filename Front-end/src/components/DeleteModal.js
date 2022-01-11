import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteModal(props) {
  const deleteNClose = (petId) => {
    props.deleteClient(petId);
  };

  return (
    <Modal
      show={props.showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="CheckInModal"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete {props.selectedClient.petName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Would you like to DELETE {props.selectedClient.petName}? Phone Number{" "}
          {props.selectedClient.phoneNumber}, and owner name{" "}
          {props.selectedClient.clientName} This action CAN NOT be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="yesButton" onClick={() => deleteNClose(props.selectedClient.petId)}>
          Yes
        </Button>
        <Button onClick={props.handleDeleteModal}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}
