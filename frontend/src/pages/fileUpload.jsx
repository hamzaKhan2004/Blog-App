import React from "react";

const fileUpload = () => {
  const handleFileUpload = (e) => {};
  return (
    <div className="file-upload">
      <div className="upload-container">
        <div className="upload-icon">
          <img src="" alt="" />
        </div>
        <input type="file" className="file-input" onChange={handleFileUpload} />
      </div>
    </div>
  );
};

export default fileUpload;
