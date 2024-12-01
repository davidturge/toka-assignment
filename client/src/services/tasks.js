import axiosClient from "../api"

const TASKS_ENDPOINT = "/api/tasks"

/**
 * Fetches all tasks.
 *
 * @returns {Promise<Object>} A promise that resolves to the response data containing all tasks.
 * @throws {Error} Throws an error if unable to fetch the tasks.
 */
export const getAllTasksApi = async() => {
    try {
        return await axiosClient.get(TASKS_ENDPOINT);
    } catch (e) {
        throw new Error(`unable to fetch all tasks: ${e.message}`)
    }
}

/**
 * Create a new task.
 *
 * @param {Object} task - The data for the new task.
 * @returns {Promise<Object>} A promise that resolves to the created project's data.
 * @throws {Error} Throws an error if unable to create a new project.
 */
export const createTaskApi = async(task) => {
    try {
        return await axiosClient.post(`${TASKS_ENDPOINT}`, task);
    } catch (e) {
        throw new Error(`Unable to create a new task: ${e.message}`);
    }
}

/**
 * Fetches a task by its ID.
 *
 * @param {string} id - The ID of the task to fetch.
 * @returns {Promise<Object>} A promise that resolves to the task's data.
 * @throws {Error} Throws an error if unable to fetch the task.
 */
export const getTaskApi = async(id) => {
    try {
        return await axiosClient.put(`${TASKS_ENDPOINT}/${id}`);
    } catch (e) {
        throw new Error(`Unable to fetch task with id ${id}: ${e.message}`);
    }
}

/**
 * Updates a task by its ID.
 *
 * @param {string} id - The ID of the task to update.
 * @param {Object} body - The data to update the task with.
 * @returns {Promise<Object>} A promise that resolves to the updated task's data.
 * @throws {Error} Throws an error if unable to update the task.
 */
export const updateTaskApi = async(id, body) => {
    try {
        return await axiosClient.put(`${TASKS_ENDPOINT}/${id}`, body);
    } catch (e) {
        throw new Error(`Unable to update task with the id ${id}: ${e.message}`);
    }
}

/**
 * Deletes a task by its ID.
 *
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<Object>} A promise that resolves to the response from the server.
 * @throws {Error} Throws an error if unable to delete the task.
 */
export const deleteTaskApi = async(id) => {
    try {
        return await axiosClient.delete(`${TASKS_ENDPOINT}/${id}`);
    } catch (e) {
        throw new Error(`Unable to delete task with the id ${id}: ${e.message}`);
    }
}
