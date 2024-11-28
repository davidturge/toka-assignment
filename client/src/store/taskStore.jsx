import {create} from 'zustand';

/**
 * Tasks store, handles setting the tasks, adding a task, and removing a task.
 * @type {UseBoundStore<Mutate<StoreApi<{setTasks: function(*, *): void, removeTask: function(*, *): void, removeAllTasks: function(): void, tasks: {}, addTask: function(*): void}>, []>>}
 */
const useTaskStore = create((set) => ({
  tasks: {},
  setTasks: (tasks) => {
    set({ tasks });
  },
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
  removeAllTasks: () => {
    set({ tasks: {} });
  },
}));

export const useTasks = () => useTaskStore((state) => state.tasks);
export const useSetTasks = () => useTaskStore((state) => state.setTasks)
export const useAddTask = () => useTaskStore((state) => state.addTask)
export const useRemoveTask = () => useTaskStore((state) => state.removeTask);
export const useRemoveAllTasks = () => useTaskStore((state) => state.removeAllTasks);
