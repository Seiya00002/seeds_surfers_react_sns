import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { deleteObject } from "firebase/storage";
import { AuthContext } from "../AuthContext";
import { db } from "../firebase";
import { storage } from "../firebase";
import "./Post.css";
import { ClassNames } from "@emotion/react";

const Post: React.FC<{ post: any }> = ( {post} ) => {
    const id = post?.id || "";
    const { text, imageUrl, userId } = post;
    console.log("userId:", userId);

    const [postUser, setPostUser] = useState<any>(null);

    const [editing, setEditing] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(text);

    const { user } = useContext(AuthContext);

    console.log("user:", user);

    //投稿者の情報取得関数
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const userDoc = await getDoc(doc(db, "posts", userId));
                if (userDoc.exists()) {
                    setPostUser(userDoc.data());
                }
            } catch (error) {
                console.log("ユーザー情報の取得に失敗しました。",error);
            }
        };
        fetchUser();
    }, [userId]);

    console.log("各投稿のuserId",userId);

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

    return(
        <div className="postOuterBox">
            <div className="postUserInfo">
                <img src={postUser?.photoURL || ''} alt={`${postUser?.displayName}のプロフィールアイコン`} className="userProfileIcon" />
                <p className="userName" >{postUser?.displayName}</p>
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
                            <p>{text}</p>
                    )}
                </>
            ) : (
                <p>{text}</p>
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