from fastapi.responses import StreamingResponse
import yt_dlp
import asyncio
from utils import remove_ansi_codes  # Make sure this utility is defined correctly

async def download_progress_handler(progress, queue):
    """Push download progress into the queue."""
    if progress["status"] == "downloading":
        # Remove ANSI codes from the progress string to ensure clean output
        percent = remove_ansi_codes(progress.get("_percent_str", "0%")).strip()
        print(f"Download progress: {percent}")  # Debugging log
        await queue.put(f"data: {percent}\n\n")
    elif progress["status"] == "finished":
        print("Download complete!")  # Debugging log
        await queue.put("data: COMPLETE\n\n")
    else:
        print(f"Unknown status: {progress['status']}")  # Debugging log

async def start_download(url: str, request):
    """Start the download process and stream progress as SSE."""
    queue = asyncio.Queue()

    def progress_hook(progress):
        """Hook to push progress updates to the queue."""
        asyncio.create_task(download_progress_handler(progress, queue))

    async def stream():
        """Download the video and handle exceptions."""
        try:
            # yt-dlp options
            ydl_opts = {
                "format": "best",
                "progress_hooks": [progress_hook],  # Set progress hook
                "outtmpl": "%(title)s.%(ext)s",  # Output template for the file name
                "noplaylist": True,  # Avoid downloading playlists
            }
            print(f"Starting download for: {url}")  # Debugging log

            # Download video using yt-dlp
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])
        except Exception as e:
            # Handle any errors that occur during the download
            error_msg = f"ERROR: {str(e)}"
            print(error_msg)  # Debugging log
            await queue.put(f"data: {error_msg}\n\n")
        finally:
            # Close the event stream once download is complete or failed
            await queue.put("data: CLOSE\n\n")

    async def event_generator():
        """Generate SSE events from the download progress."""
        asyncio.create_task(stream())  # Start the stream asynchronously
        while True:
            if await request.is_disconnected():  # Check if the client disconnects
                print("Client disconnected.")  # Debugging log
                break
            data = await queue.get()  # Get data from the queue
            yield data

    # Return the streaming response with SSE
    return StreamingResponse(event_generator(), media_type="text/event-stream")
