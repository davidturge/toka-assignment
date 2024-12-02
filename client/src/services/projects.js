import axiosClient from "../api"
import { getTasksByProjectIdApi } from './tasks'

const PROJECTS_ENDPOINT = "/api/projects"

/**
 * Fetches all projects.
 *
 * @returns {Promise<Object>} A promise that resolves to the response data containing all projects.
 * @throws {Error} Throws an error if unable to fetch the projects.
 */
export const getAllProjectsApi = async() => {
    try {
        return  await axiosClient.get(PROJECTS_ENDPOINT);
    } catch (e) {
        throw new Error(`Unable to load projects: ${e.message}`);
    }
}

/**
 * Create a new project.
 *
 * @param {Object} project - The data for the new project.
 * @returns {Promise<Object>} A promise that resolves to the created project's data.
 * @throws {Error} Throws an error if unable to create a new project.
 */
export const createProjectApi = async(project) => {
    try {
        return await axiosClient.post(`${PROJECTS_ENDPOINT}`, project);
    } catch (e) {
        throw new Error(`Unable to create a new project: ${e.message}`);
    }
}

/**
 * Fetches a project by its ID.
 *
 * @param {string} id - The ID of the project to fetch.
 * @returns {Promise<Object>} A promise that resolves to the project's data.
 * @throws {Error} Throws an error if unable to fetch the project.
 */
export const getProjectApi = async(id) => {
    try {
        return await axiosClient.get(`${PROJECTS_ENDPOINT}/${id}`);
    } catch (e) {
        throw new Error(`Unable to fetch project with id ${id}: ${e.message}`);
    }
}

/**
 * Updates a project by its ID.
 *
 * @param {Object} data - The data to update the project with.
 * @returns {Promise<Object>} A promise that resolves to the updated project's data.
 * @throws {Error} Throws an error if unable to update the project.
 */
export const updateProjectApi = async(data) => {
    try {
        return await axiosClient.put(`${PROJECTS_ENDPOINT}/${data._id}`, data);
    } catch (e) {
        throw new Error(`Unable to update project with the id ${data._id}: ${e.message}`);
    }
}

/**
 * Deletes a project by its ID.
 *
 * @param {string} id - The ID of the project to delete.
 * @returns {Promise<Object>} A promise that resolves to the response from the server.
 * @throws {Error} Throws an error if unable to delete the project.
 */
export const deleteProjectApi = async(id) => {
    try {
        return await axiosClient.delete(`${PROJECTS_ENDPOINT}/${id}`);
    } catch (e) {
        throw new Error(`Unable to delete project with the id ${id}: ${e.message}`);
    }
}

/**
 * Return the project with the project tasks
 *
 * @param id
 * @returns {Promise<{project: axios.AxiosResponse<any>, tasks: *}>}
 */
export const getProjectWithTasksApi = async(id) => {
    try {
        const project = await axiosClient.get(`${PROJECTS_ENDPOINT}/${id}`);
        const tasks = await getTasksByProjectIdApi(id);
        return {
            project,
            tasks
        };
    } catch (e) {
        throw new Error(`Unable to fetch project with tasks: ${e.message}`);
    }
}

/**
 * Return the search projects results
 *
 * @param body
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const searchProjectsApi = async(body) => {
    try {
        return await axiosClient.post(`${PROJECTS_ENDPOINT}/search`, body);
    } catch (e) {
        throw new Error(`Unable to fetch tasks: ${e.message}`);
    }
}
