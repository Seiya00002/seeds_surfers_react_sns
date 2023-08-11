import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRiOj3JAcuLe6c_Ms2hhsjBCCb8lLwSGU",
  authDomain: "seeds-surfers-react-sns.firebaseapp.com",
  projectId: "seeds-surfers-react-sns",
  storageBucket: "seeds-surfers-react-sns.appspot.com",
  messagingSenderId: "1087322797942",
  appId: "1:1087322797942:web:be61f4173bd538ec6e2c57"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const db = getFirestore(app);

export default db;

