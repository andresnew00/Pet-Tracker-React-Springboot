import React from "react";
import NavBar from "./components/NavBar";
import OrderNCreateBar from "./components/OrderNCreateBar";
import TableOfClients from "./components/TableOfClients";
import CreateModal from "./components/CreateModal";
import CheckInModal from "./components/CheckInModal";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import Toast from "react-bootstrap/Toast";

import { useState, useEffect } from "react";

import Axios from "axios";
import "./App.css";

export default function App() {
  const [clientData, setClientData] = useState([]);
  const [selectedClient, setSelectedClient] = useState({
    petId: "",
    petName: "",
    clientName: "",
    phoneNumber: "",
    lastTime: "",
    behavior: "",
    banned: false,
  });

  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [checkInIsOpen, setCheckInIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  const [errors, setErrors] = useState({
    petNameError: "",
    clientNameError: "",
    phoneNumberError: "",
    behaviorError: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({
    toastTitle: "",
    toastContent: "",
    toastColor: {
      backgroundColor: "#dcffe4",
      color: "black",
    },
  });

  const [updateList, setUpdateList] = useState(false);

  const [search, setSearch] = useState("");
  const [orderOfItems, setOrderOfItems] = useState("Date Older - Newer");

  useEffect(() => {
    Axios.get("http://localhost:8080/pet/getAll").then((response) => {
      setClientData(response.data);
    });
  }, [updateList]);

  // working!
  const handleOpenCreateModal = () => {
    setCreateIsOpen(!createIsOpen);
  };

  const handleCheckInModal = () => {
    setCheckInIsOpen(!checkInIsOpen);
  };

  const handleDeleteModal = () => {
    setDeleteIsOpen(!deleteIsOpen);
  };

  const handleEditModal = () => {
    setEditIsOpen(!editIsOpen);
  };

  // this works!
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const toggleShowToast = () => setShowToast(!showToast);

  const validateForm = (client) => {
    let petNameError = "";
    let clientNameError = "";
    let phoneNumberError = "";
    let behaviorError = "";

    if (!client.petName.match(/^([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+$/)) {
      petNameError = "Pet name should only contain valid characters.";
    }

    if (client.petName.length > 15) {
      petNameError = "Pet's name can not be longer than 15 characters";
    }

    if (client.clientName.length < 2 || client.clientName.length > 30) {
      clientNameError =
        "Name should be more than 2 characters and less than 30";
    }

    if (!client.clientName.match(/^([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+$/)) {
      clientNameError = "Client name should only include letters";
    }

    if (!client.phoneNumber.match(/^((\d{3})\s)?(\d{7})$/)) {
      phoneNumberError =
        "format should be area code, space then 7 digits ex. 000 0000000";
    }

    if (!client.behavior.match(/^[a-zA-Z]+$/)) {
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

  // working!
  const updateListOfClients = () => {
    switch (orderOfItems) {
      case "Alphabetical":
        setClientData(
          clientData.sort((a, b) => (a.petName > b.petName) * 2 - 1)
        );
        break;
      case "Date Newer - Older":
        setClientData(
          clientData.sort((a, b) => (a.lastTime < b.lastTime) * 2 - 1)
        );
        break;
      default:
        setClientData(
          clientData.sort((a, b) => (a.lastTime > b.lastTime) * 2 - 1)
        );
    }
  };

  const updateSelectedClient = (
    clientId,
    petName,
    clientName,
    phoneNumber,
    lastTime,
    behavior,
    banned
  ) => {
    setSelectedClient({
      petId: clientId,
      petName: petName,
      clientName: clientName,
      phoneNumber: phoneNumber,
      lastTime: lastTime,
      behavior: behavior,
      banned: banned,
    });
  };

  const changeOrder = (e) => {
    setOrderOfItems(e.target.text);
    updateListOfClients();
  };

  const deleteClient = (clientId) => {
    const url = "http://localhost:8080/pet/deletePet/" + clientId;

    Axios.delete(url)
      .then((response) => {
        setUpdateList(!updateList);
        setToastContent({
          toastTitle: `Client Deleted Successfully`,
          toastContent: `${selectedClient.petName} has been deleted successfully`,
          toastColor: {
            backgroundColor: "#dcffe4",
            color: "black",
          },
        });
        handleDeleteModal();
        toggleShowToast();
      })
      .catch((error) => {
        // Show Error message here.
        handleDeleteModal();
        setToastContent({
          toastTitle: "Error When Deleting The Client",
          toastContent: "There was an error when deleting the client.",
          toastColor: {
            backgroundColor: "#FFCCCC",
            color: "black",
          },
        });
        toggleShowToast();
      });
  };

  return (
    <div className="App">
      <NavBar search={search} updateSearch={updateSearch} />
      <OrderNCreateBar
        changeOrder={changeOrder}
        order={orderOfItems}
        toggleCreateModal={handleOpenCreateModal}
      />
      <TableOfClients
        order={orderOfItems}
        search={search}
        clientData={clientData}
        updateSelectedClient={updateSelectedClient}
        selectedClient={selectedClient}
        toggleCheckIn={handleCheckInModal}
        toggleDelete={handleDeleteModal}
        toggleEdit={handleEditModal}
      />
      <Toast
        show={showToast}
        onClose={toggleShowToast}
        delay={10000}
        autohide
        animation
      >
        <Toast.Header style={toastContent.toastColor}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{toastContent.toastTitle}</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body>{toastContent.toastContent}</Toast.Body>
      </Toast>
      {createIsOpen ? (
        <CreateModal
          toggleCreateModal={handleOpenCreateModal}
          setUpdateList={setUpdateList}
          updateList={updateList}
          setToastContent={setToastContent}
          toggleShowToast={toggleShowToast}
          validateForm={validateForm}
          errors={errors}
        />
      ) : null}
      {editIsOpen ? (
        <EditModal
          toggleEditModal={handleEditModal}
          setSelectedClient={setSelectedClient}
          selectedClient={selectedClient}
          setUpdateList={setUpdateList}
          updateList={updateList}
          setToastContent={setToastContent}
          toggleShowToast={toggleShowToast}
          validateForm={validateForm}
          errors={errors}
        />
      ) : null}
      {checkInIsOpen ? (
        <CheckInModal
          showModal={checkInIsOpen}
          selectedClient={selectedClient}
          onHide={handleCheckInModal}
          setUpdateList={setUpdateList}
          updateList={updateList}
          setToastContent={setToastContent}
          toggleShowToast={toggleShowToast}
        />
      ) : null}
      {deleteIsOpen ? (
        <DeleteModal
          showModal={deleteIsOpen}
          selectedClient={selectedClient}
          deleteClient={deleteClient}
          setUpdateList={setUpdateList}
          updateList={updateList}
          handleDeleteModal={handleDeleteModal}
        />
      ) : null} 
    </div>
  );
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.handleOpenCreateModal = this.handleOpenCreateModal.bind(this);
//     this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
//     this.changeOrder = this.changeOrder.bind(this);

//     this.getClient = this.getClient.bind(this);

//     this.state = {
//       clientData: [
//         {
//           petId: "",
//           clientName: "",
//           petName: "",
//           phoneNumber: "",
//           lastTime: "",
//           behavior: "",
//           banned: "",
//         },
//       ],
//       createIsOpen: false,
//       checkInIsOpen: false,
//       deleteIsOpen: false,
//       editIsOpen: false,
//       search: "",
//       orderOfitems: "Date Older - Newer",
//     };
//   }

//   componentDidMount() {
//     this.getAllClients();
//   }

//   getAllClients = () => {
//     Axios.get("http://localhost:8080/pet/getAll").then((response) =>
//       this.setState({ clientData: response.data })
//     );
//   };

//   handleOpenCreateModal() {
//     this.setState({
//       createIsOpen: !this.state.createIsOpen,
//     });
//   }

//   handleOpenEditModal() {
//     this.setState({
//       editIsOpen: !this.state.editIsOpen,
//     });
//   }

//   handleOpenCheckInModal = () => {
//     this.setState({
//       checkInIsOpen: !this.state.checkInIsOpen,
//     });
//   };

//   handleOpenDeleteModal = () => {
//     this.setState({
//       deleteIsOpen: !this.state.deleteIsOpen,
//     });
//   };

//   getClient = (
//     clientId,
//     clientName,
//     petName,
//     phoneNumber,
//     lastTime,
//     behavior,
//     banned
//   ) => {
//     this.setState({
//       selectedClientId: clientId,
//       selectedClientName: clientName,
//       selectedPetName: petName,
//       selectedPhoneNumber: phoneNumber,
//       selectedLastTime: lastTime,
//       selectedBehavior: behavior,
//       selectedBanned: banned,
//     });
//   };

//   updateSearch = (event) => {
//     this.setState({
//       search: event.target.value,
//     });
//   };

//   changeOrder = (event) => {
//     this.setState(
//       {
//         orderOfitems: event.target.text,
//       },
//       this.updateListOfClients
//     );
//   };

//   deleteClient = (clientId) => {
//     const url = "http://localhost:8080/pet/deletePet/" + clientId;

//     // state, before delete anything
//     const currentClients = this.state.clientData;

//     // Remove deleted item from state.
//     this.setState({
//       clientData: currentClients.filter(clients => clients.petId !== clientId),
//     });

//     axios
//       .delete(url)
//       .then(response => {
//         if (response.status === 'error') {
//           // Oops, something went wrong. Let's get that deleted Id back.
//           this.setState({
//             clientData: currentClients,
//           });

//           // Show Error message here.
//         } else {

//           // Delete successfully, do nothing.
//           // Because we already remove the deleted id from state.

//           // Show success message here.

//           //TODO CREATE A Message on screen to show successful delete
//           console.log("Pet is bye bye")

//         }
//       });
//   };

//   updateListOfClients = () => {
//     switch (this.state.orderOfitems) {
//       case "Alphabetical":
//         this.setState({
//           clientData: this.state.clientData.sort(
//             (a, b) => (a.petName > b.petName) * 2 - 1
//           ),
//         });
//         break;
//       case "Date Newer - Older":
//         this.setState({
//           clientData: this.state.clientData.sort(
//             (a, b) => (a.lastTime < b.lastTime) * 2 - 1
//           ),
//         });
//         break;
//       default:
//         this.setState({
//           clientData: this.state.clientData.sort(
//             (a, b) => (a.lastTime > b.lastTime) * 2 - 1
//           ),
//         });
//     }
//   };

//   render() {
//     return (
//       <div className="App">
//         <NavBar search={this.state.search} updateSearch={this.updateSearch} />
//         <OrderNCreateBar
//           changeOrder={this.changeOrder}
//           order={this.state.orderOfitems}
//           toggleCreateModal={this.handleOpenCreateModal}
//         />
//         <TableOfClients
//           order={this.state.orderOfitems}
//           search={this.state.search}
//           clientData={this.state.clientData}
//           selectClient={this.getClient}
//           toggleCheckIn={this.handleOpenCheckInModal}
//           toggleDelete={this.handleOpenDeleteModal}
//           toggleEdit={this.handleOpenEditModal}
//         />
//         {this.state.createIsOpen ? (
//           <CreateModal
//             toggleCreateModal={this.handleOpenCreateModal}
//             getAllClients={this.getAllClients}
//           />
//         ) : null}
//         {this.state.editIsOpen ? (
//           <EditModal
//             toggleEditModal={this.handleOpenEditModal}
//             clientId={this.state.selectedClientId}
//             petName={this.state.selectedPetName}
//             clientName={this.state.selectedClientName}
//             phoneNumber={this.state.selectedPhoneNumber}
//             behavior={this.state.selectedBehavior}
//             banned={this.state.selectedBanned}
//           />
//         ) : null}
//         <CheckInModal
//           showModal={this.state.checkInIsOpen}
//           clientId={this.state.selectedClientId}
//           clientName={this.state.selectedClientName}
//           clientLastTime={this.state.selectedLastTime}
//           petName={this.state.selectedPetName}
//           clientPhoneNumber={this.state.selectedPhoneNumber}
//           onHide={this.handleOpenCheckInModal}
//           getAllClients={this.getAllClients}
//         />
//         <DeleteModal
//           showModal={this.state.deleteIsOpen}
//           clientId={this.state.selectedClientId}
//           clientName={this.state.selectedClientName}
//           petName={this.state.selectedPetName}
//           clientPhoneNumber={this.state.selectedPhoneNumber}
//           onHide={this.handleOpenDeleteModal}
//           deleteClient={this.deleteClient}
//         />
//       </div>
//     );
//   }
// }

// export default App;
