import { create } from 'zustand';

/**
 * Check tasks is not empty and return the number of tasks
 */
const getTaskCount = (tasks) => {
  return tasks &&
  Object.keys(tasks).length > 0 &&
  Array.isArray(Object.values(tasks)[0])
    ? Object.values(tasks)[0].length
    : 0
}

/**
 * Tasks store, handles setting the tasks, adding a task, and removing a task.
 */
const useTaskStore = create((set) => ({
  tasks: null,
  filteredTasks: null,
  taskCount: 0,
  setTasks: (tasks) => {
    set({
      tasks: {...tasks},
      filteredTasks: {...tasks},
      taskCount: getTaskCount(tasks),
    });
  },
  setFilteredTasks: (filteredTasks) => {
    set({ filteredTasks, taskCount: getTaskCount(filteredTasks) });
  },
  setTaskCount: (count) =>
    set(() => ({
      taskCount: count >= 0 ? count : 0,
    })),
  resetTaskCount: () =>
    set(() => ({
      taskCount: 0,
    })),
  addTask: (task) => {
    if (!task || !task.projectId) {
      console.error('Task must have a valid projectId.');
      return;
    }
    set((state) => {
      const updatedTasks = {
        ...state.tasks,
        [task.projectId]: state.tasks[task.projectId]
          ? [...state.tasks[task.projectId], task]
          : [task],
      };

      const updatedFilteredTasks = {
        ...state.filteredTasks,
        [task.projectId]: state.filteredTasks[task.projectId]
          ? [...state.filteredTasks[task.projectId], task]
          : [task],
      };

      return {
        tasks: updatedTasks,
        filteredTasks: updatedFilteredTasks,
      };
    });
  },
  removeTask: (projectId, taskId) => {
    if (!projectId || !taskId) {
      console.error('Project ID and Task ID are required.');
      return;
    }
    set((state) => {
      if (!state.tasks[projectId]) {
        return state;
      }

      const updatedTasks = {
        ...state.tasks,
        [projectId]: state.tasks[projectId].filter((task) => task._id !== taskId),
      };

      const updatedFilteredTasks = {
        ...state.filteredTasks,
        [projectId]: state.filteredTasks[projectId].filter((task) => task._id !== taskId),
      };

      return {
        tasks: updatedTasks,
        filteredTasks: updatedFilteredTasks,
      };
    });
  },
  updateTask: (updatedTask) => {
    if (!updatedTask) {
      console.error('Task not valid.');
      return;
    }

    set((state) => {
      if (!state.tasks[updatedTask.projectId]) {
        console.warn(`No tasks found for projectId: ${updatedTask.projectId}`);
        return state;
      }

      const updatedTasks = {
        ...state.tasks,
        [updatedTask.projectId]: state.tasks[updatedTask.projectId].map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        ),
      };

      const updatedFilteredTasks = {
        ...state.filteredTasks,
        [updatedTask.projectId]: state.filteredTasks[updatedTask.projectId].map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        ),
      };

      return {
        tasks: updatedTasks,
        filteredTasks: updatedFilteredTasks,
      };
    });
  },
  removeAllTasks: () => {
    set({
      tasks: {},
      filteredTasks: {},
    });
  },
  incrementTaskCount: () =>
    set((state) => ({
      taskCount: state.taskCount + 1,
    })),
  decrementTaskCount: () =>
    set((state) => ({
      taskCount: state.taskCount > 0 ? state.taskCount - 1 : 0,
    })),
}));

// Hooks for accessing the store
export const useTasks = () => useTaskStore((state) => state.tasks);
export const useFilteredTasks = () => useTaskStore((state) => state.filteredTasks);
export const useTaskCount = () => useTaskStore((state) => state.taskCount);
export const useSetTasks = () => useTaskStore((state) => state.setTasks);
export const useSetFilteredTasks = () => useTaskStore((state) => state.setFilteredTasks);
export const useAddTask = () => useTaskStore((state) => state.addTask);
export const useUpdateTask = () => useTaskStore((state) => state.updateTask);
export const useRemoveTask = () => useTaskStore((state) => state.removeTask);
export const useRemoveAllTasks = () => useTaskStore((state) => state.removeAllTasks);
export const useIncrementTaskCount = () => useTaskStore((state) => state.incrementTaskCount);
export const useDecrementTaskCount = () => useTaskStore((state) => state.decrementTaskCount);
export const useSetTaskCount = () => useTaskStore((state) => state.setTaskCount);
export const useResetTaskCount = () => useTaskStore((state) => state.resetTaskCount);

export default useTaskStore;
