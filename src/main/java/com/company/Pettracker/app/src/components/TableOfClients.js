import React from "react";
import { Table } from "react-bootstrap";

import Axios from "axios";

class TableOfClients extends React.Component {
  constructor() {
    super();
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
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:8080/pet/getAll").then((response) =>
      this.setState({ clientData: response.data })
    );
  }

  render() {
    const { clientData } = this.state;

    const renderClient = (client, index) => {
      return (
        <tr key={index}>
          <td>{client.petName}</td>
          <td>{client.clientName}</td>
          <td>{client.phoneNumber}</td>
          <td>{client.behavior}</td>
          <td>{client.banned.toString()}</td>
          <td>Actions</td>
        </tr>
      );
    };
    return (
      <Table className="TableOfClients" size="md">
        <thead>
          <tr>
            <th>Pet Name</th>
            <th>Client Name</th>
            <th>Phone Number</th>
            <th>Pet Behavior</th>
            <th>Fired Client</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{clientData.map(renderClient)}</tbody>
      </Table>
    );
  }

  // const clientsArray = [];

  // const [clients, setClients] = useState ([clientsArray])

  // Axios.get("http://localhost:8080/pet/getAll").then((response) =>
  //   response.data.find((element) => {
  //     clientsArray.push(element);
  //     console.log(clientsArray);
  //   })
  // );
}

export default TableOfClients;
