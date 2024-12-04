`README.md`

# YouTube Video Downloader

This project allows users to download YouTube videos via a web interface. The backend is built using **FastAPI** and **yt-dlp**, and the frontend is developed using **React**. The system provides a real-time download progress tracker using **Server-Sent Events (SSE)**.

## Project Overview

- **Frontend**: A React app that allows users to input a YouTube URL and download the video. It communicates with the backend via HTTP requests and displays download progress in real-time using SSE.
- **Backend**: A FastAPI server that handles the video download process using `yt-dlp`. It exposes a `/progress/` endpoint that streams download progress to the frontend.

## Features

- Input a YouTube video URL.
- Track the download progress in real-time.
- Show download completion status.

## Prerequisites

To run this project, ensure you have the following installed:

- **Python 3.x** (for the backend)
- **Node.js** and **npm/yarn** (for the frontend)
- **yt-dlp** (for downloading YouTube videos)

### Backend Requirements

- **FastAPI**: Web framework for building APIs.
- **yt-dlp**: Tool to download YouTube videos and track progress.
- **Uvicorn**: ASGI server to run FastAPI.

### Frontend Requirements

- **React**: Frontend framework for building the UI.
- **Vite**: Development server for React.

## Setup and Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-repository-directory>
```

### 2. Backend Setup (FastAPI + yt-dlp)

#### Step 1: Create and Activate a Virtual Environment (Optional but Recommended)

```bash
# For Linux/macOS:
python3 -m venv venv
source venv/bin/activate

# For Windows:
python -m venv venv
venv\Scripts\activate
```

#### Step 2: Install Dependencies

```bash
pip install fastapi yt-dlp uvicorn
```

#### Step 3: Run the Backend Server

Start the FastAPI server on `http://localhost:8000`:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Frontend Setup (React + Vite)

#### Step 1: Install Dependencies

```bash
# Inside the frontend directory
npm install
```

#### Step 2: Run the Frontend Development Server

Start the React development server:

```bash
npm run dev
```

The frontend should now be accessible on `http://localhost:5173`.

## Usage

1. **Open the frontend** in your browser at `http://localhost:5173`.
2. Input a valid **YouTube video URL** in the provided input field and press the download button.
3. The backend will stream download progress in real-time, and the frontend will update the UI accordingly.

### Endpoint: `/progress/`

**Method**: `GET`

**Parameters**:

- `url`: YouTube video URL to download.

**Example Request**:

bash
http://localhost:8000/progress/?url=https://youtu.be/dQw4w9WgXcQ

**Response**:

- The backend streams download progress as SSE events.
- On completion, it sends `"data: COMPLETE\n\n"`.
- If there's an error, it sends `"data: ERROR: <error_message>\n\n"`.

### CORS Configuration

If you're running the backend and frontend on different domains or ports (e.g., React frontend on `localhost:5173` and FastAPI backend on `localhost:8000`), you need to configure **CORS** to allow the frontend to communicate with the backend.

#### Adding CORS Middleware

Add the following code in your backend (FastAPI):

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust for your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Stopping the Server

To stop the FastAPI server, press `Ctrl + C` in the terminal where the server is running.

## Error Handling

- If an error occurs during the video download, the backend will send an error message to the frontend.
- Possible errors include invalid YouTube URLs or issues with the `yt-dlp` library.

## Deployment

To deploy this backend to a cloud service (like **AWS**, **Heroku**, **DigitalOcean**), follow the respective deployment guides. When deploying, make sure to:

- Set up proper **CORS configuration** for your production frontend.
- Ensure the server has internet access to download YouTube videos.

## License

This project is licensed under the **MIT License**.

---

### Notes

- **Repository URL**: Replace `<your-repository-url>` with the actual URL of your repository.
- **Folder Names**: Ensure that the folder names in the instructions match your actual project folder structure.
- **CORS Configuration**: If you're deploying the backend and frontend separately, make sure to adjust the CORS settings to allow the frontend URL.

### Instructions for Customization:

1. **Repository URL**: Make sure to replace `<your-repository-url>` with the actual URL of your repository.
2. **Frontend URL in CORS**: Update the URL in the CORS configuration (`allow_origins`) to match the URL of your frontend if it’s deployed or running on a different port.

This README now provides a unified and clear setup for both the backend and frontend, with clear steps to run the project locally or deploy it.
