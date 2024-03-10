import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios'; 

function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile); 

      reader.onloadend = async () => {
        const base64Image = reader.result; 

        try {
          const response = await axios.post('/your-tensorflow-api-endpoint', {
            image: base64Image
          });
          console.log('TensorFlow response:', response); 
        } catch (error) {
          console.error('Error sending image:', error);
        }
      };
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
