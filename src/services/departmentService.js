import api from "./api";

const BASE_URL = "/departments";

export function getDepartments() {
  return api.get(BASE_URL);
}

export function getDepartmentById(deptId) {
  return api.get(`${BASE_URL}/${deptId}`);
}
