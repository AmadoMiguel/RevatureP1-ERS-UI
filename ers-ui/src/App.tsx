import React from 'react';
import './App.css';
import Router from './components/router/router.component';
import NavBarComponent from './components/navbar/navbar.component';

const App: React.FC = () => {
  return (
    <div className="App">
      
      {/* Routes mapping */}
      <Router/>
    </div>
  );
}

export default App;
