import React from 'react';
import './App.css';
import Header from "./page-elements/header";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
