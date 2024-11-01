import React, { useState } from 'react';
import './uploadPage.css'

const UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setAlertMessage('');
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      setAlertMessage('Please select a file before uploading!');
    } else {
      selectedFiles.forEach(file => {
        uploadFile(file);
      });
    }
  };

  const uploadFile = (file) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', function (event) {
      if (event.lengthComputable) {
        const progressBar = document.getElementById(`progress-${file.name.replace(/\s/g, '')}`);
        const percent = (event.loaded / event.total) * 100;
        progressBar.style.width = percent + '%';
      }
    });

    xhr.onload = function () {
      const statusIcon = document.getElementById(`status-${file.name.replace(/\s/g, '')}`);
      if (xhr.status === 200) {
        statusIcon.src = 'https://img.icons8.com/ios-filled/50/000000/checkmark.png'; // Success icon
      } else {
        statusIcon.src = 'https://img.icons8.com/ios-filled/50/000000/cancel.png'; // Error icon
      }
    };

    xhr.onerror = function () {
      const statusIcon = document.getElementById(`status-${file.name.replace(/\s/g, '')}`);
      statusIcon.src = 'https://img.icons8.com/ios-filled/50/000000/cancel.png'; // Error icon
    };

    xhr.open('POST', '/upload', true);
    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
  };

  return (
    <div className="upload-container">
      <h2>Upload the report</h2>
      <div className="upload-box" id="upload-box">
        <input
          type="file"
          id="fileInput"
          className="file-input"
          accept="image/*,.pdf,.doc,.docx"
          multiple
          onChange={handleFileSelect}
        />
        <label htmlFor="fileInput" className="upload-label">
          <img src="https://img.icons8.com/clouds/100/000000/upload.png" alt="Upload Icon" />
          <span>Browse the file to upload</span>
        </label>
      </div>
      <button onClick={handleUpload} className="upload-btn">
        Upload
      </button>
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      <div id="upload-list" className="upload-list">
        {selectedFiles.map((file) => (
          <div className="file-item" key={file.name}>
            <div className="file-details">
              <div className="file-name">{file.name}</div>
              <div className="file-size">{(file.size / 1024).toFixed(2)} KB</div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  id={`progress-${file.name.replace(/\s/g, '')}`}
                ></div>
              </div>
            </div>
            <div className="file-status">
              <img
                id={`status-${file.name.replace(/\s/g, '')}`}
                src="https://img.icons8.com/ios-filled/50/000000/hourglass.png"
                alt="Status"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadPage;
