import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBRDDI1LXOkkKQ-kRKS54q_V3TDHB5F-pI",
    authDomain: "alpha-prime-873c5.firebaseapp.com",
    databaseURL: "https://alpha-prime-873c5-default-rtdb.firebaseio.com",
    projectId: "alpha-prime-873c5",
    storageBucket: "alpha-prime-873c5.appspot.com",
    messagingSenderId: "910918278674",
    appId: "1:910918278674:web:901983042bb395856782cb",
    measurementId: "G-M60S81TX6S"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };