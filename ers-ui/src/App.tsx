import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/router/router.component';
import {Provider} from 'react-redux';
import { store } from './redux/Store';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* Data store wrapper */}
      <Provider store={store}>
        {/* Routes mapping */}
        <Router/>
        {/* Toaster for UI notifications */}
        <ToastContainer
        autoClose={3000}
        position={toast.POSITION.BOTTOM_RIGHT}/>
      </Provider>
    </div>
  );
}

export default App;
