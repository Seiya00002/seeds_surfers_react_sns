import React from "react";
import ImageLogo from "./image.svg";
import "./PostUploader.css";
import { Button } from '@mui/material';
import { db, storage } from "./firebase";


const PostUploader = () => {

    const OnFileUploadToFirebase = () => {};

  return (
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
        accept=".png .jpeg .jpg"
        onChange={OnFileUploadToFirebase}
        />
      </div>
      <p>または</p>
      <Button variant="contained">
        ファイルを選択
        <input 
        className="imageUploadInput" 
        type="file"
        accept=".png .jpeg .jpg"
        onChange={OnFileUploadToFirebase}
        />
      </Button>
    </div>
  );
};

export default PostUploader;