import React, { useState } from 'react';

const SpeechToText = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setTranscription(data.transcription);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container ">
      <h1 className="text-2xl mb-4">DeepSpeech Speech-to-Text</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload and Transcribe
      </button>
      {transcription && <p className="mt-4 text-xl text-center">Transcription: {transcription}</p>}
    </div>
  );
};

export default SpeechToText;

