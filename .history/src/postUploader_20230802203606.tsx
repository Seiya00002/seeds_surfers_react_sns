import React, { useState}  from "react";
import ImageLogo from "./image.svg";
import "./PostUploader.css";
import { Button } from '@mui/material';
import { db, storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from "firebase/app";
import "firebase/firestore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Post from "./Post";


const PostUploader = () => {
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
    .then(()=>{
      console.log("投稿が完了しました！");
      setText("");
      setFileUrl("");
      setUploaded(false);
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
                      placeholder="投稿内容を書く..."
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
                  <h2>投稿アップローダー</h2>
                  <p>JpegかPngの画像ファイル</p>
                </div>
                <div className="imageUplodeBox">
                  <div className="imageLogoAndText">
                    <img src={ImageLogo} alt="imagelogo" />
                    <p>ここにドラッグ＆ドロップしてね</p>
                  </div>
                  <input 
                  className="imageUploadInput" 
                  multiple name="imageURL"
                  type="file" 
                  accept=".png, .jpeg, .jpg"
                  onChange={OnFileUploadToFirebase}
                  />
                </div>
                <p>または</p>
                <Button variant="contained">
                  ファイルを選択
                  <input 
                  className="imageUploadInput" 
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={OnFileUploadToFirebase}
                  />
                </Button>
                
              </div>
            )
          }
        </>     
      )}   
    </>    
  );
};

export default PostUploader;