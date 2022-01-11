import React from "react";
import { Table } from "react-bootstrap";

export default function TableOfClients(props) {
  const filteredClientData = props.clientData.filter((client) => {
    return (
      client.petName.toLowerCase().indexOf(props.search.toLowerCase()) !== -1 ||
      client.clientName.toLowerCase().indexOf(props.search.toLowerCase()) !== -1
    );
  });

  return (
    <div className="tableContainer">
      <Table className="TableOfClients" hover responsive>
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
        {filteredClientData.length === 0 ? (
          <tbody>
            {" "}
            <div className="NoClients">No clients to show</div>
          </tbody>
        ) : (
          <tbody>
            {filteredClientData.map((client) => (
              <tr className="items" key={client.petId}>
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
                      props.updateSelectedClient(
                        client.petId,
                        client.petName,
                        client.clientName,
                        client.phoneNumber,
                        client.lastTime,
                        client.behavior,
                        client.banned
                      );
                      props.toggleEdit();
                    }}
                  ></i>
                  <i
                    className="fa fa-trash-o fa-lg"
                    onClick={() => {
                      props.updateSelectedClient(
                        client.petId,
                        client.petName,
                        client.clientName,
                        client.phoneNumber,
                        client.lastTime,
                        client.behavior,
                        client.banned
                      );
                      props.toggleDelete();
                    }}
                  ></i>
                  <i
                    className="fa fa-sign-in fa-lg"
                    onClick={() => {
                      props.updateSelectedClient(
                        client.petId,
                        client.petName,
                        client.clientName,
                        client.phoneNumber,
                        client.lastTime,
                        client.behavior,
                        client.banned
                      );
                      props.toggleCheckIn();
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  );
}