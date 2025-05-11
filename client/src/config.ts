const env = import.meta.env;

const config = {
  randomUserApiUrl: env.VITE_RANDOM_USER_API_URL,
  apiUrl: env.VITE_API_URL,
};

export default config;
