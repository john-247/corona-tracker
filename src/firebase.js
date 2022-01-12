import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDqR6EjYsYRMB9117rluVpfMxOeHLwDfjc",
  authDomain: "corona-tracker-a7bcd.firebaseapp.com",
  projectId: "corona-tracker-a7bcd",
  storageBucket: "corona-tracker-a7bcd.appspot.com",
  messagingSenderId: "783624113700",
  appId: "1:783624113700:web:c62778a33c34fbf77f52b1",
  measurementId: "G-CHTPQ7W3E8",
});

const db = firebaseApp.firestore();

export default db;
