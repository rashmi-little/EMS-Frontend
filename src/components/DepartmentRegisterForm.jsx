import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "@styles/CreateDepartmentForm.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateDepartment } from "../services/departmentService";
import {
  addDepartment,
  getDepartmentById,
} from "../services/departmentService";

export default ({ deptId, type }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (deptId) {
      fetchDepartment();
    }
  }, []);

  const fetchDepartment = async () => {
    const response = await getDepartmentById(deptId);
    const department = response.data;

    setName(department.name);
    setLocation(department.location);
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

    if (deptId) {
      await handleUpdateDepartment(departmentRequestDto);
    } else {
      await handleAddDepartment(departmentRequestDto);
    }
  }

  async function handleAddDepartment(departmentRequestDto) {
    try {
      const departmentResponse = await addDepartment(departmentRequestDto);

      if (departmentResponse.status !== 201) {
        throw new Error("Failed to create department");
      }

      toast.success("department created successfully");
      navigate("/dashboard/department");
    } catch (error) {
      toast.error(error.message || "something went wrong");
    }
  }

  async function handleUpdateDepartment(departmentRequestDto) {
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
          <button className={styles.save_btn} type="submit">
            {type}
          </button>
          <Link to="/dashboard/department" className={styles.back_btn}>
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};
