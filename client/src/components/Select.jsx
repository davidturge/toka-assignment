import React from 'react';
import PropTypes from 'prop-types'

const Select = ({
  id,
  label,
  options,
  error,
  ...props
}) => {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...props}
      >
        <option value="">Select State</option>
        {options && options.map(([key, displayValue]) => (
          <option key={key} value={key}>
            {displayValue}
          </option>
        ))}
      </select>
      <div className="control-error">
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Select

Select.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string)
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
};
