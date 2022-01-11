import React from "react";
import { Button, Modal } from "react-bootstrap";

import axios from "axios";

export default function CheckInModal(props) {
  const updateLastime = (clientId) => {
    const url = "http://localhost:8080/pet/checkin/" + clientId;

    axios
      .put(url)
      .then((res) => {
        props.setUpdateList(!props.updateList);
        props.setToastContent({
          toastTitle: `Client Checked in Successfully`,
          toastContent: `${props.selectedClient.petName} has checked in successfully`,
          toastColor: {
            backgroundColor: "#dcffe4",
            color: "black",
          },
        });
        props.toggleShowToast();
      })
      .catch((error) => {
        props.onHide();
        props.setToastContent({
          toastTitle: "Error When Checking In The Client",
          toastContent: "An error has occurred while checking the client in.",
          toastColor: {
            backgroundColor: "#FFCCCC",
            color: "black",
          },
        });
        props.toggleShowToast();
      });
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
          CheckIn {props.selectedClient.petName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Would you like to checkin {props.selectedClient.petName}? Phone Number{" "}
          {props.selectedClient.clientPhoneNumber}, and owner name{" "}
          {props.selectedClient.clientName}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="yesButton"
          onClick={() => {
            updateLastime(props.selectedClient.petId);
            props.onHide();
          }}
        >
          Yes
        </Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}