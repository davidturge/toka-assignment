import React from "react";
import ReactDOM from "react-dom";
import styles from './Modal.module.scss';
import useModalStore from '../../../store/modalStore'

const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModalStore();

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles['modal-overlay']}>
      <div className={styles.modal}>
        <button className={styles['modal-close']} onClick={closeModal}>
          &times;
        </button>
         <div className={styles['modal-content']}>{modalContent}</div>
       </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
