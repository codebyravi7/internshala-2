import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const fetchUsers = (page) => axios.get(API_URL + `?page=${page}&pageSize=20`);
export const createUser = (userData) => axios.post(API_URL, userData);
export const updateUser = (id, userData) =>
  axios.put(`${API_URL}/${id}`, userData);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
