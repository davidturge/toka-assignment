import React, { useCallback, useState } from 'react'
import Card from '../../../../components/card/Card'
import { PencilCircle, Trash } from '@phosphor-icons/react'
import { deleteTaskApi } from '../../../../services/tasks'
import ConfirmationModal from '../../../../components/modals/confirm-modal/ConfirmationModal'
import TaskForm from '../taskForm/TaskForm'
import { useShowSnackbar } from '../../../../store/snackbarStore'
import { useCloseModal, useOpenModal } from '../../../../store/modalStore'
import { formatDate } from '../../../../utils/util'
import { taskStates, taskStatesClass } from '../../constants'
import styles from './TaskCard.module.scss'
import PropTypes from 'prop-types'

const TaskCard = ({
  taskId,
  name,
  notes,
  state,
  dueDate,
  projectId,
  isRow
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);

  const showSnackbar = useShowSnackbar();
  const openModal = useOpenModal();
  const closeModal = useCloseModal();

  const deleteTaskHandler = useCallback(
    async (id) => {
      setIsDeletingTask(true);
      try {
        await deleteTaskApi(id);
        showSnackbar({ message: 'Successfully deleted', type: 'success' });
      } catch (error) {
        showSnackbar({ message: 'Unable to delete the item. Please check and try again.', type: 'error' });
      } finally {
        closeModal();
        setIsDeletingTask(false);
      }
    },
    [deleteTaskApi, showSnackbar, closeModal]
  );

  const onDeleteButtonClicked = useCallback(
    (id) => {
      openModal(
        <ConfirmationModal
          isLoading={isDeletingTask}
          onConfirm={() => deleteTaskHandler(id)}
          onCancel={closeModal}
          message={'Are you sure you want to delete this task?'}
          title={'Delete Task'}
        />
      );
    },
    [openModal, closeModal, deleteTaskHandler]
  );

  const updateTaskHandler = useCallback(
    (props) => {
      openModal(<TaskForm {...{ ...props, projectId }} />);
    },
    [openModal, projectId]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return  (
    <div className={styles['card-wrapper']}>
      <Card
        isRow={isRow}
        content={
          <div className={styles['card-content']}>
            <div className={`${styles['card-row']} ${styles['position-end']}`}>
              <h2 className={styles['title']}>{name}</h2>
              <div className={`${styles['state']} ${styles[taskStatesClass[state]]}`}>{taskStates[state]}</div>
            </div>
            <div className={`${styles['card-row']} ${styles['position-start']}`}>
              <p className={styles['notes']}>{notes}</p>
            </div>
            <div className={`${styles['card-row']} ${styles['position-end']}`}>
              <div className={styles['date']}>{formatDate(dueDate, 'DD-MM-YYYY')}</div>
              <div className={styles['card-actions']}
                   style={{
                     opacity: isHovered ? 1 : 0
                   }}>
                <PencilCircle size={28} onClick={() => updateTaskHandler({ taskId, notes, state, dueDate })}/>
                <Trash size={28} onClick={() => onDeleteButtonClicked(taskId)}/>
              </div>
            </div>
          </div>
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}/>
    </div>
  )
}

export default TaskCard

TaskCard.propTypes = {
  taskId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  notes: PropTypes.string,
  state: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  isRow: PropTypes.bool.isRequired
};
