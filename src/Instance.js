import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// instance.defaults.headers.common['Authorizaton'] = 'AUTH'

export default instance;
