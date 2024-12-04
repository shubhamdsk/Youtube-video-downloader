import React from "react";
import PropTypes from "prop-types";
function DownloadButton({ onClick }) {
  return (
    <button onClick={onClick} className="btn-download">Download</button>
  );
}
DownloadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default DownloadButton;
