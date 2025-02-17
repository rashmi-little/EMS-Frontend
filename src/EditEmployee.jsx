import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./CreateEmployee.module.css";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:2200/api/v1";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState(0);
  const [dateOfJoining, setDateOfJoining] = useState("");
  const { empId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`${BASE_URL}/employees/${empId}`);
      const employeeData = await response.json();

      if (response.ok) {
        console.log(employeeData);
        setEmployeeData(employeeData);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      alert("something went wrong");
    }
  };

  function setEmployeeData(employee) {
    setName(employee.name);
    setEmail(employee.email);
    setSalary(employee.salary);
    setDateOfJoining(employee.dateOfJoining);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleSalaryChanage(e) {
    setSalary(e.target.value);
  }
  function handleDateOfJoiningChange(e) {
    setDateOfJoining(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const employeeRequestDto = { name, email, salary, dateOfJoining };
    console.log(employeeRequestDto);

    try {
      const response = await fetch(`${BASE_URL}/employees/${empId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(employeeRequestDto),
      });

      if (response.ok) {
        alert("Employee updated successfully");
        navigate("/");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      alert("something went wrong");
    }
  }

  return (
    <div className={styles.container}>
      <h2>Update Employee</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter employee name : </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          required
          onChange={handleNameChange}
        />
        <label htmlFor="email">Enter employee email : </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={handleEmailChange}
        />
        <label htmlFor="salary">Enter employee salary : </label>
        <input
          type="number"
          name="salary"
          value={salary}
          placeholder="Enter salary"
          min="0"
          step="0.01"
          id="salary"
          required
          onChange={handleSalaryChanage}
        />
        <label htmlFor="doj">Enter date of joining : </label>
        <input
          type="date"
          name="doj"
          id="doj"
          value={dateOfJoining}
          required
          onChange={handleDateOfJoiningChange}
        />

        <div>
          <button>Update</button>
          <Link to="/" className="">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};
