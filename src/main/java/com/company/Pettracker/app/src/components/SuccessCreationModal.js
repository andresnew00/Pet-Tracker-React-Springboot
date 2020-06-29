import React from "react";
import { Modal, Button } from "react-bootstrap";

export default class SuccessCreationModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleShow}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
