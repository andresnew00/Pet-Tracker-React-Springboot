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
  // this is just to display the current selection on the order and create bar
  const [orderOfItems, setOrderOfItems] = useState("Date Older - Newer");

  useEffect(() => {
    Axios.get("http://localhost:8080/pet/getAll").then((response) => {
      setClientData(
        response.data.sort((a, b) => (a.lastTime > b.lastTime) * 2 - 1)
      );
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

  const updateListOfClients = (order) => {
    switch (order) {
      case "Alphabetical":
        setClientData(
          [...clientData].sort(
            (a, b) =>
              (a.petName.toLowerCase() > b.petName.toLowerCase()) * 2 - 1
          )
        );
        break;
      case "Date Newer - Older":
        setClientData(
          [...clientData].sort((a, b) => (a.lastTime < b.lastTime) * 2 - 1 )
        );
        break;
      default:
        setClientData(
          [...clientData].sort((a, b) => (a.lastTime > b.lastTime) * 2 - 1)
        );
        break;
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
    updateListOfClients(e.target.text);
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
        updateListOfClients(orderOfItems);
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
        orderOfItems={orderOfItems}
        toggleCreateModal={handleOpenCreateModal}
      />
      <TableOfClients
        orderOfItems={orderOfItems}
        search={search}
        clientData={clientData}
        updateSelectedClient={updateSelectedClient}
        selectedClient={selectedClient}
        toggleCheckIn={handleCheckInModal}
        toggleDelete={handleDeleteModal}
        toggleEdit={handleEditModal}
        updateListOfClients={updateListOfClients}
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
          changeOrder={changeOrder}
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
          changeOrder={changeOrder}
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
          changeOrder={changeOrder}
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