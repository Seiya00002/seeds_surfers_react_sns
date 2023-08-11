import React from 'react';
import './App.css';
import { db, storage } from './firebase';
import { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, getDocs, QuerySnapshot } from "firebase/firestore";
import { doc, onSnapshot } from 'firebase/firestore';
import { Routes, Route } from 'react-router-dom';
import Post from './Post';
import PostUploader from './PostUploader';
import Login from './Login';


function App() {
  
  const [posts, setPosts] = useState<any>([]);

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
    <div className='App'>
      <Routes>
        <Route path='/home' element={<HomeContent posts={posts}/>} />
      </Routes>
    </div>
  );
  }

function HomeContent(props:any) {
  const { posts } = props;

  return(
    <div>
      <Login />
      <PostUploader />
      {posts.map((post:any) => (
        <Post key={post.timestamp} post={post} />
      ))}
    </div>
  );
}

export default App;