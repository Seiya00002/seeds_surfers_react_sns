import React from 'react';
import './App.css';
import db from './firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { doc, onSnapshot } from 'firebase/firestore';

function App() {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    //データベースからデータを取得する。
    const postData = collection(db, "posts");
    getDocs(postData).then((snapShot) => {
      console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });

    onSnapshot(postData, (post) => {
      setPosts(post.docs.map((doc) => ({...doc.data() })));
    });
  }, []);

  return(
    <div className="App">
      <div>
        {posts.map((post:any) => (
          <div key={post.id}> 
            <h1>{post.title}</h1>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
