import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const response = await axios.post('http://localhost:5000/Upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle success: display extracted text
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleSubmit}>Upload PDF</button>
    </div>
  );
};



// ExtractedText.js




const ExtractedText = () => {
  const [extractedText, setExtractedText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ExtractedText');
        setExtractedText(response.data);
      } catch (error) {
        console.error('Error fetching extracted text:', error);
        // Handle error
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Extracted Text</h2>
      <p>{extractedText}</p>
    </div>
  );
};


export  {FileUpload, ExtractedText};
