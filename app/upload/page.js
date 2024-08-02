"use client"

import Image from "next/image";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export default function Upload() {
  const [file, setFile] = useState(null); // State to store the selected file
  const [uploading, setUploading] = useState(false); // State to indicate the upload status
  const [uploadedUrl, setUploadedUrl] = useState(null); // State to store the uploaded image URL

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the selected file
  }

  const handleUpload = async () => {
    if (!file) return; // Return if no file is selected

    setUploading(true); // Set uploading state to true
    const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the file in Firebase Storage

    try {
      await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
      const url = await getDownloadURL(storageRef); // Get the download URL of the uploaded file
      setUploadedUrl(url); // Set the uploaded image URL
      console.log("File Uploaded Successfully");
    } catch (error) {
      console.error('Error uploading the file', error);
    } finally {
      setUploading(false); // Set uploading state to false
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} /> {/* File input to select the image */}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"} {/* Button to upload the image */}
      </button>
      {uploadedUrl && (
        <div>
          <p>Uploaded image:</p>
          <Image
            src={uploadedUrl}
            alt="Uploaded image"
            width={300}
            height={300}
            layout="responsive"
          />
        </div>
      )}
    </div>
  );
}