import React, { useState, useEffect } from "react";

const ImageFromBase64 = ({ base64String, altText }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const decodedData = atob(base64String);
    const byteArray = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      byteArray[i] = decodedData.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: "image/png" });
    const url = URL.createObjectURL(blob);

    setImageUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [base64String]);

  return <div>{imageUrl && <img src={imageUrl} alt={altText} />}</div>;
};

export default ImageFromBase64;
