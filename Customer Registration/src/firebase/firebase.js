
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCCSjBTjW84agQi0mzY3SCtR8OKcjlyQLQ",
  authDomain: "client-manager-app-50b40.firebaseapp.com",
  projectId: "client-manager-app-50b40",
  storageBucket: "client-manager-app-50b40.firebasestorage.app",
  messagingSenderId: "821030745962",
  appId: "1:821030745962:web:d326dc2b8a5c93e3c59713"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}