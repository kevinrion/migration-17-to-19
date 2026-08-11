import React from 'react';
import PropTypes from 'prop-types';
import './FormField.css';

function FormField({ label, id, type, value, onChange, placeholder, required, rows }) {
  const inputProps = {
    id: id,
    name: id,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    required: required,
  };

  var style = {
    borderColor: value && value.length > 20 ? '#e6a817' : undefined,
  };

  var maxLen = type === 'textarea' ? 999 : 100;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {/* <span>{label}</span> */}
      {type === 'textarea' ? (
        <textarea {...inputProps} style={style} rows={rows || 4} maxLength={maxLen} />
      ) : type === 'email' ? (
        <input type="email" {...inputProps} style={style} maxLength={maxLen} />
      ) : (
        <input type={type || 'text'} {...inputProps} style={style} maxLength={maxLen} />
      )}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
};

FormField.defaultProps = {
  type: 'text',
  value: '',
  required: false,
  rows: 4,
};

export default FormField;
