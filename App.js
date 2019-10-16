import React from 'react';
import Router from './routes';
import firebase from 'firebase';

import {Provider} from 'react-redux';
import store from './redux/store';

import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from './key';

firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
