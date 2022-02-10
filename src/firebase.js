import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCWsNf_kWvit-qN5REYecixjRRffEeeuvk",
  authDomain: "fir-hosting-41215.firebaseapp.com",
  projectId: "fir-hosting-41215",
  storageBucket: "fir-hosting-41215.appspot.com",
  messagingSenderId: "437532903867",
  appId: "1:437532903867:web:414e0b76834fbeb8421c9e",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
