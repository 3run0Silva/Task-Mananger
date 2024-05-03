import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import { firebaseConfig } from "./config";
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

