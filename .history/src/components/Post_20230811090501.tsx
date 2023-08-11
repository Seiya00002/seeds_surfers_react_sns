import React from "react";
import { useState } from "react";
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { deleteObject } from "firebase/storage";
import { db } from "../firebase";
import { storage } from "../firebase";
import "./Post.css";

const Post: React.FC<{ post: any }> = ( {post} ) => {
    const { title, text, imageUrl} = post;

    const [editing, setEditing] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(text);

    const handleTextChande = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(e.target.value);
    };

    const saveEditedPost = async () => {
        try {
            await updateDoc(doc(db, "posts", post.id), {
                text: editedText,
            });

            setEditing(false);
        } catch (error) {
            console.log("投稿の更新中にエラーが発生しました。", error);
        }
    };

    const deletePost = async () => {
        try {
            console.log("post.id:",post.doc.id );
            // Firestoreのデータを削除
            await deleteDoc(doc(db, "posts", "post.id"));
    
            // 画像が存在する場合、ストレージファイルを削除
            if (imageUrl) {
                console.log("imageUrl:", imageUrl);

                const storageRef = ref(storage, imageUrl);
                await deleteObject(storageRef);
            }
        } catch (error) {
            console.log("投稿の削除中にエラーが発生しました。", error);
        }
    };

    return(
        <div className="postOuterBox">
            {imageUrl && 
            <img src={imageUrl} 
            alt="投稿画像" 
            className="postImage"
            />}
            {editing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={handleTextChande}
                    className="postEditText"
                />
            ) : (
                <p>{text}</p>
            )}
            <div className="postActions">
                <button onClick={deletePost}>削除</button>
                {editing ? (
                    <>
                        <button onClick={saveEditedPost}>保存</button>
                        <button onClick={() => setEditing(false)}>キャンセル</button>
                    </>
                ) : (
                    <button onClick={() => setEditing(true)}>編集</button>

                )}
            </div>
        </div>
    );
};

export default Post;