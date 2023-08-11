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
      <div>
        <PostUploader />
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
