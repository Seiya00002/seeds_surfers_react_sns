import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import "./Post.css";

const Post: React.FC<{ post: any }> = ( {post} ) => {
    const { title, text, imageUrl} = post;

    const deletePost = async () => {
        try {
            await db.collection("posts").doc(post.id).delete();

            if(imageUrl) {
                const storageRef = storage.refFromURL(imageUrl);
                await storageRef.delete();
            }
        } catch (error) {
            console.log("投稿の削除中にエラーが発生しました。, error");
        }
    };

    return(
        <div className="postOuterBox">
            {imageUrl && 
            <img src={imageUrl} 
            alt="投稿画像" 
            className="postImage"
            />}
            <p>{text}</p>
            <div className="postActions">
                <button onClick={deletePost}>削除</button>
                <button>編集</button>
            </div>
        </div>
    );
};

export default Post;