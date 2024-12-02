import axiosClient from "../api"

export const TASKS_ENDPOINT = "/api/tasks"

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

export const searchTasksApi = async(body) => {
    try {
        return await axiosClient.post(`${TASKS_ENDPOINT}/search`, body);
    } catch (e) {
        throw new Error(`Unable to fetch tasks: ${e.message}`);
    }
}

/**
 * Fetch the tasks using the given projectId and creates a map with the projectId as the key and the tasks as the values.
 * @param {string} projectId - The ID of the project for which to fetch tasks.
 * @returns {Promise<*>} A promise that resolves to the map of tasks grouped by projectId.
 * @throws {Error} Throws an error if unable to fetch tasks.
 */
export const getTasksByProjectIdApi = async(projectId) => {
    try {
        const tasks  = await axiosClient.post(`${TASKS_ENDPOINT}/search`, { projectId });
        return tasks.reduce((tasksMap, task) => {
            const { projectId } = task;

            if (!tasksMap[projectId]) {
                tasksMap[projectId] = [];
            }

            // Push the current task into the appropriate project group
            tasksMap[projectId].push(task);

            return tasksMap;
        }, {});
    } catch (e) {
        throw new Error(`Unable to fetch tasks: ${e.message}`);
    }
}

/**
 * Updates a task by its ID.
 *
 * @param {Object} data - The data to update the task with.
 * @returns {Promise<Object>} A promise that resolves to the updated task's data.
 * @throws {Error} Throws an error if unable to update the task.
 */
export const updateTaskApi = async(data) => {
    try {
        return await axiosClient.put(`${TASKS_ENDPOINT}/${data._id}`, data);
    } catch (e) {
        throw new Error(`Unable to update task with the id ${data._id}: ${e.message}`);
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
