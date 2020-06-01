import React from "react";
import { Table } from "react-bootstrap";

import Axios from "axios";

function TableOfClients() {
  const clientsArray = [];

  Axios.get("http://localhost:8080/pet/getAll").then((response) =>
    response.data.find((element) => {
      clientsArray.push(element);
      console.log(clientsArray);
    })
  );

  const renderClient = (client, index) => {
    return (
      <tr key={index}>
        <td>{client.petName}</td>
        <td>{client.clientName}</td>
        <td>{client.phoneNumber}</td>
        <td>{client.behavior}</td>
        <td>{client.banned}</td>
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

      <tbody>
        {clientsArray.map(renderClient)}
      </tbody>
    </Table>
  );
}

export default TableOfClients;
