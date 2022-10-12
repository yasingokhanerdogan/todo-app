import axios from "axios";

const API = axios.create({ baseURL: "https://todo-api.yasingokhanerdogan.com/api" });

API.interceptors.request.use((config) => {
  if (localStorage.getItem("session")) {
    const session = JSON.parse(localStorage.getItem("session"));
    config.headers['Authorization'] = session.token;
    config.headers['Access-Control-Allow-Origin'] = '*';
  }
  return config;
});

export const SIGN_IN = async (formData) =>
  await API.post("/auth/signin", formData);
export const SIGN_OUT = async (id) => await API.get(`/auth/signout/${id}`);
export const AUTH = async (token) => await API.post("/auth", token);

export const GET_TODOS = async (userId) =>
  await API.get(`/user/${userId}/todos`);
export const ADD_TODO = async (todo) => await API.post(`/todo`, todo);
export const DELETE_TODO = async (id) => await API.delete(`/todo/${id}`);
export const UPDATE_TODO = async (formData) => await API.put(`/todo`, formData);
