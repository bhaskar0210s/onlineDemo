import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyA_70fP-w_sapdihrnytCdYaKDF5Rkknro',
  authDomain: 'something-2cb45.firebaseapp.com',
  databaseURL: 'https://something-2cb45.firebaseio.com',
  storageBucket: 'something-2cb45.appspot.com',
  messagingSenderId: '1062451475135'
}
firebase.initializeApp(config)

export default {
  database: firebase.database()
}
