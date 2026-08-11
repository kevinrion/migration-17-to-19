import React from 'react';

function SubmitButton({ label, disabled, onClick, type }) {
  var btnType = type || 'submit';

  return (
    <button
      type={btnType}
      className="btn btn-primary"
      disabled={disabled}
      onClick={onClick}
      style={{ marginRight: 8 }}
    >
      {label || 'Submit'}
    </button>
  );
}

export default SubmitButton;
