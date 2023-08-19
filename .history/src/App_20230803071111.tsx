import React from 'react';
import './App.css';
import { db, storage } from './firebase';
import { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, getDocs, QuerySnapshot } from "firebase/firestore";
import { doc, onSnapshot } from 'firebase/firestore';
import Post from './Post';
import PostUploader from './PostUploader';

function App() {
  const [posts, setPosts] = useState<any>([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => doc.data());
      setPosts(postsData);
    });

    return () => {
      // コンポーネントがアンマウントされる際にunsubscribeを行う
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if(container){
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const offsetHeight = container.offsetHeight;

    container.scrollTop = scrollHeight - (scrollTop + offsetHeight);
    }
  }, [posts]);

  return(
    <div className="App">
      <PostUploader />
      {posts.map((post:any) => (
        <Post key={post.timestamp} post={post} />
      ))}
    </div>
  );
}

export default App;

// 8/2 表示が不具合　・画面が上に推移し消えてしまう