import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { createProjectApi, updateProjectApi } from '../../../../services/projects';
import useModalStore from '../../../../store/modalStore';
import useSnackbarStore from '../../../../store/snackbarStore';
import useSubmit from '../../../../hooks/useSubmit';
import Button from '../../../../components/button/Button';
import Input from '../../../../components/Input';
import * as formConstants from './constants'
import styles from './ProjectForm.module.scss';

const ProjectForm = ({
  id, name ='',
  description = '',
}) => {
  const [enteredValues, setEnteredValues] = useState({
    name: name,
    description: description,
  });
  const [didEdit, setDidEdit] = useState({
    name: false,
    description: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const closeModal  = useModalStore((state) => state.closeModal);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const nameIsInvalid = didEdit.name && !enteredValues.name.trim();
  const descriptionIsInvalid = didEdit.description && !enteredValues.description.trim();
  const hasEdited = Object.values(didEdit).every((edited) => edited);

  useEffect(() => {
    const allFieldsValid = !nameIsInvalid && !descriptionIsInvalid;
    if(id) {
      setIsFormValid(allFieldsValid && !hasEdited);
    } else {
      setIsFormValid(allFieldsValid && hasEdited);
    }
  }, [nameIsInvalid, descriptionIsInvalid, hasEdited]);

  const onSuccess = useCallback(() => {
    closeModal();
    showSnackbar({ message: 'Updated successfully', type: 'success' });
  }, [closeModal])

  const onFailure = useCallback(() => {
    closeModal();
  }, [closeModal])

  const { onSubmit } = useSubmit({
    apiFn: id ? updateProjectApi : createProjectApi,
    successCallback: onSuccess,
    failureCallback: onFailure,
  });

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
    <div className={styles['project-form-wrapper']}>
      <h2>{id ? 'Edit Project': 'Create Project'}</h2>
      <form onSubmit={onSubmit}>
        {id && <input
          type="hidden"
          name={formConstants.PROJECT_FORM_INPUT_ID}
          value={id}
        />}
        <Input
          label={formConstants.PROJECT_FORM_INPUT_LABEL_NAME}
          type="text"
          id={formConstants.PROJECT_FORM_INPUT_NAME}
          name={formConstants.PROJECT_FORM_INPUT_NAME}
          value={enteredValues.name}
          onBlur={() => handleBlurChange(formConstants.PROJECT_FORM_INPUT_NAME)}
          onChange={
            (event) => handleInputChange(formConstants.PROJECT_FORM_INPUT_NAME, event.target.value)
          }
          error={nameIsInvalid && 'this field is required'}
        />
        <Input
          label={formConstants.PROJECT_FORM_INPUT_LABEL_DESCRIPTION}
          type="text"
          id={formConstants.PROJECT_FORM_INPUT_DESCRIPTION}
          name={formConstants.PROJECT_FORM_INPUT_DESCRIPTION}
          value={enteredValues.description}
          onBlur={() => handleBlurChange(formConstants.PROJECT_FORM_INPUT_DESCRIPTION)}
          onChange={
            (event) => handleInputChange(formConstants.PROJECT_FORM_INPUT_DESCRIPTION, event.target.value)
          }
          error={descriptionIsInvalid && 'this field is required'}
        />
        <Button
          type="submit"
          disabled={!isFormValid}>
          {
            id ?
              formConstants.PROJECT_FORM_SUBMIT_BUTTON_EDIT :
              formConstants.PROJECT_FORM_SUBMIT_BUTTON_CREATE
          }
        </Button>
      </form>
    </div>
  );
};

ProjectForm.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  isEdit: PropTypes.bool,
};

export default ProjectForm;
