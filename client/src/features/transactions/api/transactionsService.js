import axios from 'axios';

// const URL = 'http://localhost:5000/api/transactions';
const URL = '/api/transactions';

const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const transactionsService = {
  /**
   * @description Get transactions
   * @param _
   * @param getState
   * @param rejectWithValue
   * @return {Promise<*>}
   */
  get: async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const { data } = await axios.get(URL, headers(token));
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  /**
   * @description Create transaction
   * @param payload Form data
   * @param getState
   * @param rejectWithValue
   * @return {Promise<*>}
   */
  create: async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const { data } = await axios.post(URL, payload, headers(token));
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  /**
   * @description Update transaction
   * @param payload Form data
   * @param getState
   * @param rejectWithValue
   * @return {Promise<*>}
   */
  update: async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const { data } = await axios.put(`${URL}/${payload.id}`, payload.item, headers(token));
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  /**
   * @description Delete transaction
   * @param payload Form data
   * @param getState
   * @param rejectWithValue
   * @return {Promise<*>}
   */
  delete: async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const { data: { id } } = await axios.delete(`${URL}/${payload}`, headers(token));
      return id;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
};
