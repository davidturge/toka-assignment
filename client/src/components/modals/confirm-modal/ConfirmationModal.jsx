import React from 'react';
import PropTypes from 'prop-types'
import Button from '../../button/Button'
import styles from './ConfirmModal.module.scss'
import { useIsModalLoading } from '../../../store/modalStore'

const ConfirmationModal = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  const isModalLoading = useIsModalLoading();
  return (
    <div className={styles['confirm-modal']}>
      <div className={styles['confirm-modal-header']}>
        <h2>{title}</h2>
      </div>
      <div className={styles['confirm-modal-content']}>
        <p>{message}</p>
      </div>
      <div className={styles['confirm-modal-actions']}>
        <Button isLoading={isModalLoading} onClick={onConfirm}>Confirm</Button>
        <Button buttonType="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal
