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

// Initialize Firebase
if (!firebase.apps.length) { //check if not initialize
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}
const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
