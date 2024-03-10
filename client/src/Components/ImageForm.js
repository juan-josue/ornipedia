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

  const getBase64 = (file) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      // Set up the onload event handler
        try {
          const encoded_img = await getBase64(selectedFile);
          console.log(encoded_img)
          // Send the file content as base64 encoded in the Axios POST request
          const response = await axios.post(
            'http://127.0.0.1:8000/polls/',
            {
              base_64_encoded_img: encoded_img,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('TensorFlow response:', response.data);
        } catch (error) {
          console.error('Error sending image:', error);
        }
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
