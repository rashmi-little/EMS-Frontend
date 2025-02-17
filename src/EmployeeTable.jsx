import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Table.module.css"; // Ensure correct path
import "./Base.css";

const BASE_URL = "http://localhost:2200/api/v1";

export default () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const response = await fetch(`${BASE_URL}/employees`);
    const data = await response.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  function handleView(empId) {
    navigate(`/employee/view/${empId}`);
  }

  function handleEdit(empId) {
    navigate(`/employee/edit/${empId}`);
  }

  async function handleDelete(empId) {
    if (
      window.confirm(
        "are you sure to delete the employee with employee Id: " + empId
      )
    ) {
      try {
        const response = await fetch(`${BASE_URL}/employees/${empId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          alert("faild to delete");
        }

        setEmployees((prevEmployee) =>
          prevEmployee.filter((emp) => emp.id != empId)
        );
      } catch (error) {
        alert("something went wrong");
      }
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Employee Records</h2>

      <div className={styles.buttonContainer}>
        <Link to="/employee/create" className={styles.addEmployeeBtn}>
          Add Employee
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Salary</th>
              <th>Date of Joining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.dateOfJoining}</td>
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
    </div>
  );
};
