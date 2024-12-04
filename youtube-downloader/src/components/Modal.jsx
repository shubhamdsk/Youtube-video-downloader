import React from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";
import "../App.css";

function Modal({ isOpen, isDownloading, isComplete, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {isDownloading && (
          <>
            <h2 className="modal-text">Downloading...</h2>
            <Loader />
          </>
        )}
        {isComplete && (
          <>
            <h2 className="modal-success-text">Download Successful!</h2>
            <button onClick={onClose} className="modal-button">
              Ok
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Define PropTypes
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isDownloading: PropTypes.bool,
  isComplete: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

// Default Props
Modal.defaultProps = {
  isDownloading: false,
  isComplete: false,
};

export default Modal;
