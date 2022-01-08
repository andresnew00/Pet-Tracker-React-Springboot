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

// export default class DeleteModal extends React.Component {

//   deleteNClose = () => {
//     this.props.deleteClient(this.props.clientId);
//     this.props.onHide();
//   }

//   render() {
//     return (
//       <Modal
//         show={this.props.showModal}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//         className="CheckInModal"
//       >
//         <Modal.Header>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Delete {this.props.petName}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             Would you like to DELETE {this.props.petName}? Phone Number{" "}
//             {this.props.clientPhoneNumber}, and owner name {this.props.clientName} This action CAN NOT be undone.
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button className="yesButton" onClick={this.deleteNClose}>
//             Yes
//           </Button>
//           <Button onClick={this.props.onHide}>No</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }
// }
