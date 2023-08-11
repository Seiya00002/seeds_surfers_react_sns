import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import "./Post.css";

const Post: React.FC<{ post: any }> = ( {post} ) => {
    const { title, text, imageUrl} = post;

    return(
        <div className="postOuterBox">
            {imageUrl && 
            <img src={imageUrl} 
            alt="投稿画像" 
            className="postImage"
            />}
            <p>{text}</p>
        </div>
    );
};

export default Post;