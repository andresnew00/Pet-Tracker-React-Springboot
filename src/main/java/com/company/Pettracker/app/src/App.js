import React from 'react';
import NavBar from './components/NavBar';
import OrderNCreateBar from './components/OrderNCreateBar';

import './App.css';
import Axios from 'axios';

function App() {

  Axios.get('http://localhost:8080/pet/getAll')
  .then(data => data.data.find(element => {
    console.log(element.clientName);
  }));

  return (
    <div className="App">
      <NavBar />
      <OrderNCreateBar />
    </div>
  );
}

export default App;
