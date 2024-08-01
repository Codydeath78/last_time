// Import the functions you need the 

import  {initializeApp}  from "firebase/app"; 
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"; 
import {firebase } from 'firebase/app';     
import 'firebase/firestore'; 
import { TextField, SearchBar } from '@mui/material'; 





// For Firebase
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