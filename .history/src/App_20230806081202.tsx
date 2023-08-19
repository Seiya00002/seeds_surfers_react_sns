import React from 'react';
import './App.css';
import { db, storage } from './firebase';
import { useEffect, useState, useRef, useContext } from "react";
import { collection, query, orderBy, getDocs, QuerySnapshot } from "firebase/firestore";
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from "./AuthContext";
import Post from './Post';
import PostUploader from './PostUploader';
import Login from './Login';

function App() {
  const [posts, setPosts] = useState<any>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    // リアルタイム表示
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => doc.data());
      setPosts(postsData);
    });

    return () => {
      // コンポーネントがアンマウントされる際にunsubscribeを行う
      unsubscribe();
    };
  }, []);

  return(
    <div className="App">
      {user ?}
      <PostUploader />
      {posts.map((post:any) => (
        <Post key={post.timestamp} post={post} />
      ))}
    </div>
  );
}

export default App;