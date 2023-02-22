import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, storePersist } from './app/store.js';

import App from './App';
import './css/index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={storePersist}>
      <App />
    </PersistGate>
  </Provider>,
);
