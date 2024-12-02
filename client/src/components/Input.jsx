import React from 'react'
import PropTypes from 'prop-types'

const Input = ({label, id, error, ...props}) => {
  return (
    <div className='control'>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props}/>
      <div className='control-error'>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  error: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;

