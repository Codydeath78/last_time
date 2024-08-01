// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {firebase} from 'firebase/app';
import 'firebase/firestore';
import { TextField } from '@mui/material';
import { SearchBar } from 'material-ui-search-bar';





// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5UDeUPTrl3mN9nEAgWk67p6_eA3NvpaI",
  authDomain: "pantry-tracker-80608.firebaseapp.com",
  projectId: "pantry-tracker-80608",
  storageBucket: "pantry-tracker-80608.appspot.com",
  messagingSenderId: "24775949605",
  appId: "1:24775949605:web:c64e530bd6362a8a232ecc",
  measurementId: "G-6NQ5XH3LB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export{
app,
firestore
}