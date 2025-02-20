import api from "./api";

const BASE_URL = "/employees";

export function getEmployees() {
  return api.get(BASE_URL);
}

export function getEmployeeById(empId) {
  return api.get(`${BASE_URL}/${empId}`);
}

export function getEmployeeInBatch(pageNumber) {
  return api.get(`${BASE_URL}/batch/${pageNumber}`);
}

export function deleteEmployee(empId) {
  return api.delete(`${BASE_URL}/${empId}`);
}

export function addEmployee(employeeRequestDto) {
  return api.post(`${BASE_URL}`, employeeRequestDto);
}

export function updateEmployee(empId, employeeRequestDto) {
  return api.put(`${BASE_URL}/${empId}`, employeeRequestDto);
}
