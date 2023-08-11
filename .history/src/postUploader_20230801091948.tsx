import React, { useState}  from "react";
import ImageLogo from "./image.svg";
import "./PostUploader.css";
import { Button } from '@mui/material';
import { db, storage } from "./firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function PostUploader() {
  
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpLoaded, setIsUpLoaded] = useState<boolean>(false);

  function OnFileUploadToFirebase(e:any){
    const imageFile = e.target.file[0];
  // const text = 

  }


return(
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
      <input
      type="text"
      placeholder="投稿内容を書く..."
      maxLength={20}
      />
      </div>
        )
        }
        </>     
      )}  
  
  
  </>
);

}

 export default PostUploader;










// const PostUploader = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isUpLoaded, setUploaded] = useState<boolean>(false);
    

//     const OnFileUploadToFirebase = (e:any) => {
//         const file = e.target.files[0];
//         const storageRef = ref(storage, 'image/' + file.name);
//         const uploadImage = uploadBytesResumable(storageRef, file);

//         uploadImage.on(
//             'state_changed', 
//             (snapshot) => {
//               setLoading(true);
//             },
//             (error:any) => {
//               console.log(error);
//             }, 
//             () => {
//               setLoading(false);
//               setUploaded(true);
//             }
//         );
//     };

//   return (
//     <>
      // {loading ?(
      //   <h2>アップロード中・・・</h2>
      // ) : (
      //   <>
      //   {isUpLoaded ? (
      //      <h2>アップロード完了しました！</h2>
      //   ) : (
      //     <div className="outerBox">
      // <div className="title">
      //   <h2>画像アップローダー</h2>
      //   <p>JpegかPngの画像ファイル</p>
      // </div>
      // <div className="imageUplodeBox">
      //   <div className="imageLogoAndText">
      //     <img src={ImageLogo} alt="imagelogo" />
      //     <p>ここにドラッグ＆ドロップしてね</p>
      //   </div>
      //   <input 
      //   className="imageUploadInput" 
      //   multiple name="imageURL"
      //   type="file" 
      //   accept=".png, .jpeg, .jpg"
      //   onChange={OnFileUploadToFirebase}
      //   />
      // </div>
      // <p>または</p>
      // <Button variant="contained">
      //   ファイルを選択
      //   <input 
      //   className="imageUploadInput" 
      //   type="file"
      //   accept=".png, .jpeg, .jpg"
      //   onChange={OnFileUploadToFirebase}
      //   />
      // </Button>
      // </div>
      //   )
      //   }
//       
//     </>    
//   );
// };

// export default PostUploader;