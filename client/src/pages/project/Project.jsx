import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useTaskStore from '../../store/taskStore'
import { getProjectWithTasksApi } from '../../services/projects'
import TaskForm from './components/taskForm/TaskForm'
import { useOpenModal } from '../../store/modalStore'
import { useCurrentProject, useSetCurrentProject } from '../../store/projectsStore'
import styles from './Project.module.scss'
import useSocketMessage from '../../hooks/UseSocketMessage'
import { useShowSnackbar } from '../../store/snackbarStore'
import Spinner from '../../components/spinner/Spinner'
import { SpinnerSize } from '../../components/spinner/constants'
import TaskCards from './components/TaskCards'
import useNavigationStore from '../../store/navigationStore'
import { searchTasksApi } from '../../services/tasks'
import EmptyTasksView from './components/emptyTasksView/EmptyTasksView'
import { SnackbarType } from '../../components/snackbar/constants'

const Projects = () => {
  const { id: projectId } = useParams();
  const [isLoadingProjectWithTasks, setIsLoadingProjectWithTasks] = useState(false);
  const [fetchProjectWithTasksError, setFetchProjectWithTasksError] = useState(false);

  //Tasks store actions
  const {
    filteredTasks,
    addTask,
    removeTask,
    updateTask,
    setTasks,
    removeAllTasks,
    taskCount,
    setTaskCount,
    resetTaskCount,
    setFilteredTasks,
    decrementTaskCount,
    incrementTaskCount
  } = useTaskStore();


  const currentProject = useCurrentProject();
  const setCurrentProject = useSetCurrentProject();

  //Navigation store actions
  const { setShowBackButton, setSearchOptions, setCreateItemHandler } = useNavigationStore();

  const openModal  = useOpenModal();
  const showSnackbar = useShowSnackbar()

  const createTaskHandler = () => {
    openModal( <TaskForm projectId={projectId}/>)
  }

  //Fetch the current project and tasks and init the project store
  useEffect(() => {
    const fetchProjectWithTasks = async () => {
      setIsLoadingProjectWithTasks(true);
      try {
        const {project, tasks} = await getProjectWithTasksApi(projectId);
        setCurrentProject(project);
        setTasks(tasks);
        tasks[projectId] && setTaskCount(tasks[projectId].length);
        setFetchProjectWithTasksError(false)
      } catch (error) {
        showSnackbar({ message: error.message, type: SnackbarType.ERROR });
        setFetchProjectWithTasksError(true);
      } finally {
        setIsLoadingProjectWithTasks(false);
      }
    }
    fetchProjectWithTasks();

    return () => {
      removeAllTasks();
      resetTaskCount()
    };
  }, [projectId, removeAllTasks, setCurrentProject, setTasks, showSnackbar])

  useEffect(() => {
    setShowBackButton(true);
    setCreateItemHandler(createTaskHandler);
    setSearchOptions({type:'tasks', api: searchTasksApi, handler : setFilteredTasks});

    return () => setShowBackButton(false);
  }, []);

  const taskMessageHandlers = {
    INSERT: (data) =>  {
      incrementTaskCount();
      addTask(data);
    },
    UPDATE: (data) => updateTask(data),
    DELETE: ({_id: taskId, projectId}) => {
      removeTask(projectId, taskId);
      decrementTaskCount();
    }
  };

  useSocketMessage('Task', taskMessageHandlers);

  if(fetchProjectWithTasksError) {
    return <EmptyTasksView/>
  }

  return (
    <div id={styles['tasks']}>
      {isLoadingProjectWithTasks || filteredTasks === null ? (
        <Spinner size={SpinnerSize.LARGE}/>
      ) : (
        <>
          <h1>{currentProject.name} <span>({taskCount})</span></h1>
          <div className={styles['tasks-wrapper']}>
            <TaskCards
              key={projectId}
              values={filteredTasks[projectId]}
              projectId={projectId}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Projects;
