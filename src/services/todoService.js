/**
 * Todo Service
 *
 * Provides functions to interact with the Todos API.
 * Uses an axios instance with sensible defaults and consistent error handling.
 *
 * SCENARIO: Fetching todo items from a remote API
 * BEST PRACTICES:
 * - Use an axios instance (`apiClient`) with `baseURL` and `timeout`.
 * - Export small functions (single responsibility) for testability.
 * - Normalize errors and throw meaningful messages.
 * - Keep services free of UI concerns.
 */

import axios from 'axios';

// Create a single axios instance for the service
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10s timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Fetch a list of todos
 * @param {Object} params - Optional query params (e.g., { userId: 1 })
 * @returns {Promise<Array>} - Resolves to an array of todos
 */
export async function getTodos(params = {}) {
  try {
    const response = await apiClient.get('/todos', { params });
    return response.data;
  } catch (error) {
    // Normalize axios error
    if (error.response) {
      // Server responded with a status outside 2xx
      const { status, data } = error.response;
      throw new Error(`API error ${status}: ${data?.message || JSON.stringify(data)}`);
    } else if (error.request) {
      // Request made but no response received
      throw new Error('No response received from Todos API');
    }
    // Something happened setting up the request
    throw new Error(error.message || 'Unknown error fetching todos');
  }
}

/**
 * Fetch a single todo by ID
 * @param {number|string} id - Todo ID
 * @returns {Promise<Object>} - Resolves to a todo object
 */
export async function getTodoById(id) {
  if (id === undefined || id === null) throw new Error('Todo id is required');
  try {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`API error ${status}: ${data?.message || JSON.stringify(data)}`);
    } else if (error.request) {
      throw new Error('No response received from Todos API');
    }
    throw new Error(error.message || 'Unknown error fetching todo');
  }
}

export default {
  getTodos,
  getTodoById
};

  /**
   * Create a new todo
   * @param {Object} todoData - Todo data { title, completed, userId }
   * @returns {Promise<Object>} - Resolves to created todo with id
   */
  export async function addTodo(todoData) {
    if (!todoData.title || todoData.title.trim() === '') {
      throw new Error('Todo title is required');
    }

    try {
      const payload = {
        title: todoData.title,
        completed: todoData.completed || false,
        userId: todoData.userId || 1
      };

      const response = await apiClient.post('/todos', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        throw new Error(`API error ${status}: ${data?.message || JSON.stringify(data)}`);
      } else if (error.request) {
        throw new Error('No response received from Todos API');
      }
      throw new Error(error.message || 'Unknown error creating todo');
    }
  }

  /**
   * Update an existing todo
   * @param {number|string} id - Todo ID
   * @param {Object} todoData - Updated todo data { title, completed, userId }
   * @returns {Promise<Object>} - Resolves to updated todo
   */
  export async function updateTodo(id, todoData) {
    if (id === undefined || id === null) {
      throw new Error('Todo id is required');
    }
    if (!todoData.title || todoData.title.trim() === '') {
      throw new Error('Todo title is required');
    }

    try {
      const payload = {
        id,
        title: todoData.title,
        completed: todoData.completed || false,
        userId: todoData.userId || 1
      };

      const response = await apiClient.put(`/todos/${id}`, payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        throw new Error(`API error ${status}: ${data?.message || JSON.stringify(data)}`);
      } else if (error.request) {
        throw new Error('No response received from Todos API');
      }
      throw new Error(error.message || 'Unknown error updating todo');
    }
  }
