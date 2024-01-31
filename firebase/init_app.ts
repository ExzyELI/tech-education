import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.TE_API_KEY,
  authDomain: process.env.TE_AUTH_DOMAIN,
  projectId: process.env.TE_PROJECT_ID,
  storageBucket: process.env.TE_STORAGE_BUCKET,
  messagingSenderId: process.env.TE_MESSAGING_SENDER_ID,
  appId: process.env.TE_APP_ID,
}

if (!firebase.getApps.length)
  firebase.initializeApp(firebaseConfig)

export default firebase;