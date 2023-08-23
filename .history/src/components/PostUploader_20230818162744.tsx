import React, { useState}  from "react";
import "./PostUploader.css";
import { Button } from '@mui/material';
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from "firebase/app";
import "firebase/firestore";
import { addDoc, collection, serverTimestamp} from "firebase/firestore";
import Post from "./Post";
import Login from "./Login";

interface PostUploaderProps {
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
}

function PostUploader({ setPosts }: PostUploaderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpLoaded, setUploaded] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<any>("");

  const OnFileUploadToFirebase = (e:any) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, 'image/' + file.name);
        const uploadImage = uploadBytesResumable(storageRef, file);

        setLoading(true);

        uploadImage.then((snapshot) => {
          setLoading(false);
          setUploaded(true);
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          setFileUrl(url);
        })
        .catch((error: any) => {
          setLoading(false);
          console.error("画像のアップロードに失敗しました。:", error);
        });
  };

  const onTextUploadToFirebase = () => {
    addDoc(collection(db, "posts"), {
      text:text,
      imageUrl:fileUrl,
      timestamp: serverTimestamp(),
    })
    .then((docRef)=>{
      console.log("投稿が完了しました！");

      const newDocId = docRef.id;

      setText("");
      setFileUrl("");
      setUploaded(false);
      
      // Post コンポーネントに渡すデータに新しいドキュメントIDを追加
      setPosts((prevPosts) => [
        ...prevPosts,
        {
          text: text,
          imageUrl: fileUrl,
          timestamp: serverTimestamp(),
          id: newDocId,
        },
      ]);

      console.log("新しく追加されたドミュメントのID:", newDocId);
    })
    .catch((error: any) => {
      console.error("エラーが発生しました。:",error);
    });
  };

  return (
    <>
      {loading ?(
        <h2>画像アップロード中・・・</h2>
      ) : (
        <>
          {isUpLoaded ? (
            <>
              <div className="outerBox">
                <h2>画像アップロード完了しました！</h2>

                <form id="post">
                  <label>
                    <input 
                      type="text"
                      placeholder="報告や疑問を書く..."
                      size={50}
                      maxLength={500}
                      value={text}
                      onChange={e => setText(e.target.value)}
                    />
                  </label>
                  </form>
                  <input 
                    type="button" 
                    form="post" 
                    value="Post"
                    onClick={onTextUploadToFirebase}
                  />
              </div>
            </>
            ) : (
              <div className="outerBox">
                <div className="title">
                　<Login />
                  <h2>今日の調子はどう？</h2>
                  <p>JpegかPngの写真ファイル</p>
                </div>
                <Button variant="contained">
                  写真を選択
                  <input 
                  className="imageUploadInput" 
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={OnFileUploadToFirebase}
                  />
                </Button>
                <form id="post">
                  <label>
                    <input 
                      type="text"
                      placeholder="報告や疑問を書く..."
                      className="textPost"
                      size={50}
                      maxLength={500}
                      value={text}
                      onChange={e => setText(e.target.value)}
                    />
                  </label>
                  </form>
                  <input 
                    type="button" 
                    className="textUploadInput"
                    form="post" 
                    value="Post"
                    onClick={onTextUploadToFirebase}
                  />
              </div>
            )
          }
        </>     
      )}   
    </>    
  );
};

export default PostUploader;