import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { deleteObject } from "firebase/storage";
import { AuthContext } from "../AuthContext";
import { auth, db, storage } from "../firebase";
import "./Post.css";
import { ClassNames } from "@emotion/react";

const Post: React.FC<{ post: any }> = ( {post} ) => {
    const id = post?.id || "";
    const { text, imageUrl, userId, photoURL } = post;

    const [editing, setEditing] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(text);

    const { user } = useContext(AuthContext);

    const [ userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        fetchUserName(userId);
    }, [userId]);
    console.log(userName);

            const handleTextChande = (e: React.ChangeEvent<HTMLInputElement>) => {
                setEditedText(e.target.value);
            };

            const saveEditedPost = async () => {
                if ( user?.uid === userId ) {
                try {
                    await updateDoc(doc(db, "posts", id), {
                        text: editedText,
                    });

                    setEditing(false);
                } catch (error) {
                    console.log("投稿の更新中にエラーが発生しました。", error);
                }
                }
            };

            const deletePost = async () => {
                if ( user?.uid === userId ) {
                try {
                    // Firestoreのデータを削除
                    await deleteDoc(doc(db, "posts", id));
            
                    // 画像が存在する場合、ストレージファイルを削除
                    if (imageUrl) {
                        console.log("imageUrl:", imageUrl);

                        const storageRef = ref(storage, imageUrl);
                        await deleteObject(storageRef);
                    }
                } catch (error) {
                    console.log("投稿の削除中にエラーが発生しました。", error);
                }
                }
            };
    
    const fetchUserName = async (userId: string) => {
        try {
            const userDocRef = doc(db, "posts", userId);
            const userDocSnap = await getDoc(userDocRef);
            if(userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if(userData) {
                    setUserName(userData.displayName);
                }
            } 
        } catch (error) {
            console.error("ユーザー名取得エラー:", error);
        }
    };
     

    return(
        <div className="postOuterBox">
            <div className="postUserInfo">
                <img src={photoURL || ''} alt={`${userName}のプロフィールアイコン`} className="userProfileIcon" />
                <p className="userName" >{userName}</p>
            </div>
            {imageUrl && 
            <img src={imageUrl} 
            alt="投稿画像" 
            className="postImage"
            />}
            {editing ? (
                <>
                    {user?.uid === userId ? (
                        <input
                            type="text"
                            value={editedText}
                            onChange={handleTextChande}
                            className="postEditText"
                        />
                        ):(
                            <p className="postText">{text}</p>
                    )}
                </>
            ) : (
                <p className="postText">{text}</p>
            )}
            <div className="postActions">
                { user?.uid === userId && (
                    <>
                        <button onClick={deletePost}>削除</button>
                        {editing ? (
                            <>
                                <button onClick={saveEditedPost}>保存</button>
                                <button onClick={() => setEditing(false)}>キャンセル</button>
                            </>
                        ) : (
                            <button onClick={() => setEditing(true)}>編集</button>

                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Post;