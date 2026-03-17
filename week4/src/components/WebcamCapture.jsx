import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { addPhoto } from "./db";   // ⭐ NEW IMPORT

function WebcamCapture({ id, closeCamera }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  // Capture image from webcam
  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    setImgSrc(image);
  };

  // ⭐ Save photo to IndexedDB
  const savePhoto = async () => {
    await addPhoto(id, imgSrc);
    closeCamera(); // close webcam after saving
  };

  return (
    <div className="camera-popup">
      {/* Show webcam until a photo is taken */}
      {!imgSrc && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <button className="btn" onClick={capture}>Capture</button>
          <button className="btn" onClick={closeCamera}>Cancel</button>
        </>
      )}

      {/* After capturing, show preview */}
      {imgSrc && (
        <>
          <img src={imgSrc} alt="Captured" />
          <button className="btn" onClick={() => setImgSrc(null)}>Retake</button>

          {/* ⭐ NEW: Save Photo */}
          <button className="btn btn__primary" onClick={savePhoto}>
            Save Photo
          </button>

          <button className="btn" onClick={closeCamera}>Close</button>
        </>
      )}
    </div>
  );
}

export default WebcamCapture;
