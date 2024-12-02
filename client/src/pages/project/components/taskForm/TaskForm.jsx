import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createTaskApi, updateTaskApi } from '../../../../services/tasks';
import { useCloseModal } from '../../../../store/modalStore';
import { useShowSnackbar } from '../../../../store/snackbarStore';
import useSubmit from '../../../../hooks/useSubmit'
import Button from '../../../../components/button/Button'
import Input from '../../../../components/Input'
import Select from '../../../../components/Select'
import { formatDate } from '../../../../utils/util';
import styles from './TaskForm.module.scss';
import { taskStates } from '../../constants'
import * as formConstants from './constants';
import { SnackbarType } from '../../../../components/snackbar/constants'
import { GENERIC_ERROR_MSG, UPDATE_SUCCESSFULLY_MSG } from '../../../../constants'

const TaskForm = ({
  taskId,
  projectId ,
  state = '',
  dueDate = '',
  notes = ''
}) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const [enteredValues, setEnteredValues] = useState({
    state: state,
    projectId: projectId,
    dueDate: formatDate(dueDate),
    notes: notes
  });

  const [didEdit, setDidEdit] = useState({
    state: false,
    dueDate: false,
    notes: false
  });

  const showSnackbar = useShowSnackbar();
  const closeModal  = useCloseModal();

  const onSuccess = useCallback(() => {
    showSnackbar({ message: UPDATE_SUCCESSFULLY_MSG, type: SnackbarType.SUCCESS });
    closeModal();
  }, [closeModal]);

  const onFailure = useCallback(() => {
    showSnackbar({ message: GENERIC_ERROR_MSG, type: SnackbarType.ERROR });
    closeModal();
  }, [closeModal]);

  const { onSubmit } = useSubmit({
    apiFn: taskId ? updateTaskApi : createTaskApi,
    successCallback: onSuccess,
    failureCallback: onFailure,
  });

  const stateIsInvalid = didEdit.state && !enteredValues.state;
  const dueDateIsInvalid = didEdit.dueDate && !enteredValues.dueDate;
  const notesIsInvalid = didEdit.notes && !enteredValues.notes.trim();
  const hasEdited = Object.values(didEdit).every((edited) => edited);

  useEffect(() => {
    const allFieldsValid = !stateIsInvalid && !dueDateIsInvalid && !notesIsInvalid;
    if(taskId) {
      setIsFormValid(allFieldsValid && !hasEdited);
    } else {
      setIsFormValid(allFieldsValid && hasEdited);
    }
  }, [stateIsInvalid, dueDateIsInvalid, notesIsInvalid, hasEdited]);


  const handleInputChange = (identifier, value) => {
    setEnteredValues(prevState => ({
      ...prevState,
      [identifier]: value
    }));
    //Reset the check
    setDidEdit(prevState => ({
      ...prevState,
      [identifier]: false
    }));
  }

  const handleBlurChange = (identifier) => {
    setDidEdit(prevState => ({
      ...prevState,
      [identifier]: true
    }));
  }

  return (
    <div className={styles['task-form-wrapper']}>
      <h2>{taskId ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={onSubmit}>
        {taskId && <input
          type="hidden"
          name={formConstants.TASK_FORM_INPUT_ID}
          value={taskId}
        />}
        <input
          type="hidden"
          name={formConstants.TASK_FORM_INPUT_PROJECT_ID}
          value={projectId}
        />
        <Select
          label={formConstants.TASK_FORM_INPUT_LABEL_STATE}
          id={formConstants.TASK_FORM_INPUT_STATE}
          name={formConstants.TASK_FORM_INPUT_STATE}
          value={enteredValues.state}
          options={Object.entries(taskStates)}
          onBlur={() => handleBlurChange(formConstants.TASK_FORM_INPUT_STATE)}
          onChange={(event) => handleInputChange(formConstants.TASK_FORM_INPUT_STATE, event.target.value)}
          error={stateIsInvalid && 'this field is required'}
        />
        <Input
          label={formConstants.TASK_FORM_INPUT_LABEL_DUE_DATE}
          type="date"
          id={formConstants.TASK_FORM_INPUT_DUE_DATE}
          name={formConstants.TASK_FORM_INPUT_DUE_DATE}
          value={enteredValues.dueDate}
          onBlur={() => handleBlurChange(formConstants.TASK_FORM_INPUT_DUE_DATE)}
          onChange={(event) => handleInputChange(formConstants.TASK_FORM_INPUT_DUE_DATE, event.target.value)}
          error={dueDateIsInvalid && 'this field is required'}
        />
        <Input
          label={formConstants.TASK_FORM_INPUT_LABEL_NOTES}
          type="text"
          id={formConstants.TASK_FORM_INPUT_NOTES}
          name={formConstants.TASK_FORM_INPUT_NOTES}
          value={enteredValues.notes}
          onBlur={() => handleBlurChange(formConstants.TASK_FORM_INPUT_NOTES)}
          onChange={(event) => handleInputChange(formConstants.TASK_FORM_INPUT_NOTES, event.target.value)}
          error={notesIsInvalid && 'this field is required'}
        />
        <Button
          type="submit"
          disabled={!isFormValid}>
          {
            taskId ?
              formConstants.TASK_FORM_SUBMIT_BUTTON_EDIT :
              formConstants.TASK_FORM_SUBMIT_BUTTON_CREATE
          }
        </Button>
      </form>
    </div>

  );
};

TaskForm.propTypes = {
  taskId: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  state: PropTypes.oneOf(Object.keys(taskStates)),
  dueDate: PropTypes.string,
  notes: PropTypes.string,
};

export default TaskForm;
