import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

const Post: React.FC<{ post: any }> = ( {post} ) => {
    const { title, text, imageUrl} = post;

    return(
        <div>
            {imageUrl && <img src={imageUrl} alt="投稿画像" />}
        </div>
    );
};

export default Post;