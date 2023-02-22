import axios from 'axios';

// const URL = 'http://localhost:5000/api/users';
const URL = '/api/users';

export const authService = {
  /**
   * @description Register user
   * @param payload Form data
   * @param rejectWithValue
   * @return {Promise<*>}
   */
  register: async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(URL, payload);
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  /**
   * @description Login user
   * @param payload Form data
   * @param rejectWithValue
   * @return {Promise<*>}
   */
  login: async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/login`, payload);
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
};
