import React from 'react';
import './App.css';
import {Link} from "react-router-dom";

function App() {
  return (
      <div>
        <h1>Sequence Aligner</h1>
        <nav>
          <Link to="/stats">Statistics</Link>
        </nav>
      </div>
  );
}

export default App;
