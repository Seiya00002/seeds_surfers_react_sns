import React from 'react';
import './App.css';
import { db, storage } from './firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { doc, onSnapshot } from 'firebase/firestore';

function App() {
  const [posts, setPosts] = useState<any>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    //データベースからデータを取得する。
    const postData = collection(db, "posts");
    getDocs(postData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
      setDataLoaded(true); //データ取得完了したことをフラグで示す
    });

    onSnapshot(postData, (post) => {
      setPosts(post.docs.map((doc) => ({...doc.data() })));
    });
  }, []);

  if(!dataLoaded) {
    // データがまだ取得されていない場合はローディング画面を表示
    return <div>Loading...</div>;
  }

  return(
    <div className="App">
      <div>
        {posts.map((post:any) => (
          <div key={post.timestamp}> 
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <p>{post.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
