import React from 'react';
import './FormField.css';

function FormField({ label, id, type, value, onChange, placeholder, required, rows }) {
  const inputProps = {
    id,
    name: id,
    value,
    onChange,
    placeholder,
    required,
  };

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? (
        <textarea {...inputProps} rows={rows || 4} />
      ) : (
        <input type={type || 'text'} {...inputProps} />
      )}
    </div>
  );
}

export default FormField;
