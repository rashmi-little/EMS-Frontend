import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../css/CreateForm.module.css";
import { useEffect, useState } from "react";
import Select from "react-select/base";
import { toast } from "react-toastify";

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
      const departmentResponse = await fetch(
        `${BASE_URL}/departments/${deptId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(departmentRequestDto),
        }
      );

      if (!departmentResponse.ok) {
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
      <h2>Update Department</h2>

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

        <div>
          <button className={styles.save_btn}>Update</button>
          <Link to="/dashboard/department">Back</Link>
        </div>
      </form>
    </div>
  );
};
