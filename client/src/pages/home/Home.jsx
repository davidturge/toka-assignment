import React, { useEffect, useState } from 'react'
import { getAllProjectsApi } from '../../services/projects'
import ProjectForm from './components/ProjectForm/ProjectForm'
import {
  useAddProject, useProjectCount,
  useProjects,
  useRemoveProject, useSetProjectCount,
  useSetProjects,
  useUpdateProject
} from '../../store/projectsStore'
import { useOpenModal } from '../../store/modalStore'
import { useShowSnackbar } from '../../store/snackbarStore'
import EmptyProjectsView from './components/emptyProjectsView/EmptyProjectsView'
import ProjectCards from './components/ProjectCards'
import styles from './Home.module.scss'
import useSocketMessage from '../../hooks/UseSocketMessage'
import Spinner from '../../components/spinner/Spinner'
import { SpinnerSize } from '../../components/spinner/constants'
import Panel from '../../components/panel/Panel'

const Home = () => {
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [fetchProjectsError, setFetchProjectsError] = useState(false);

  const projects = useProjects();
  const addProject = useAddProject();
  const setProjects = useSetProjects();
  const removeProject = useRemoveProject();
  const updateProject = useUpdateProject();
  const projectCount = useProjectCount();
  const setProjectCount = useSetProjectCount();
  const openModal  = useOpenModal();
  const showSnackbar = useShowSnackbar();

  /**
   * Fetch the projects and init the project store
   */
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoadingProjects(true);
      try {
        const res = await getAllProjectsApi();
        setProjects(res);
        res && setProjectCount(res.length);
        setFetchProjectsError(false);
      } catch (error) {
        showSnackbar({ message: error.message, type: 'error' });
        setFetchProjectsError(true);
      } finally {
        setIsLoadingProjects(false);
      }

    }
    fetchProjects();
  }, [setProjects, showSnackbar]);


  const projectMessageHandlers  = {
    INSERT: (data) =>  addProject(data),
    UPDATE: (data) => updateProject(data),
    DELETE: ({_id: id}) => removeProject(id)
  }

  //Handle the socket message
  useSocketMessage('Project', projectMessageHandlers);

  const createProjectHandler = () => {
    openModal(<ProjectForm />)
  }

  if(fetchProjectsError) {
    return <EmptyProjectsView/>
  }

  return (
    <div id={styles['home']}>
      <div>
        <Panel
          title={'Projects'}
          createHandler={createProjectHandler}
          itemsCount={projectCount}
        />
        {isLoadingProjects || projects === null ? (
          <Spinner size={SpinnerSize.LARGE}/>
        ) : projects && Object.values(projects).length > 0 ? (
          <ProjectCards projects={Object.values(projects)}/>
        ) : (
          <EmptyProjectsView/>
        )}
      </div>
    </div>
  )
}

export default Home;
