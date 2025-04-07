import { Image } from "lucide-react";
import React, { useState } from "react";
import PhotoCropper from "./PhotoCropper";
import CustomFileInput from "./CustomFileInput";

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
      <label className="mb-3 block flex items-center gap-2 text-xl font-semibold text-dracula-foreground">
        <Image color="#ff5555" /> Selecione sua foto:
      </label>
      <CustomFileInput handleFileChange={handleFileChange} />
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
