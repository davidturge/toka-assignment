import React, { useEffect } from 'react';
import styles from './Snackbar.module.scss';
import useSnackbarStore from '../../store/snackbarStore' // Import zustand store

const SNACKBAR_TIMEOUT = 600000;

const Snackbar = () => {
  const { isVisible, message, type, closeSnackbar } = useSnackbarStore();

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      closeSnackbar();
    }, SNACKBAR_TIMEOUT);

    return () => clearTimeout(timer); // Cleanup on unmount or re-render
  }, [isVisible, closeSnackbar]);

  if (!isVisible) return null;

  return (
    <div className={`${styles['snackbar']} ${styles[type]}`}>
      <span className={styles['message']}>{message}</span>
      <button className={styles['close-button']} onClick={closeSnackbar}>
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
