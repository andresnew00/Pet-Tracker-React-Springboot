import React, { useEffect, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import OrderNCreateBar from "./components/OrderNCreateBar";
import TableOfClients from "./components/TableOfClients";
import CreateModal from "./components/CreateModal";

import Axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpenCreateModal = this.handleOpenCreateModal.bind(this);

    this.state = {
      clientData: [
        {
          petId: "",
          clientName: "",
          petName: "",
          phoneNumber: "",
          lastTime: "",
          behavior: "",
          banned: "",
        },
      ],
      isOpen: false,
    };
    const client = {
      petId: this.state.petId,
      clientName: this.state.clientName,
      petName: this.state.petName,
      phoneNumber: this.state.phoneNumber,
      lastTime: this.state.lastTime,
      behavior: this.state.behavior,
      banned: this.state.banned,
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:8080/pet/getAll").then((response) =>
      this.setState({ clientData: response.data })
    );
  }

  handleOpenCreateModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <OrderNCreateBar toggleCreateModal={this.handleOpenCreateModal} />
        <TableOfClients clientData={this.state.clientData} />
        {this.state.isOpen ? (
          <CreateModal toggleCreateModal={this.handleOpenCreateModal} />
        ) : null}
      </div>
    );
  }
}

export default App;
