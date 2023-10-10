import React from "react";
import { useState, useContext } from "react";
import { deleteDoc, doc, updateDoc, Timestamp } from "firebase/firestore";
import { ref } from "firebase/storage";
import { deleteObject } from "firebase/storage";
import { AuthContext } from "../AuthContext";
import { db, storage } from "../firebase";
import "./Post.css";

interface PostProps {
    post: {
        id: string;
        text: string;
        imageUrl: string | null;
        userId: string;
        photoURL: string | null;
        displayName: string | null;
    };
}

const formatDateToDaysAgo = (date: Date | null): string => {
    if(!date) {
        return "日付不明";
    }

    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 *24));

    if(daysAgo === 0) {
        return "今日";
    } else if (daysAgo === 1) {
        return "昨日";
    } else {
        return `${daysAgo}日前`;
    }
}   

const Post: React.FC<{ post: any }> = ( {post} ) => {
    const id = post?.id || "";
    const { timstamp, text, imageUrl, userId, photoURL, displayName } = post;
    
    const date = timestamp ? (timestamp as Timestamp).toDate() : null;
    const daysAgo = date ? formatDateToDaysAgo(date) : null;

    const [editing, setEditing] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(text);

    const { user } = useContext(AuthContext);

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
            <p className="date">{daysAgo}</p>
            <div className="postUserInfo">
                <img src={photoURL || ''} alt={`${displayName}のプロフィールアイコン`} className="userProfileIcon" />
                <p className="userName" >{displayName}</p>
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
                        <button 
                        className="edit-button"
                        onClick={deletePost}
                        >
                            <img src="image/trash-icon.png" className="edit-icon" alt="削除" />
                        </button>
                        {editing ? (
                            <>
                                <button onClick={saveEditedPost}>保存</button>
                                <button onClick={() => setEditing(false)}>キャンセル</button>
                            </>
                        ) : (
                            <button className="edit-button"
                            onClick={() => setEditing(true)}
                            >
                                <img src="image/pen-icon.png" className="edit-icon" alt="編集" />
                            </button>

                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Post;