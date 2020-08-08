import axios from "axios";

const api = axios.create({
  baseURL: "https://apiproff.herokuapp.com/",
});

export default api;
