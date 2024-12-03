import React, { useEffect, useState } from 'react'
import { getAllProjectsApi, searchProjectsApi } from '../../services/projects'
import ProjectForm from './components/ProjectForm/ProjectForm'
import useProjectStore from '../../store/projectsStore'
import { useOpenModal } from '../../store/modalStore'
import { useShowSnackbar } from '../../store/snackbarStore'
import EmptyProjectsView from './components/emptyProjectsView/EmptyProjectsView'
import ProjectCards from './components/ProjectCards'
import styles from './Home.module.scss'
import useSocketMessage from '../../hooks/UseSocketMessage'
import Spinner from '../../components/spinner/Spinner'
import { SpinnerSize } from '../../components/spinner/constants'
import useNavigationStore from '../../store/navigationStore'
import { SnackbarType } from '../../components/snackbar/constants'
import { EntityType, GENERIC_ERROR_MSG } from '../../constants'

const Home = () => {
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [fetchProjectsError, setFetchProjectsError] = useState(false);

  //Project store actions
  const {
    filteredProjects,
    setProjects,
    addProject,
    removeProject,
    updateProject,
    projectCount,
    setFilteredProjects,
    incrementProjectCount,
    decrementProjectCount
  } = useProjectStore();

  const { setSearchOptions, setCreateItemHandler } = useNavigationStore();
  const openModal  = useOpenModal();
  const showSnackbar = useShowSnackbar();

  const createProjectHandler = () => {
    openModal(<ProjectForm />)
  }

  //Fetch the projects and init the project store
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoadingProjects(true);
      try {
        const res = await getAllProjectsApi();
        setProjects(res);
        setFetchProjectsError(false);
      } catch (error) {
        showSnackbar({ message: GENERIC_ERROR_MSG, type: SnackbarType.ERROR });
        setFetchProjectsError(true);
      } finally {
        setIsLoadingProjects(false);
      }
    }
    fetchProjects();
  }, [setProjects, showSnackbar]);


  useEffect(() => {
    setCreateItemHandler(createProjectHandler);
    setSearchOptions({
      type: EntityType.PROJECT,
      api: searchProjectsApi,
      handler : setFilteredProjects
    })
  }, [setCreateItemHandler, setSearchOptions])

  const projectMessageHandlers  = {
    INSERT: (data) =>  {
      addProject(data);
      incrementProjectCount();
    },
    UPDATE: (data) => updateProject(data),
    DELETE: ({_id: id}) => {
      removeProject(id);
      decrementProjectCount();
    }
  }

  //Handle the socket message
  useSocketMessage(EntityType.PROJECT, projectMessageHandlers);

  if(fetchProjectsError) {
    return <EmptyProjectsView/>
  }

  return (
    <div id={styles['home']}>
      <h1>{'Projects'} <span>({projectCount})</span></h1>
      <div className={styles['projects-wrapper']}>
        {isLoadingProjects || !filteredProjects ? (
          <Spinner size={SpinnerSize.LARGE}/>
        ) : filteredProjects && Object.values(filteredProjects).length > 0 ? (
          <ProjectCards projects={Object.values(filteredProjects)}/>
        ) : (
          <EmptyProjectsView/>
        )}
      </div>
    </div>
  )
}

export default Home;
