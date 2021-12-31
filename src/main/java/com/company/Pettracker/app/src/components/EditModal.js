import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import axios from "axios";

export default function EditModal(props) {
  console.log(props.selectedClient);
  const handleSubmit = (event, clientId) => {
    event.preventDefault();

    const url = `http://localhost:8080/pet/updatePet/${clientId}`;

    const formIsValid = props.validateForm(props.selectedClient);

    if (formIsValid) {
      axios
        .put(url, props.selectedClient)
        .then((res) => {
          console.log(res);
          props.setUpdateList(!props.updateList);
          props.toggleEditModal();
          props.setToastContent({
            toastTitle: `Client Edited Successfully`,
            toastContent: `${props.selectedClient.petName} has been updated successfully`,
          });
          props.toggleShowToast();
        })
        .catch((error) => console.log(error));
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

    props.setSelectedClient({
      [name]: value === "true",
    });
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

// export default class EditModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       petName: this.props.petName,
//       clientName: this.props.clientName,
//       phoneNumber: this.props.phoneNumber,
//       behavior: this.props.behavior,
//       banned: this.props.banned,
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//   }

//   handleSubmit = (event, clientId) => {
//     event.preventDefault();

//     const data = this.state;
//     console.log(data);

//     const url = "http://localhost:8080/pet/updatePet/" + clientId;

//     axios
//       .put(url, data)
//       .then((res) => console.log(res))
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   handleInputChange = (event) => {
//     event.preventDefault();

//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   handleInputBooleanChange = (event) => {
//     event.preventDefault();

//     this.setState({
//       [event.target.name]: event.target.value === "true",
//     });
//   };

//   render() {
//     const { petName, clientName, phoneNumber, behavior } = this.state;
//     return (
//       <div className="CreateModal">
//         <section>
//           <div className="topBar">
//             <Row>
//               <Col>
//                 <h2>Edit Patient</h2>
//               </Col>
//               <Col className="closeButton">
//                 <Button onClick={this.props.toggleEditModal}>
//                   <i className="fa fa-close fa-lg"></i>
//                 </Button>
//               </Col>
//             </Row>
//           </div>
//           <div className="modalContent">
//             <Form
//               className="form"
//               onSubmit={(event) =>
//                 this.handleSubmit(event, this.props.clientId)
//               }
//             >
//               <Row>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Pet Name</Form.Label>
//                     <Form.Control
//                       name="petName"
//                       value={petName}
//                       onChange={this.handleInputChange}
//                     />
//                   </Form.Group>

//                   <Form.Group>
//                     <Form.Label>Client Name</Form.Label>
//                     <Form.Control
//                       name="clientName"
//                       value={clientName}
//                       onChange={this.handleInputChange}
//                     />
//                   </Form.Group>

//                   <Form.Group>
//                     <Form.Label>Phone Number</Form.Label>
//                     <Form.Control
//                       name="phoneNumber"
//                       value={phoneNumber}
//                       onChange={this.handleInputChange}
//                     />
//                     <Form.Text
//                       className="text-muted"
//                       onChange={this.handleInputChange}
//                     >
//                       Please add phone number in the following format 555
//                       1117777
//                     </Form.Text>
//                   </Form.Group>

//                   <Form.Group>
//                     <Form.Label>Pet Behavior</Form.Label>
//                     <Form.Control
//                       name="behavior"
//                       value={behavior}
//                       onChange={this.handleInputChange}
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Fired Client?</Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="banned"
//                       onChange={this.handleInputBooleanChange}
//                       value={this.props.banned}
//                     >
//                       <option value={false}>No</option>
//                       <option value={true}>Yes</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <div className="buttonbottom">
//                 <Button justify-content-end variant="primary" type="submit">
//                   Submit
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </section>
//       </div>
//     );
//   }
// }
