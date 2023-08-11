import React from 'react';
import './App.css';
import db from './firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    //データベースからデータを取得する。
    const postData = collection(db, "posts");
    console.log(postData);
  }, []);

  return(
    <div className="App"></div>
  );
}

export default App;
