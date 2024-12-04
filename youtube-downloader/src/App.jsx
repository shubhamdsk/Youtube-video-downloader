import { useState } from "react";
import InputField from "./components/InputField";
import DownloadButton from "./components/DownloadButton";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);

  const handleDownload = () => {
    if (!url.trim()) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setError("");
    setIsDownloading(true);
    setIsModalOpen(true);

    const eventSource = new EventSource(
      `http://localhost:8000/progress/?url=${encodeURIComponent(url)}`
    );

    eventSource.onmessage = (event) => {
      if (event.data === "COMPLETE") {
        setIsDownloading(false);
        setIsDownloadComplete(true);
        eventSource.close();
      } else if (event.data.startsWith("ERROR")) {
        alert(event.data);
        setIsDownloading(false);
        setIsModalOpen(false);
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsDownloading(false);
      setIsModalOpen(false);
    };
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    if (error) setError("");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUrl("");
    setIsDownloadComplete(false);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>YouTube Video Downloader</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "px",
          width: "80%",
          margin: "0 auto",
        }}
      >
        <InputField value={url} onChange={handleInputChange} error={error} />
        <DownloadButton onClick={handleDownload} />
      </div>

      <Modal
        isOpen={isModalOpen}
        isDownloading={isDownloading}
        isComplete={isDownloadComplete}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;
