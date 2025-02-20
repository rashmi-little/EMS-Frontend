import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../../css/EmployeeView.module.css";
import { getEmployeeWithDepartments } from "../../services/RelationShipService";
import { toast } from "react-toastify";

export default () => {
  const { empId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [empId]);

  const fetchEmployee = async () => {
    try {
      const response = await getEmployeeWithDepartments(empId);

      if (response.status === 200) {
        const employeeWithDepartment = response.data;

        setEmployee(employeeWithDepartment.employee);
        setDepartments(employeeWithDepartment.departments);
      } else {
        throw new Error("Unable to fetch employee");
      }
    } catch (error) {
      toast.error(error.message || "something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.header}>Employee Details</h1>
        {employee ? (
          <>
            <p className={styles.details}>
              <span>Name:</span> {employee.name}
            </p>
            <p className={styles.details}>
              <span>Email:</span> {employee.email}
            </p>
            <p className={styles.details}>
              <span>Salary:</span> {employee.salary}
            </p>
            <p className={styles.details}>
              <span>Date of Joining:</span> {employee.dateOfJoining}
            </p>

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

            <Link to="/" className={styles.backButton}>
              Back
            </Link>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
