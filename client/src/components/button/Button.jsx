import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import { ButtonType, DEFAULT_LOADING_LABEL } from './constants'

const Button = ({
  onClick,
  isLoading = false,
  loadingLabel = DEFAULT_LOADING_LABEL,
  disabled = false,
  buttonType = ButtonType.PRIMARY,
  children,
}) => {
  return (
    <button
      className={`${styles['toka-button']} ${styles[buttonType]} 
      ${isLoading ? styles['toka-button-loading'] : ''}`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      <span className={styles['button-label']}>
        {isLoading && loadingLabel ? loadingLabel : children}
      </span>
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingLabel: PropTypes.string,
  padding: PropTypes.string,
  fontSize:PropTypes.string,
  buttonType: PropTypes.oneOf(Object.values(ButtonType)),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
