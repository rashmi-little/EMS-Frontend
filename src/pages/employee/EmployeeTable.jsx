import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "@styles/EmployeeTable.module.css";
import "../../css/Base.css";
import { toast } from "react-toastify";
import {
  deleteEmployee,
  getEmployeeInBatch,
} from "../../services/employeeService.js";

export default () => {
  const [employees, setEmployees] = useState([]);
  const [pageEmployee, setPageEmployee] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
    page: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const response = await getEmployeeInBatch(currentPage, pageSize);

    const pageEmployee = response.data;
    setPageEmployee(pageEmployee);
    const employees = pageEmployee.content;

    if (employees.length === 0) {
      handlePageDecrease();
    }
    setEmployees(employees);
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, pageSize]);

  function handleView(empId) {
    navigate(`./view/${empId}`);
  }

  function handleEdit(empId) {
    navigate(`./edit/${empId}`);
  }

  async function handleDelete(empId) {
    if (
      window.confirm(
        "are you sure to delete the employee with employee Id: " + empId
      )
    ) {
      try {
        const response = await deleteEmployee(empId);

        if (response.status == 204) {
          toast.success("employee deleted successfully");

          setEmployees((prevEmployee) =>
            prevEmployee.filter((emp) => emp.id != empId)
          );

          fetchEmployees();
        } else {
          toast.error("failed to delete employee");
        }
      } catch (error) {
        toast.error(error);
      }
    }
  }

  function handlePageDecrease() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function handlePageIncrease() {
    setCurrentPage((prev) => prev + 1);
  }
  function handlePageSizeChange(e) {
    setPageSize(e.target.value);
  }
  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
        <h2 className={styles.h2}>Employees</h2>

        <Link to="./create" className={styles.addBtn}>
          + Add
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Joining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.dateOfJoining.split("-").reverse().join("-")}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.view}
                        onClick={() => handleView(emp.id)}
                      >
                        View
                      </button>
                      <button
                        className={styles.edit}
                        onClick={() => handleEdit(emp.id)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.delete}
                        onClick={() => handleDelete(emp.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationContainer}>
        <button
          className={styles.paginationButton}
          onClick={handlePageDecrease}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className={styles.paginationButton}
          onClick={handlePageIncrease}
          disabled={!(currentPage < pageEmployee.totalPages)}
        >
          Next
        </button>
        <div className={styles.pageCount}>
          <label htmlFor="page">PageCount</label>
          <select name="page" id="page" onChange={handlePageSizeChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </div>
  );
};
