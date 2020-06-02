import React from "react";
import NavBar from "./components/NavBar";
import OrderNCreateBar from "./components/OrderNCreateBar";
import TableOfClients from "./components/TableOfClients";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <OrderNCreateBar />
        <TableOfClients />
      </div>
    );
  }
}

export default App;
