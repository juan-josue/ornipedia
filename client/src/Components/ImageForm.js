import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios'; 

function FileUploadForm(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const getBase64 = (file) => {
    return new Promise(resolve => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        const encoded_img = await getBase64(selectedFile);
        const encoded_data = encoded_img.split(",")[1];
        console.log("encoded",encoded_data);
        
        const response = await axios.post(
          'http://127.0.0.1:8000/polls/',
          {
            base_64_encoded_img: encoded_data,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('TensorFlow response:', response.data);
        props.setResponse(response.data); // Guarda la respuesta en el estado
      } catch (error) {
        console.error('Error sending image:', error);
      }
    }
  };
  
  return (
    <div>
        <div className='preview'>
          <div className='image-container'>
            {previewImage && (
                <img className='upload-image' src={previewImage} alt="Preview" />
              )}
            {!previewImage && <p>Upload a bird photo</p>}
          </div>  
        </div>
        
        <form className='form' onSubmit={handleSubmit}>
          <input className='upload-btn' type="file" onChange={handleFileChange} />
          <button className='scan-btn' type="submit">Scan Image</button>
        </form>
      {serverResponse && (
        <Row className='justify-content-center'>
          <Col xs={12} md={6}>
            <div>
              <h3 className="text-center pt-5">Server Response</h3>
              <div className="d-flex justify-content-center pt-4">
                <p>{serverResponse}</p>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default FileUploadForm;
