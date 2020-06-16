import React from "react";
import { Table } from "react-bootstrap";

export default class TableOfClients extends React.Component {
  render() {
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
            <i
              className="fa fa-edit fa-lg"
              onClick={() => {
                this.props.selectClient(
                  client.petId,
                  client.clientName,
                  client.petName,
                  client.phoneNumber,
                  client.lastTime,
                  client.behavior,
                  client.banned
                );
                this.props.toggleEdit();
              }}
            ></i>
            <i
              className="fa fa-trash-o fa-lg"
              onClick={() => {
                this.props.selectClient(
                  client.petId,
                  client.clientName,
                  client.petName,
                  client.phoneNumber,
                  client.lastTime,
                  client.behavior,
                  client.banned
                );
                this.props.toggleDelete();
              }}
            ></i>
            <i
              className="fa fa-sign-in fa-lg"
              onClick={() => {
                this.props.selectClient(
                  client.petId,
                  client.clientName,
                  client.petName,
                  client.phoneNumber,
                  client.lastTime,
                  client.behavior,
                  client.banned
                );
                this.props.toggleCheckIn();
              }}
            ></i>
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

        <tbody>{this.props.clientData.map(renderClient)}</tbody>
      </Table>
    );
  }
}
