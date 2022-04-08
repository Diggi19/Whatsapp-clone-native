import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  // add firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// features
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

