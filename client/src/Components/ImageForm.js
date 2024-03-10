import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle file upload: e.g., send the file to the server
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      // Possible request to server to handle the file upload can go here
      console.log('Uploading file...', formData);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center pb-4'>
        <h2>Upload an Image</h2>
      </div>
      <Row className='justify-content-center'>
        <Col xs={12} md={6}>
          <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Scan Image</button>
            </form>
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={12} md={6}>
          {previewImage && (
            <div>
              <h3 className="text-center pt-5">Preview</h3>
              <div className="d-flex justify-content-center pt-4">
                <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default FileUploadForm;
