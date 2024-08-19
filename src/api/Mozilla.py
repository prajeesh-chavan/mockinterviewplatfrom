import deepspeech
import wave
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests for React frontend

# Load DeepSpeech model
model_file_path = 'deepspeech-0.9.3-models.pbmm'
scorer_file_path = 'deepspeech-0.9.3-models.scorer'

model = deepspeech.Model(model_file_path)
model.enableExternalScorer(scorer_file_path)

# Function to read audio file
def read_wav_file(filename):
    with wave.open(filename, 'r') as wav_file:
        frames = wav_file.getnframes()
        buffer = wav_file.readframes(frames)
        return np.frombuffer(buffer, dtype=np.int16)

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    file_path = 'uploaded.wav'
    file.save(file_path)
    
    # Read and transcribe the audio file
    audio = read_wav_file(file_path)
    text = model.stt(audio)
    
    return jsonify({'transcription': text})

if __name__ == '__main__':
    app.run(debug=True)
