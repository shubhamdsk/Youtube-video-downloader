import React from "react";
import PropTypes from "prop-types";

function InputField({ value, onChange, error }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        width: "80%",
        margin: "0 auto",
      }}
    >
      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          border: error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
        }}
      />

      {/* Error Message */}
      <div
        style={{
          height: "20px", // Fixed height to prevent layout shift
          marginBottom: "10px", // Space between error message and button
        }}
      >
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "0.9rem",
              margin: 0,
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

// Define PropTypes for InputField
InputField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

// Default props for optional values
InputField.defaultProps = {
  error: "",
};

export default InputField;
