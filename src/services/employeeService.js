import api from "./api";

const BASE_URL = "/employees";

export function getEmployees() {
  return api.get(BASE_URL);
}

export function getEmployeeById(empId) {
  return api.get(`${BASE_URL}/${empId}`);
}

export function getEmployeeInBatch(pageNumber, pageSize) {
  return api.get(`${BASE_URL}/batch/${pageNumber}/${pageSize}`);
}

export function deleteEmployee(empId) {
  return api.delete(`${BASE_URL}/${empId}`);
}

export function addEmployee(employeeRequestDto, deptIds) {
  const requestBody = {
    ...employeeRequestDto,
    deptIds: Array.from(deptIds),
  };
  return api.post(`${BASE_URL}`, requestBody);
}

export function updateEmployee(empId, employeeRequestDto, deptIds) {
  console.log(empId,deptIds,employeeRequestDto);
  
  const requestBody = {
    ...employeeRequestDto,
    deptIds: Array.from(deptIds),
  };
  return api.put(`${BASE_URL}/${empId}`, requestBody);
}
