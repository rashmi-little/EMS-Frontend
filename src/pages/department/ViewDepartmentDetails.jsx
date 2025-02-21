import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "@styles/EmployeeView.module.css";
import { toast } from "react-toastify";
import { getDepartmentById } from "../../services/DepartmentService";

export default () => {
  const { deptId } = useParams();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    fetchDepartment();
  }, [deptId]);

  const fetchDepartment = async () => {
    try {
      const response = await getDepartmentById(deptId);
      const departmentData = response.data;

      if (response.status !== 200) {
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
