import { Link, useNavigate } from "react-router-dom";
import styles from "../../css/CreateDepartmentForm.module.css";
import "../../css/Base.css";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:2200/api/v1";

export default () => {
  const navigate = useNavigate();

  const nameRef = useRef("");
  const locationRef = useRef("");

  async function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const location = locationRef.current.value;

    const departmentRequestDto = { name, location };

    try {
      const departmentResponse = await fetch(`${BASE_URL}/departments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(departmentRequestDto),
      });

      if (!departmentResponse.ok) {
        throw new Error("unable to create department. please try again later");
      }

      toast.success("Department created successfully");
    } catch (error) {
      toast.error(error.message || "something went wrong");
    }
    navigate("/dashboard/department");
  }

  return (
    <div className={styles.container}>
      <h2>Add New Department</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter department name : </label>
        <input type="text" name="name" id="name" ref={nameRef} required />

        <label htmlFor="location">Enter department location : </label>
        <input
          type="text"
          name="location"
          id="location"
          ref={locationRef}
          required
        />
        <div className={styles.form_action}>
          <button className={styles.save_btn}>Save</button>
          <Link to="/dashboard/department" className={styles.back_btn}>Back</Link>
        </div>
      </form>
    </div>
  );
};
