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

  const [errors, setErrors] = useState({
    petNameError: "",
    clientNameError: "",
    phoneNumberError: "",
    behaviorError: "",
  });

  const validateForm = () => {
    let petNameError = "";
    let clientNameError = "";
    let phoneNumberError = "";
    let behaviorError = "";

    if (!newClient.petName.match(/^([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+$/)) {
      petNameError = "Pet name should only contain valid characters.";
    }

    if (newClient.petName.length > 15) {
      petNameError = "Pet's name can not be longer than 15 characters";
    }

    if (newClient.clientName.length < 2 || newClient.clientName.length > 30) {
      clientNameError =
        "Name should be more than 2 characters and less than 30";
    }

    if (!newClient.clientName.match(/^([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+$/)) {
      clientNameError = "Client name should only include letters";
    }

    if (!newClient.phoneNumber.match(/^((\d{3})\s)?(\d{7})$/)) {
      phoneNumberError =
        "format should be area code, space then 7 digits ex. 000 0000000";
    }

    if (!newClient.behavior.match(/^[a-zA-Z]+$/)) {
      behaviorError = "this field should only contain letters and no spaces";
    }

    if (petNameError || clientNameError || phoneNumberError || behaviorError) {
      setErrors({
        petNameError: petNameError,
        clientNameError: clientNameError,
        phoneNumberError: phoneNumberError,
        behaviorError: behaviorError,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formIsValid = validateForm();

    if (formIsValid) {

      axios
        .post("http://localhost:8080/pet/newPet", newClient)
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error.response.data.message);
        });

      //update list after adding new element
      props.setUpdateList(props.updateList + 1);

      //clear form
      // this.setState(initialState);

      //update client list
      // props.getAllClients();

      //alert popup
      // this.setState({ show: true });
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setNewClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(newClient);
  };

  const handleInputBooleanChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setNewClient({
      [name]: value === "true",
    });
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
                    autocomplete="off"
                  />
                  <div className="error-message">{errors.petNameError}</div>
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
                  <div className="error-message">{errors.clientNameError}</div>
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
                  <div className="error-message">{errors.phoneNumberError}</div>
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
                  <div className="error-message">{errors.behaviorError}</div>
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
            {/* <Alert
              show={this.state.show}
              variant={"success"}
              onClose={() => this.setState({ show: false })}
              dismissible
            >
              Pet has been successfully saved!
            </Alert> */}
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

// const initialState = {
//   petName: "",
//   clientName: "",
//   phoneNumber: "",
//   behavior: "",
//   banned: false,
//   petNameError: "",
//   clientNameError: "",
//   phoneNumberError: "",
//   behaviorError: "",
//   show: false,
// };

// export default class CreateModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = initialState;
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//   }

//   validateForm = () => {
//     let petNameError = "";
//     let clientNameError = "";
//     let phoneNumberError = "";
//     let behaviorError = "";

//     if (!this.state.petName.match(/^([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+$/)) {
//       petNameError = "Pet name should only contain valid characters.";
//     }

//     if (this.state.petName.length > 15) {
//       petNameError = "Pet's name can not be longer than 15 characters";
//     }

//     if (this.state.clientName.length < 2 || this.state.clientName.length > 30) {
//       clientNameError =
//         "Name should be more than 2 characters and less than 30";
//     }

//     if (!this.state.clientName.match(/^([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+$/)) {
//       clientNameError = "Client name should only include letters";
//     }

//     if (!this.state.phoneNumber.match(/^((\d{3})\s)?(\d{7})$/)) {
//       phoneNumberError =
//         "format should be area code, space then 7 digits ex. 000 0000000";
//     }

//     if (!this.state.behavior.match(/^[a-zA-Z]+$/)) {
//       behaviorError = "this field should only contain letters and no spaces";
//     }

//     if (petNameError || clientNameError || phoneNumberError || behaviorError) {
//       this.setState({
//         petNameError,
//         clientNameError,
//         phoneNumberError,
//         behaviorError,
//       });
//       return false;
//     }

//     return true;
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();

//     const isValid = this.validateForm();

//     if (isValid) {
//       const clientInfo = {
//         petName: this.state.petName,
//         clientName: this.state.clientName,
//         phoneNumber: this.state.phoneNumber,
//         behavior: this.state.behavior,
//         banned: this.state.banned,
//       };

//       console.log(clientInfo);

//       axios
//         .post("http://localhost:8080/pet/newPet", clientInfo)
//         .then((res) => console.log(res))
//         .catch((error) => {
//           console.log(error.response.data.message);
//         });

//       //clear form
//       this.setState(initialState);

//       //update client list
//       this.props.getAllClients();

//       //alert popup
//       this.setState({ show: true });
//     }
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
//     const {
//       petName,
//       clientName,
//       phoneNumber,
//       behavior,
//       validated,
//     } = this.state;
//     return (
//       <div className="CreateModal">
//         <section>
//           <div className="topBar">
//             <Row>
//               <Col>
//                 <h2>Create New Patient</h2>
//               </Col>
//               <Col className="closeButton">
//                 <Button onClick={this.props.toggleCreateModal}>
//                   <i className="fa fa-close fa-lg"></i>
//                 </Button>
//               </Col>
//             </Row>
//           </div>
//           <div className="modalContent">
//             <Form
//               noValidate
//               validated={validated}
//               className="form"
//               onSubmit={this.handleSubmit}
//             >
//               <Row>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Pet Name</Form.Label>
//                     <Form.Control
//                       required
//                       name="petName"
//                       value={petName}
//                       placeholder="Pet Name"
//                       onChange={this.handleInputChange}
//                       autocomplete="off"
//                     />
//                     <div className="error-message">
//                       {this.state.petNameError}
//                     </div>
//                   </Form.Group>

//                   <Form.Group>
//                     <Form.Label>Client Name</Form.Label>
//                     <Form.Control
//                       required
//                       name="clientName"
//                       placeholder="Client Name"
//                       value={clientName}
//                       onChange={this.handleInputChange}
//                       autocomplete="off"
//                     />
//                     <div className="error-message">
//                       {this.state.clientNameError}
//                     </div>
//                   </Form.Group>

//                   <Form.Group>
//                     <Form.Label>Phone Number</Form.Label>
//                     <Form.Control
//                       required
//                       name="phoneNumber"
//                       placeholder="Phone Number"
//                       value={phoneNumber}
//                       onChange={this.handleInputChange}
//                       autocomplete="off"
//                     />
//                     <div className="error-message">
//                       {this.state.phoneNumberError}
//                     </div>
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
//                       required
//                       name="behavior"
//                       placeholder="Pet Behavior"
//                       value={behavior}
//                       onChange={this.handleInputChange}
//                       autocomplete="off"
//                     />
//                     <div className="error-message">
//                       {this.state.behaviorError}
//                     </div>
//                   </Form.Group>
//                 </Col>

//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Fired Client?</Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="banned"
//                       onChange={this.handleInputBooleanChange}
//                       autocomplete="off"
//                     >
//                       <option value={false}>No</option>
//                       <option value={true}>Yes</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Alert
//                 show={this.state.show}
//                 variant={"success"}
//                 onClose={() => this.setState({ show: false })}
//                 dismissible
//               >
//                 Pet has been successfully saved!
//               </Alert>
//               <div className="buttonbottom">
//                 <Button justify-content-end variant="primary" type="submit">
//                   Create
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </section>
//       </div>
//     );
//   }
// }
