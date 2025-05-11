import axios from "axios";

import config from "../config";

export const fetchRandomUsers = async () => {
  const response = await axios.get(config.randomUserApiUrl);

  return response.data;
};
