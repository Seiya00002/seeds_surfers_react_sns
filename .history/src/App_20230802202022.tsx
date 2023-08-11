import React from 'react';
import './App.css';
import { db, storage } from './firebase';
import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, QuerySnapshot } from "firebase/firestore";
import { doc, onSnapshot } from 'firebase/firestore';
import Post from './Post';
import PostUploader from './PostUploader';

function App() {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((doc) => doc.data());
      setPosts(postsData);
    };
    
    fetchPosts();
  }, []);

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
// ・更新しないとrealtime最新投稿が表示されない