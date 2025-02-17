import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from './EmployeeView.module.css';

const BASE_URL = "http://localhost:2200/api/v1";

export default () => {
  const { empId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [empId]);

  const fetchEmployee = async () => {
    const response = await fetch(`${BASE_URL}/employees/${empId}`);
    const employee = await response.json();
    console.log(employee);
    setEmployee(employee);
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
              <span>Salary:</span> ${employee.salary.toFixed(2)}
            </p>
            <p className={styles.details}>
              <span>Date of Joining:</span> {employee.dateOfJoining}
            </p>

            <Link to="/" className={styles.backButton}>Back</Link>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
