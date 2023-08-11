import React, { useState}  from "react";
import ImageLogo from "./image.svg";
import "./PostUploader.css";
import { Button } from '@mui/material';
import { db, storage } from "./firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const PostUploader = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpLoaded, setUploaded] = useState<boolean>(false);
    

    const OnFileUploadToFirebase = (e:any) => {
        // console.log(e.target.files[0].name);
        const file = e.target.files[0];
        const storageRef = ref(storage, 'image/' + file.name);
        // uploadBytes(storageRef, file).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        //   });
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
    </div>
        )
        }
        </>
        
      )}
    
    
    </>



    
  );
};

export default PostUploader;