import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [transcription, setTranscription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a file')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('audio', file)

    try {
      const response = await axios.post('http://localhost:3000/api/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setTranscription(response.data.transcription)
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while transcribing the audio')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <h1>Audio Transcription Tool</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button type="submit" disabled={!file || loading}>
          {loading ? 'Transcribing...' : 'Transcribe'}
        </button>
      </form>
      {transcription && (
        <div className="transcription">
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  )
}

export default App
