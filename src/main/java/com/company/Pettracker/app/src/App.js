import React from "react";
import NavBar from "./components/NavBar";
import OrderNCreateBar from "./components/OrderNCreateBar";
import TableOfClients from "./components/TableOfClients";
import CreateModal from "./components/CreateModal";
import CheckInModal from "./components/CheckInModal";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";

import { useState, useEffect } from "react";

import Axios from "axios";
import "./App.css";

export default function App() {
  const [clientData, setClientData] = useState([]);

  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [checkInIsOpen, setCheckinIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [orderOfItems, setOrderOfItems] = useState("Date Older - Newer");

  useEffect(() => {
    Axios.get("http://localhost:8080/pet/getAll").then((response) =>
      setClientData(response.data)
    );
  }, []);

  console.log(clientData);

  const handleOpenCreateModal = () => {
    setCreateIsOpen(!createIsOpen);
  };

  const handleCheckInModal = () => {
    setCheckinIsOpen(!checkInIsOpen);
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

  const changeOrder = (e) => {
    setOrderOfItems(e.target.text);
    updateListOfClients();
  };

  const deleteClient = (clientId) => {
    const url = "http://localhost:8080/pet/deletePet/" + clientId;

    // state, before delete anything
    const currentClients = clientData;

    // Remove deleted item from state.
    setClientData(
      currentClients.filter((clients) => clients.petId !== clientId)
    );

    Axios.delete(url).then((response) => {
      if (response.status === "error") {
        // Oops, something went wrong. Let's get that deleted Id back.
        setClientData(currentClients);
        // Show Error message here.
      } else {
        // Delete successfully, do nothing.
        // Because we already remove the deleted id from state.

        // Show success message here.
        //TODO CREATE A Message on screen to show successful delete
        console.log("Pet is bye bye");
      }
    });
  };

  return (
    <div className="App">
      <NavBar search={search} updateSearch={updateSearch} />
      {clientData.map((client) => (
        <li>{client.clientName}</li>
      ))}
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
