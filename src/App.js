import React from 'react';
import Routes from './Routes'
import { Switch, BrowserRouter as Router} from 'react-router-dom'
import CpeContextProvider from './context/cpeContext';
import {CLogo} from './components/CLogo';

function App() {
  return ( 
  <Router> 
      <CpeContextProvider>
        <CLogo/>
        <div className="container">
          <Switch>
            <Routes />
          </Switch>
        </div> 
      </CpeContextProvider>
  </Router> 
  );
}

export default App;
