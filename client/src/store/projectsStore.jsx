import {create} from 'zustand';

/**
 * Project store, handles setting the projects, adding a project, and removing a project.
 */

const useProjectStore = create((set) => ({
  projects: null,
  currentProject: null,
  projectCount: 0,
  setProjects: (projectsArray) => {
    const projects = projectsArray.reduce((acc, project) => {
      acc[project._id] = project;
      return acc;
    }, {});
    set({ projects });
  },
  setProjectCount: (count) =>
    set(() => ({
      projectCount: count >= 0 ? count : 0,
    })),
  setCurrentProject: (project) => {
    set({ currentProject: project });
  },
  resetProjectCount: () =>
    set(() => ({
      projectCount: 0, // Reset the count to the initial state
    })),
  updateProject: (updatedProject) =>
    set((state) => {
      return {
        projects: {
          ...state.projects,
          [updatedProject._id]: {
            ...state.projects[updatedProject._id],
            ...updatedProject,
          },
        },
      };
    }),
  addProject: (project) =>
    set((state) => {
      return {
        projects: {
          ...state.projects,
          [project._id]: project,
        },
      };
    }),
  removeProject: (id) =>
    set((state) => {
      const updatedProjects = { ...state.projects };
      delete updatedProjects[id];
      return { projects: updatedProjects };
    }),
  incrementProjectCount: () =>
    set((state) => ({
      projectCount: state.projectCount + 1, // Increment the count
    })),
  decrementProjectCount: () =>
    set((state) => ({
      projectCount: state.projectCount > 0 ? state.projectCount - 1 : 0, // Decrement the count, ensuring it doesn't go below 0
    })),
}));

export const useProjects = () => useProjectStore((state) => state.projects);
export const useCurrentProject = () => useProjectStore((state) => state.currentProject);
export const useProjectCount = () => useProjectStore((state) => state.projectCount);
export const useSetProjects = () => useProjectStore((state) => state.setProjects)
export const useSetCurrentProject = () => useProjectStore((state) => state.setCurrentProject)
export const useAddProject = () => useProjectStore((state) => state.addProject)
export const useRemoveProject = () => useProjectStore((state) => state.removeProject);
export const useUpdateProject = () => useProjectStore((state) => state.updateProject);
export const useIncrementProjectCount = () => useProjectStore((state) => state.incrementProjectCount);
export const useDecrementProjectCount = () => useProjectStore((state) => state.decrementProjectCount);
export const useSetProjectCount = () => useProjectStore((state) => state.setProjectCount);
export const useResetProjectCount = () => useProjectStore((state) => state.resetProjectCount);
