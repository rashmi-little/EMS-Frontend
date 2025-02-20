import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../css/CreateDepartmentForm.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateDepartment } from "../../services/DepartmentService";

const BASE_URL = "http://localhost:2200/api/v1";

export default () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const { deptId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    try {
      const response = await fetch(`${BASE_URL}/departments/${deptId}`);
      const department = await response.json();

      if (!response.ok) {
        throw new Error("unable to fetch department");
      }

      setName(department.name);
      setLocation(department.location);
    } catch (error) {
      toast.error(
        error.message || "something went wrong while fetching department"
      );
    }
  };

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const departmentRequestDto = { name, location };

    try {
      const departmentResponse = await updateDepartment(
        deptId,
        departmentRequestDto
      );

      if (departmentResponse.status !== 200) {
        throw new Error("Failed to updated department");
      }

      toast.success("department updated successfully");
      navigate("/dashboard/department");
    } catch (error) {
      toast.error(error.message || "something went wrong");
    }
  }

  return (
    <div className={styles.container}>
      <h2>Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter department name : </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          required
          onChange={handleNameChange}
        />

        <label htmlFor="location">Enter department location : </label>
        <input
          type="text"
          name="location"
          id="location"
          value={location}
          required
          onChange={handleLocationChange}
        />

        <div className={styles.form_action}>
          <button className={styles.save_btn}>Update</button>
          <Link to="/dashboard/department" className={styles.back_btn}>
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};
