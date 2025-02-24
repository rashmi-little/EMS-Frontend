import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:2200/api/v1",
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const { detail, status, title } = error.response.data;
    console.log(detail, status, title);

    switch (status) {
      case 400:
        console.log(error.response);
        toast.error(detail);
        break;
      case 401:
        console.log("Unauthorized");
        toast.error("Unauthorized");
        break;
      case 404:
        console.log(error.response?.status);
        toast.error(detail);
        break;
      case 500:
        toast.error("server error. Something went wrong");
        console.log("server error. Something went wrong");
        break;
      default:
        toast.error(detail);
        console.log("an unknown error occurred");
        break;
    }
    return Promise.reject(error);
  }
);

export default api;
