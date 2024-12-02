import {create} from 'zustand';

/**
 * Project store, handles setting the projects, adding a project, and removing a project.
 */

const createProjectsMap = (projectsArray) => projectsArray.reduce((acc, project) => {
  acc[project._id] = project;
  return acc;
}, {});

const useProjectStore = create((set) => ({
  projects: null,
  currentProject: null,
  projectCount: 0,
  filteredProjects: null,
  setProjects: (projectsArray) => {
    const projects = createProjectsMap(projectsArray);
    set({ projects, filteredProjects: projects });
  },
  setFilteredProjects: (results) => set({ filteredProjects: createProjectsMap(results) }),
  setProjectCount: (count) =>
    set(() => ({
      projectCount: count >= 0 ? count : 0,
    })),
  setCurrentProject: (project) => {
    set({ currentProject: project });
  },
  resetProjectCount: () =>
    set(() => ({
      projectCount: 0,
    })),
  updateProject: (updatedProject) =>
    set((state) => {
      const updatedProjects = {
        ...state.projects,
        [updatedProject._id]: {
          ...state.projects[updatedProject._id],
          ...updatedProject,
        },
      };

      const updatedFilteredProjects = {
        ...state.filteredProjects,
        [updatedProject._id]: {
          ...state.filteredProjects[updatedProject._id],
          ...updatedProject,
        },
      };

      return {
        projects: updatedProjects,
        filteredProjects: updatedFilteredProjects,
      };
    }),
  addProject: (project) =>
    set((state) => {
      const updatedProjects = {
        ...state.projects,
        [project._id]: project,
      };

      const updatedFilteredProjects = {
        ...state.filteredProjects,
        [project._id]: project,
      };

      return {
        projects: updatedProjects,
        filteredProjects: updatedFilteredProjects,
      };
    }),
  removeProject: (id) =>
    set((state) => {
      const updatedProjects = { ...state.projects };
      delete updatedProjects[id];

      const updatedFilteredProjects = { ...state.filteredProjects };
      delete updatedFilteredProjects[id];

      return {
        projects: updatedProjects,
        filteredProjects: updatedFilteredProjects,
      };
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
export const useFilteredProjects = () => useProjectStore((state) => state.filteredProjects);
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
export const useSetFilteredProjects = () => useProjectStore((state) => state.setFilteredProjects);

export default useProjectStore;
