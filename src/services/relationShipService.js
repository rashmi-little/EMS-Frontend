import api from "./api";

const BASE_URL = "/relationship";

export function getEmployeeWithDepartments(empId) {
  return api.get(`${BASE_URL}/employees/${empId}/departments`);
}

export function addDepartmentToEmployee(empId, deptId) {
  return api.post(`${BASE_URL}/employees/${empId}/departments/${deptId}`);
}

export function addDepartmentsToEmployee(empId, deptIds) {
  return api.put(
    `${BASE_URL}/employees/${empId}/multiple-departments`,
    deptIds
  );
}

