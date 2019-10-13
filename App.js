import React from 'react';
import Router from './routes'
import firebase from 'firebase'

import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } from './key'

firebaseConfig  = {
  apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId
}

firebase.initializeApp(firebaseConfig)

const App = () => {
  return (
    <Router />
  );
};

export default App;
