import axios from "axios";
const url = "https://fyp-backend-heroku.herokuapp.com/";

const login = axios.create({
  baseURL: `${url}authentication`,
});
login.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const users = axios.create({
  baseURL: `${url}users`,
});
users.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
const groups = axios.create({
  baseURL: `${url}groups`,
});
groups.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { login, users, groups };
