import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import {
  getStorage,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import firebaseInstance from "../firebaseConfig";

export const useFirebaseStorage = (folder: string) => {
  const [isUploading, setUploading] = useState(false);

  const storage = getStorage(firebaseInstance);

  const uploadFile = async (imageToUpload: string): Promise<string | null> => {
    setUploading(true);

    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";

      xhr.open("GET", imageToUpload, true);
      xhr.send(null);
    });

    const imageRef = storageRef(storage, `${folder}/${uuidv4()}`);

    const response = await uploadBytes(imageRef, blob)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log("url ->", url);
            return url;
          })
          .catch((error) => {
            console.error("error", error);
            return null;
          });
      })
      .catch((error) => {
        console.error("error", error);
        return null;
      });

    setUploading(false);

    return response;
  };

  return {
    uploadFile,
    isUploading,
  };
};
