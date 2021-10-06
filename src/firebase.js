import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAYwKm4uKapHyjtfK42LdjJsjLwBHhUWdI",
    authDomain: "mi-sitio-web-e3800.firebaseapp.com",
    projectId: "mi-sitio-web-e3800",
    storageBucket: "mi-sitio-web-e3800.appspot.com",
    messagingSenderId: "546268883373",
    appId: "1:546268883373:web:4e05058a43b37ef0e41924"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //autenticacion con correo y contraseña
  const auth = firebase.auth();

  //autenticacion con google
  const google = new firebase.auth.GoogleAuthProvider();

  export {firebase, auth, google}