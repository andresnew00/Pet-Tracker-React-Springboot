import React from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

export default function OrderNCreateBar(props) {
  return (
    <Container fluid className="OrderNCreate">
      <Row>
        <Col className="orderBy">
          <h3>Order By:</h3>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {props.orderOfItems}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={props.changeOrder}>
                Date Older - Newer
              </Dropdown.Item>
              <Dropdown.Item onClick={props.changeOrder}>
                Date Newer - Older
              </Dropdown.Item>
              <Dropdown.Item onClick={props.changeOrder}>
                Alphabetical
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="createButton">
          <Button variant="primary" onClick={props.toggleCreateModal}>
            Create new Patient <i className="fa fa-plus"></i>{" "}
          </Button>{" "}
        </Col>
      </Row>
    </Container>
  );
}

// class OrderNCreateBar extends React.Component {
//   render() {
//     return (
//       <Container fluid className="OrderNCreate">
//         <Row>
//           <Col className="orderBy">
//             <h3>Order By:</h3>
//             <Dropdown>
//               <Dropdown.Toggle variant="primary" id="dropdown-basic">
//                 {this.props.order}
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={this.props.changeOrder}>
//                   Date Older - Newer
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={this.props.changeOrder}>
//                   Date Newer - Older
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={this.props.changeOrder}>
//                   Alphabetical
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Col>
//           <Col className="createButton">
//             <Button variant="primary" onClick={this.props.toggleCreateModal}>
//               Create new Patient <i className="fa fa-plus"></i>{" "}
//             </Button>{" "}
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

// export default OrderNCreateBar;
