//  for initializing and retrieving Firebase apps
import { initializeApp, getApp, getApps } from "firebase/app";
// for authentication-related functionality.
import { getAuth} from 'firebase/auth'
//  for working with Firestore
import  {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// an object that contains the configuration settings required to initialize your Firebase app.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

// for authentication
const auth = getAuth(app);
//  used to interact with the Firestore database, where you can store and retrieve data.
const firestore = getFirestore(app)

export { auth, firestore, app };