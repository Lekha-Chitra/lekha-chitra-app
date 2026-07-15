import axios from "axios";

const api = axios.create({
  //  baseURL: "https://lekhachitraapi20260616113053-c3h7eahya5htfnf0.southeastasia-01.azurewebsites.net/api",
   baseURL: "https://localhost:7042/api",
  
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;