import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/router/router.component';
import {Provider} from 'react-redux';
import './redux/Store';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storeAndPersistor from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
  let myStore = storeAndPersistor().store;
  let myPersistor = storeAndPersistor().storePersistor;
  return (
    <div className="App">
      {/* Data store wrapper */}
      <Provider store={myStore}>
        <PersistGate loading={null} persistor={myPersistor}>
          {/* Routes mapping */}
          <Router/>
        </PersistGate>
        {/* Toaster for UI notifications */}
        <ToastContainer
        autoClose={3000}
        position={toast.POSITION.BOTTOM_RIGHT}/>
      </Provider>
    </div>
  );
}

export default App;
