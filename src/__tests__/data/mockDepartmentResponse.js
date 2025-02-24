const mockDepartments = [{ id: 1, name: "Marketing", location: "Los Angeles" }];
const mockDepartmentsResponse = {
  status: 200,
  data: {
    content: mockDepartments,
    totalPages: 1,
    totalElements: 1,
    size: 1,
    page: 1,
  },
};

export default mockDepartmentsResponse;
