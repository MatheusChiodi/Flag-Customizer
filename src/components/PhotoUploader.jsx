import { Image } from "lucide-react";
import React, { useState } from "react";
import PhotoCropper from "./PhotoCropper";

function PhotoUploader({ setPhoto }) {
  const [tempImage, setTempImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImg) => {
    setPhoto(croppedImg);
    setTempImage(null);
  };

  return (
    <div className="rounded-lg bg-gray-800 p-6 text-white shadow-xl">
      <label className="text-dracula-foreground mb-3 block flex items-center gap-2 text-xl font-semibold">
        <Image color="#ff5555" /> Selecione sua foto:
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file:bg-dracula-currentLine hover:file:bg-dracula-red block w-full text-sm text-gray-500 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition-all file:duration-500"
      />
      {tempImage && (
        <PhotoCropper
          image={tempImage}
          onCropComplete={handleCropComplete}
          onCancel={() => setTempImage(null)}
        />
      )}
    </div>
  );
}

export default PhotoUploader;
