import axios from "axios";
const customFetch = axios.create({
  //   baseURL: "/api/v1/",
  baseURL: "http://localhost:5003/api/v1/",
  withCredentials: true,
});

export function convertToDateOnly(dateString) {
  return dateString.split("T")[0];
}
export default customFetch;
