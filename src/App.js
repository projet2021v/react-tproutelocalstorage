import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import MapRoute from './routes/mapRoute';

function App() {
  return (
    <Router>
      <MapRoute/>
    </Router>
  );
}

export default App;
