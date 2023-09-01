import React from 'react';
import './App.css';
import { db, storage } from './firebase';
import { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, getDocs, QuerySnapshot } from "firebase/firestore";
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthProvider } from './AuthContext';
import Header from './Header';
import Post from './Components/Post';
import PostUploader from './Components/PostUploader';

function App() {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    // リアルタイム表示
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setPosts(postsData);
    });

    return () => {
      // コンポーネントがアンマウントされる際にunsubscribeを行う
      unsubscribe();
    };
  }, []);

  return(
      <div className="App">
        <Header />
        <PostUploader setPosts={setPosts} />
        {posts.map((post:any) => (
          <Post key={post.timestamp} post={post} />
        ))}
      </div>
  );
}

export default App;