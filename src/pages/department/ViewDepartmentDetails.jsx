import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../../css/EmployeeView.module.css";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:2200/api/v1";

export default () => {
  const { deptId } = useParams();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    fetchDepartment();
  }, [deptId]);

  const fetchDepartment = async () => {
    try {
      const response = await fetch(`${BASE_URL}/departments/${deptId}`);
      const departmentData = await response.json();

      if (!response.ok) {
        throw new Error("Unable to fetch department. Please try again later.");
      }
      setDepartment(departmentData);
    } catch (error) {
      toast.error(
        error.message || "Something went wrong. Unable to fetch department."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.header}>Department Details</h1>
        {department ? (
          <>
            <p className={styles.details}>
              <span>Name:</span> {department.name}
            </p>
            <p className={styles.details}>
              <span>Location :</span> {department.location}
            </p>

            <Link to="/dashboard/department" className={styles.backButton}>
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
