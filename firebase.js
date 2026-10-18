import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwp1zbqBQQ3ZVW3yX3MZC0aY_28NRJegw",
  authDomain: "nsh-topup.firebaseapp.com",
  databaseURL: "https://nsh-topup-default-rtdb.firebaseio.com",
  projectId: "nsh-topup",
  storageBucket: "nsh-topup.firebasestorage.app",
  messagingSenderId: "835753230453",
  appId: "1:835753230453:web:3e2677c6cd7675a524783c"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };