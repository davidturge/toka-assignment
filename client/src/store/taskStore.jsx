import {create} from 'zustand';

/**
 * Tasks store, handles setting the tasks, adding a task, and removing a task.
 */
const useTaskStore = create((set) => ({
  tasks: null,
  taskCount: 0,
  setTasks: (tasks) => {
    set({ tasks });
  },
  setTaskCount: (count) =>
    set(() => ({
      taskCount: count >= 0 ? count : 0,
    })),
  resetTaskCount: () =>
    set(() => ({
      taskCount: 0, // Reset the count to the initial state
    })),
  addTask: (task) => {
    if (!task || !task.projectId) {
      console.error('Task must have a valid projectId.');
      return;
    }
    set((state) => ({
      tasks: {
        ...state.tasks,
        [task.projectId]: state.tasks[task.projectId]
          ? [...state.tasks[task.projectId], task]
          : [task],
      },
    }));
  },
  removeTask: (projectId, taskId) => {
    if (!projectId || !taskId) {
      console.error('Project ID and Task ID are required.');
      return;
    }
    set((state) => {
      if (!state.tasks[projectId]) {
        console.warn(`No tasks found for projectId: ${projectId}`);
        return state;
      }
      const updatedProjectTasks = state.tasks[projectId].filter(
        (task) => task._id !== taskId
      );
      return {
        tasks: {
          ...state.tasks,
          [projectId]: updatedProjectTasks,
        },
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

      const updatedProjectTasks = state.tasks[updatedTask.projectId].map((task) =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      );

      return {
        tasks: {
          ...state.tasks,
          [updatedTask.projectId]: updatedProjectTasks,
        },
      };
    });
  },
  removeAllTasks: () => {
    set({ tasks: {} });
  },
  incrementTaskCount: () =>
    set((state) => ({
      taskCount: state.taskCount + 1, // Increment the count
    })),
  decrementTaskCount: () =>
    set((state) => ({
      taskCount: state.taskCount > 0 ? state.taskCount - 1 : 0, // Decrement the count, ensuring it doesn't go below 0
    })),
}));

export const useTasks = () => useTaskStore((state) => state.tasks);
export const useTaskCount = () => useTaskStore((state) => state.taskCount);
export const useSetTasks = () => useTaskStore((state) => state.setTasks)
export const useAddTask = () => useTaskStore((state) => state.addTask)
export const useUpdateTask = () => useTaskStore((state) => state.updateTask)
export const useRemoveTask = () => useTaskStore((state) => state.removeTask);
export const useRemoveAllTasks = () => useTaskStore((state) => state.removeAllTasks);
export const useIncrementTaskCount = () => useTaskStore((state) => state.incrementTaskCount);
export const useDecrementTaskCount = () => useTaskStore((state) => state.decrementTaskCount);
export const useSetTaskCount = () => useTaskStore((state) => state.setTaskCount);
export const useResetTaskCount = () => useTaskStore((state) => state.resetTaskCount);
