// Import the functions you need from the SDKs you need
// import  { initializeApp }  from "firebase/app";
// import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKCyPbxJqqr9YkAHvnG7wF_e3r-5HzIfA",
  authDomain: "invoice-app-vue-a3fa3.firebaseapp.com",
  projectId: "invoice-app-vue-a3fa3",
  storageBucket: "invoice-app-vue-a3fa3.appspot.com",
  messagingSenderId: "35504909699",
  appId: "1:35504909699:web:e68c17f573c0e84a9bdab6"
};

// Initialize Firebase
const app =  firebase.initializeApp(firebaseConfig);

export default app.firestore();