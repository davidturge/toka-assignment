import {create} from 'zustand';

/**
 * Project store, handles setting the projects, adding a project, and removing a project.
 * @type {UseBoundStore<Mutate<StoreApi<{projects: [], addProject: function(*): *, setProjects: function(*): void, removeProject: function(*): *}>, []>>}
 */
const useProjectStore = create((set) => ({
  projects: [],
  setProjects: (projects) => {
    set({ projects: [...projects] });
  },
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  removeProject: (id) => set((state) => ({ projects: state.projects.filter(project => project._id !== id) })),
}));

export const useProjects = () => useProjectStore((state) => state.projects);
export const useSetProjects = () => useProjectStore((state) => state.setProjects)
export const useAddProject = () => useProjectStore((state) => state.addProject)
export const useRemoveProject = () => useProjectStore((state) => state.removeProject);
