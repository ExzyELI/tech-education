import {initializeApp, getApps, getApp} from "firebase/app";
import "firebase/auth";
import {browserLocalPersistence, getAuth, setPersistence} from "firebase/auth";
import "firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/navigation";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
}


const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

setPersistence(auth, browserLocalPersistence);

const useHandleRedirect = async () => {
  //await new Promise(resolve => setTimeout(resolve, 1000));
  const [user] = useAuthState(auth);
  //const user = auth.currentUser;
  console.log(user);
  const router = useRouter();
  const authCheck = auth.onAuthStateChanged(() => {
    if (!user && user == null) {
      router.push("/sign-in");
    }
    });
  authCheck();
}

export {firebaseApp, auth, db, useHandleRedirect};