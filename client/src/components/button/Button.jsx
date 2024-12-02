import React from "react";
import PropTypes from "prop-types";
import styles from './Button.module.scss';
import { ButtonType, DEFAULT_LOADING_LABEL } from './constants'
import { SpinnerSize } from '../spinner/constants'
import Spinner from '../spinner/Spinner'

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
      className={`${styles.tokaButton} ${styles[buttonType]} 
      ${isLoading ? styles.tokaButtonLoading : ""}`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading && <Spinner size={SpinnerSize.SMALL} isFullScreen={false}/>}
      <span className={styles.tokaButtonLabel}>
        {isLoading && loadingLabel ? loadingLabel : children}
      </span>
    </button>
  );
};

export default Button;

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
