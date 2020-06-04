import React from "react";
import { Table } from "react-bootstrap";

import Axios from "axios";

class TableOfClients extends React.Component {
  constructor(props) {
    super(props);
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
        <tr className="items" key={index}>
          <td>{client.petName}</td>
          <td>{client.clientName}</td>
          <td>{client.phoneNumber}</td>
          <td>{client.behavior}</td>
          <td>{client.banned.toString()}</td>
          <td>{client.lastTime}</td>
          <td>
            <i className="fa fa-edit fa-lg"></i>
            <i className="fa fa-trash-o fa-lg"></i>
            <i className="fa fa-sign-in fa-lg"></i>
          </td>
        </tr>
      );
    };
    return (
      <Table className="TableOfClients" hover size="md">
        <thead>
          <tr>
            <th>Pet Name</th>
            <th>Client Name</th>
            <th>Phone Number</th>
            <th>Pet Behavior</th>
            <th>Fired Client</th>
            <th>Last Time In</th>
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
