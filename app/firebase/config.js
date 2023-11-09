import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnXHrkXZO23nbVss3_jM4hloUVG0J17TI",
  authDomain: "furnded-client.firebaseapp.com",
  projectId: "furnded-client",
  storageBucket: "furnded-client.appspot.com",
  messagingSenderId: "234369843257",
  appId: "1:234369843257:web:9cf0eeb4427663f01c8de8"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); 

// init services
  const db = getFirestore(app)
  const auth = getAuth(app)
  const storage = getStorage(app);

  
  export { db, storage, auth }