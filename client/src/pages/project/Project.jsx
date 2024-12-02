import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useAddTask,
  useRemoveAllTasks,
  useRemoveTask, useResetTaskCount,
  useSetTaskCount,
  useSetTasks,
  useTaskCount,
  useTasks,
  useUpdateTask
} from '../../store/taskStore'
import { getProjectWithTasksApi } from '../../services/projects'
import TaskForm from './components/taskForm/TaskForm'
import { useOpenModal } from '../../store/modalStore'
import { useCurrentProject, useSetCurrentProject } from '../../store/projectsStore'
import styles from './Project.module.scss'
import useSocketMessage from '../../hooks/UseSocketMessage'
import { useShowSnackbar } from '../../store/snackbarStore'
import Spinner from '../../components/spinner/Spinner'
import { SpinnerSize } from '../../components/spinner/constants'
import Panel from '../../components/panel/Panel'
import TaskCards from './components/TaskCards'
import { useSetShowBackButton } from '../../store/navigationStore'

const Projects = () => {
  const { id: projectId } = useParams();
  const [isLoadingProjectWithTasks, setIsLoadingProjectWithTasks] = useState(false);
  const [fetchProjectWithTasksError, setFetchProjectWithTasksError] = useState(false);

  const tasks = useTasks();
  const addTask = useAddTask();
  const removeTask = useRemoveTask();
  const updateTask = useUpdateTask();
  const setTasks = useSetTasks();
  const removeAllTasks = useRemoveAllTasks();
  const setCurrentProject = useSetCurrentProject();
  const currentProject = useCurrentProject();
  const taskCount = useTaskCount();
  const setTaskCount = useSetTaskCount();
  const resetTaskCount = useResetTaskCount();

  const openModal  = useOpenModal();
  const showSnackbar = useShowSnackbar()
  const setShowBackButton = useSetShowBackButton();

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
        showSnackbar({ message: error.message, type: 'error' });
        setFetchProjectWithTasksError(true);
      } finally {
        setIsLoadingProjectWithTasks(false);
      }
    }
    fetchProjectWithTasks();

    return () => {
      removeAllTasks(projectId);
      resetTaskCount()
    };
  }, [projectId, removeAllTasks, setCurrentProject, setTasks, showSnackbar])

  useEffect(() => {
    setShowBackButton(true);
    return () => setShowBackButton(false);
  }, []);

  const taskMessageHandlers = {
    INSERT: (data) =>  addTask(data),
    UPDATE: (data) => updateTask(data),
    DELETE: ({_id: taskId, projectId}) => removeTask(projectId, taskId)
  };

  useSocketMessage('Task', taskMessageHandlers);

  const createTaskHandler = () => {
    openModal( <TaskForm projectId={projectId}/>)
  }

  return (
    <div id={styles['projects']}>
      {isLoadingProjectWithTasks || tasks === null ? (
        <Spinner size={SpinnerSize.LARGE} />
      ) : (
        <div className={styles['tasks-wrapper']}>
          <Panel
            title={currentProject.name}
            itemsCount={taskCount}
            createHandler={createTaskHandler}
          />
          <TaskCards
            key={projectId}
            values={tasks[projectId]}
            projectId={projectId}
          />
        </div>
      )}
    </div>
  );
}

export default Projects;
