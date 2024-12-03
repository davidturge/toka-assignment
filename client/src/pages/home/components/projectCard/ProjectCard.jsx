import React, { useCallback, useState } from 'react'
import { PencilCircle, Trash } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { deleteProjectApi } from '../../../../services/projects'
import useModalStore from '../../../../store/modalStore'
import Card from '../../../../components/card/Card'
import ProjectForm from '../ProjectForm/ProjectForm'
import { calcDateFromNow } from '../../../../utils/util'
import ConfirmationModal from '../../../../components/modals/confirm-modal/ConfirmationModal'
import { useShowSnackbar } from '../../../../store/snackbarStore'
import styles from './ProjectCard.module.scss';
import { SnackbarType } from '../../../../components/snackbar/constants'
import { DELETE_ERROR_MSG, DELETE_SUCCESSFULLY_MSG } from '../../../../constants'

const ProjectCard = ({
  _id: projectId,
  name,
  description,
  updatedAt
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const showSnackbar = useShowSnackbar();

  const { openModal, closeModal, setIsModalLoading}  = useModalStore()

  const deleteProjectHandler = useCallback(
    async (id) => {
      setIsModalLoading(true);
      try {
        await deleteProjectApi(id);
        showSnackbar({ message: DELETE_SUCCESSFULLY_MSG, type: SnackbarType.SUCCESS });
      } catch (error) {
        showSnackbar({ message: DELETE_ERROR_MSG, type: SnackbarType.Error });
      } finally {
        setIsModalLoading(false);
        closeModal();
      }
    },
    [showSnackbar, closeModal, setIsModalLoading]
  );

  const onDeleteButtonClicked = useCallback(async(evt, id) => {
    evt.stopPropagation();
    openModal(
      <ConfirmationModal
        onConfirm={() => deleteProjectHandler(id)}
        onCancel={closeModal}
        message={'Are you sure you want to delete this project?'}
        title={'Delete Project'}
      />
    )
  },[openModal, closeModal, deleteProjectHandler]);

  const editProjectHandler = async(evt) => {
    evt.stopPropagation();
    openModal( <ProjectForm description={description} name={name} id={projectId} />);
  }

  const onClickProject = async(id) => {
    navigate(`/project/${id}`)
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      header={<h2 className={styles['title']}>{name}</h2>}
      content={<div className={styles['description']}>{description}</div>}
      footer={
        <div className={styles['footer-inner-wrapper']}>
          <div className={styles['card-last-update']}>
            {calcDateFromNow(updatedAt)}
          </div>
          <div className={styles['card-actions']}
               style={{
                  opacity: isHovered ? 1 : 0
               }}>
            <PencilCircle size={28}  onClick={(evt) => editProjectHandler(evt)}/>
            <Trash size={28} onClick={(evt) => onDeleteButtonClicked(evt, projectId)} />
          </div>
        </div>
      }
      onClick={() => onClickProject(projectId)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
    </Card>
  )
};

ProjectCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  updatedAt: PropTypes.string.isRequired
};

export default ProjectCard;
