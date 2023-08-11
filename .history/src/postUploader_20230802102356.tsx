import React, { useState}  from "react";
import ImageLogo from "./image.svg";
import "./PostUploader.css";
import { Button } from '@mui/material';
import { db, storage } from "./firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const PostUploader = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpLoaded, setUploaded] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const OnFileUploadToFirebase = (e:any) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, 'image/' + file.name);
        const uploadImage = uploadBytesResumable(storageRef, file);

        uploadImage.on(
            'state_changed', 
            (snapshot) => {
              setLoading(true);
            },
            (error:any) => {
              console.log(error);
            }, 
            () => {
              setLoading(false);
              setUploaded(true);
            }
        );
  };

const onTextUploadToFirebase = (text) => {
  console.log(text);
};

  return (
    <>
      {loading ?(
        <h2>アップロード中・・・</h2>
      ) : (
        <>
          {isUpLoaded ? (
            <h2>アップロード完了しました！</h2>
            ) : (
              <div className="outerBox">
                <div className="title">
                  <h2>画像アップローダー</h2>
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
                <form id="post">
                  <label>
                    <input 
                    type="text"
                    placeholder="投稿内容を書く..."
                    size={50}
                    maxLength={500}
                    onChange={e => setText(e.target.value)}
                     />
                  </label>
                </form>
                <input 
                type="submit" 
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