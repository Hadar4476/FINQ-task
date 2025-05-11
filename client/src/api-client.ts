import axios from "axios";

import appConfig from "./config";

const apiClient = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
