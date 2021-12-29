import React from "react";
import { Table } from "react-bootstrap";

export default function TableOfClients(props) {
  return (
    <tr className="items">
      <td>nothing</td>
    </tr>
  );
}

// export default class TableOfClients extends React.Component {
//   render() {
//     const renderClient = (client, index) => {
//       return (
//         <tr className="items" key={index}>
//           <td>{client.petName}</td>
//           <td>{client.clientName}</td>
//           <td>{client.phoneNumber}</td>
//           <td>{client.behavior}</td>
//           <td>{client.banned.toString()}</td>
//           <td>{client.lastTime}</td>
//           <td>
//             <i
//               className="fa fa-edit fa-lg"
//               onClick={() => {
//                 this.props.selectClient(
//                   client.petId,
//                   client.clientName,
//                   client.petName,
//                   client.phoneNumber,
//                   client.lastTime,
//                   client.behavior,
//                   client.banned
//                 );
//                 this.props.toggleEdit();
//               }}
//             ></i>
//             <i
//               className="fa fa-trash-o fa-lg"
//               onClick={() => {
//                 this.props.selectClient(
//                   client.petId,
//                   client.clientName,
//                   client.petName,
//                   client.phoneNumber,
//                   client.lastTime,
//                   client.behavior,
//                   client.banned
//                 );
//                 this.props.toggleDelete();
//               }}
//             ></i>
//             <i
//               className="fa fa-sign-in fa-lg"
//               onClick={() => {
//                 this.props.selectClient(
//                   client.petId,
//                   client.clientName,
//                   client.petName,
//                   client.phoneNumber,
//                   client.lastTime,
//                   client.behavior,
//                   client.banned
//                 );
//                 this.props.toggleCheckIn();
//               }}
//             ></i>
//           </td>
//         </tr>
//       );
//     };
//     const filteredClientData = this.props.clientData.filter((client) => {
//       return (
//         client.petName.toLowerCase().indexOf(this.props.search) !== -1 ||
//         client.clientName.toLowerCase().indexOf(this.props.search) !== -1
//       );
//     });

//     return (
//       <Table className="TableOfClients" hover size="md">
//         <thead>
//           <tr>
//             <th>Pet Name</th>
//             <th>Client Name</th>
//             <th>Phone Number</th>
//             <th>Pet Behavior</th>
//             <th>Fired Client</th>
//             <th>Last Time In</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         {this.props.clientData.length === 0 || filteredClientData.length === 0 ? (
//           <tbody>
//             {" "}
//             <div className="NoClients"> No clients to show</div>
//           </tbody>
//         ) : (
//           <tbody>{filteredClientData.map(renderClient)}</tbody>
//         )}
//       </Table>
//     );
//   }
// }
