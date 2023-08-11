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
    getDocs(postData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  return(
    <div className="App">
      <h2>TEST</h2>
      {posts.map((post:any) => {
        <div key={post.title}>
          <h1>{post.title}</h1>
          <p>{post.text}</p>
        </div>
      })}
    </div>
  );
}

export default App;
