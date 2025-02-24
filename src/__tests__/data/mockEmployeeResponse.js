const mockEmployeeResponse = {
  status: 200,
  data: {
    content: [
      {
        id: 1,
        name: "John Doe",
        salary: "50000",
        dateOfJoining: "2022-06-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        salary: "55000",
        dateOfJoining: "2021-05-20",
      },
      {
        id: 3,
        name: "Sam Wilson",
        salary: "48000",
        dateOfJoining: "2020-07-10",
      },
    ],
    totalPages: 1,
    totalElements: 3,
    size: 3,
    page: 1,
  },
};

export default mockEmployeeResponse;
