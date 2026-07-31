import axios from "axios";

export const api = axios.create({
  baseURL: "https://tarefaapi.onrender.com/api/v1",
});
