import {create} from 'zustand';

/**
 * Project store, handles setting the projects, adding a project, and removing a project.
 * @type {UseBoundStore<Mutate<StoreApi<{projects: [], addProject: function(*): *, setProjects: function(*): void, removeProject: function(*): *}>, []>>}
 */
const useProjectStore = create((set) => ({
  projects: [],
  currentProject: {},
  setProjects: (projects) => {
    set({ projects: [...projects] });
  },
  setCurrentProject: (project) => {
    set({ currentProject: project });
  },
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  removeProject: (id) => set((state) => ({ projects: state.projects.filter(project => project._id !== id) })),
}));

export const useProjects = () => useProjectStore((state) => state.projects);
export const useCurrentProject = () => useProjectStore((state) => state.currentProject);
export const useSetProjects = () => useProjectStore((state) => state.setProjects)
export const useSetCurrentProject = () => useProjectStore((state) => state.setCurrentProject)
export const useAddProject = () => useProjectStore((state) => state.addProject)
export const useRemoveProject = () => useProjectStore((state) => state.removeProject);
