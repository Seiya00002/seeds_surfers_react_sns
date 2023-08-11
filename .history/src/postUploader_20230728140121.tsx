import React from "react";
import ImageLogo from "./image.svg";
import "./PostUpload.css";
import { Button } from "@mui/material";


const PostUploader = () => {
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
        <input className="imageUploadInput" multiple name="imageURL" />
      </div>
      <p>または</p>
      <Button variant="contained">
        ファイルを選択
        <input className="imageUploadInput" />
      </Button>
    </div>
  );
};

export default PostUploader;