import React from 'react';
import './App.css';
import { db, storage } from './firebase';
import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, QuerySnapshot } from "firebase/firestore";
import { doc, onSnapshot } from 'firebase/firestore';

function App() {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
  //投稿取得するクエリ  
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    //リアルタイムの投稿取得
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => doc.data());
      setPosts(postsData);
    });
    
    //コンポーネントがアンマウントされた時にunsubscribeする
    return () => unsubscribe();
  }, []);


  return(
    <div className="App">
      <div>
        {posts.map((post:any) => (
          <div key={post.timestamp}> 
            <h1>{post.title}</h1>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;







  // const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  // useEffect(() => {
  //   const postData = collection(db, "posts");
  //   getDocs(postData).then((snapShot) => {
  //     setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
  //     setDataLoaded(true); 
  //   });

  //   onSnapshot(postData, (post) => {
  //     setPosts(post.docs.map((doc) => ({...doc.data() })));
  //   });
  // }, []);

  // if(!dataLoaded) {
  //   return <div>Loading...</div>;
  // }