import React from "react";
import Spinner from "../Spinner/Spinner";
import PropTypes from "prop-types";
import styles from './Button.module.scss';
import { ButtonType, DEFAULT_LOADING_LABEL } from './constants'
import { SpinnerSize } from '../Spinner/constants'

const Button = ({
  onClick,
  isLoading = true,
  loadingLabel = DEFAULT_LOADING_LABEL,
  disabled = false,
  children,
  type = ButtonType.PRIMARY // Additional prop for variants like primary, secondary
}) => {
  return (
    <button
      className={`${styles.tokaButton} ${styles[type]} ${
        isLoading ? styles.tokaButtonLoading : ""
      }`}
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

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  loadingLabel: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(Object.values(ButtonType)),
};

export default Button;
