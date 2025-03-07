import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "@styles/EmployeeView.module.css";
import { getEmployeeWithDepartments } from "../../services/relationShipService.js";
import { toast } from "react-toastify";

export default () => {
  const { empId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [empId]);

  const fetchEmployee = async () => {
    const response = await getEmployeeWithDepartments(empId);

    if (response.status === 200) {
      const employeeWithDepartment = response.data;

      setEmployee(employeeWithDepartment.employee);
      setDepartments(employeeWithDepartment.departments);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.header}>Employee Details</h1>
        {employee ? (
          <div className={styles.detailsGroup}>
            <p className={styles.details}>
              <span className={styles.label}>Name:</span> {employee.name}
            </p>
            <p className={styles.details}>
              <span className={styles.label}>Email:</span> {employee.email}
            </p>
            <p className={styles.details}>
              <span className={styles.label}>Salary:</span> {employee.salary}
            </p>
            <p className={styles.details}>
              <span className={styles.label}>Date of Joining:</span>{" "}
              {employee.dateOfJoining}
            </p>

            <div className={styles.departmentList}>
              <ul>
                {departments && departments.length > 0 ? (
                  departments.map((dept) => (
                    <li key={dept.id} className={styles.departmentItem}>
                      {dept.name}
                    </li>
                  ))
                ) : (
                  <li>No departments found</li>
                )}
              </ul>
            </div>

            <Link to="/" className={styles.backButton}>
              Back
            </Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
