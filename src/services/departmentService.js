import api from "./api";

const BASE_URL = "/departments";

export function getDepartments() {
  return api.get(BASE_URL);
}

export function getDepartmentById(deptId) {
  return api.get(`${BASE_URL}/${deptId}`);
}

export function getDepartmentsInBatch(pageNumber) {
  return api.get(`${BASE_URL}/batch/${pageNumber}`);
}

export function deleteDepartmentById(deptId) {
  return api.delete(`${BASE_URL}/${deptId}`);
}

export function addDepartment(departementRequestDto) {
  return api.post(`${BASE_URL}`, departementRequestDto);
}

export function updateDepartment(deptId, departmentRequestDto) {
  return api.put(`${BASE_URL}/${deptId}`, departmentRequestDto);
}

