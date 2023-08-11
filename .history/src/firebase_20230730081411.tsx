import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDRiOj3JAcuLe6c_Ms2hhsjBCCb8lLwSGU",
  authDomain: "seeds-surfers-react-sns.firebaseapp.com",
  projectId: "seeds-surfers-react-sns",
  storageBucket: "seeds-surfers-react-sns.appspot.com",
  messagingSenderId: "1087322797942",
  appId: "1:1087322797942:web:be61f4173bd538ec6e2c57"
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore(app);

// export default db;
// export default storage;
