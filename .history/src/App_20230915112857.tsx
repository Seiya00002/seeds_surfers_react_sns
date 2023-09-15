import React from 'react';
import './App.css';
import { db } from './firebase';
import { useEffect, useState } from "react";
import { collection, query, orderBy } from "firebase/firestore";
import { onSnapshot } from 'firebase/firestore';
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
        <p　className='introduce'>植物自慢や、育て方の教え合い♪</p>
        <PostUploader setPosts={setPosts} />
        {posts.map((post:any) => (
          <Post key={post.timestamp} post={post} />
        ))}
      </div>
  );
}

export default App;