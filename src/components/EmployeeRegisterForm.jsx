import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "@styles/CreateEmployeeForm.module.css";
import { useEffect, useState } from "react";
import Select from "react-select/base";
import { toast } from "react-toastify";
import { getEmployeeWithDepartments } from "../services/relationShipService.js";
import { addEmployee, updateEmployee } from "../services/employeeService.js";
import { getDepartments } from "../services/departmentService";

export default ({ empId, type }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    dateOfJoining: "",
  });
  const [allDepartments, setAllDepartments] = useState([]);
  const [departmentIds, setDepartmentIds] = useState(new Set());

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => setIsMenuOpen(false);
  const handleOpenMenu = () => setIsMenuOpen(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (empId) {
      fetchEmployee();
    }
    fetchDepartment();
  }, [empId]);

  const fetchDepartment = async () => {
    try {
      const response = await getDepartments();
      if (response.status === 200) {
        const departments = response.data;
        setAllDepartments(departments);
      } else {
        throw new Error("Error fetching departments");
      }
    } catch (error) {
      toast.error("Something went wrong unable to fetch departments");
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await getEmployeeWithDepartments(empId);
      if (response.status === 200) {
        const employeeWithDepartment = response.data;
        const employeeData = employeeWithDepartment.employee;
        const departmentsData = employeeWithDepartment.departments;

        setEmployee({
          name: employeeData.name,
          email: employeeData.email,
          salary: employeeData.salary,
          dateOfJoining: employeeData.dateOfJoining,
        });

        departmentsData.forEach((dept) => {
          setDepartmentIds((prev) => prev.add(dept.id));
        });
      } else {
        toast.error("Error fetching employee");
      }
    } catch (error) {
      toast.error(
        error.message || "Something went wrong. Please try again later"
      );
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const employeeRequestDto = { ...employee };

    if (empId) {
      await makeEmployeeUpdate(employeeRequestDto);
    } else {
      await makeEmployeeAdd(employeeRequestDto);
    }
    navigate("/");
  }

  async function makeEmployeeAdd(employeeRequestDto) {
    try {
      const employeeResponse = await addEmployee(
        employeeRequestDto,
        departmentIds
      );

      if (employeeResponse.status !== 201) {
        throw new Error("Failed to add employee");
      }
      toast.success(`Employee ${type} successfully`);
    } catch (error) {
      toast.error("Something went wrong. Please try again later");
    }
  }

  async function makeEmployeeUpdate(employeeRequestDto) {
    try {
      const employeeResponse = await updateEmployee(
        empId,
        employeeRequestDto,
        departmentIds
      );

      if (employeeResponse.status !== 200) {
        throw new Error("Failed to update employee");
      }

      toast.success(`Employee ${type} succesfully`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later");
    }
  }

  function handleInputChange(e) {
    console.log();
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="name">Enter employee name: </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            value={employee.name}
            required
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="email">Enter employee email: </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="john.doe@example.com"
            value={employee.email}
            required
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="salary">Enter employee salary: </label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            placeholder="50000"
            min="0"
            step="0.01"
            id="salary"
            required
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="doj">Enter date of joining: </label>
          <input
            type="date"
            name="dateOfJoining"
            id="doj"
            value={employee.dateOfJoining}
            required
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_group}>
          <label>{type} Departments:</label>
          <Select
            data-testid="department-select"
            options={allDepartments.map((dept) => ({
              value: dept.id,
              label: dept.name,
            }))}
            onMenuClose={handleCloseMenu}
            onMenuOpen={handleOpenMenu}
            menuIsOpen={isMenuOpen}
            isMulti={true}
            onChange={(selectedOptions) => {
              const selectedIds = new Set(
                selectedOptions.map((option) => option.value)
              );
              setDepartmentIds(selectedIds);
            }}
            value={allDepartments
              .filter((dept) => departmentIds.has(dept.id))
              .map((dept) => ({
                value: dept.id,
                label: dept.name,
              }))}
            onInputChange={handleInputChange}
          />
        </div>

        <div className={styles.form_action}>
          <button className={styles.save_btn} data-testid="save">
            {type}
          </button>
          <Link to="/" className={styles.back_btn}>
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};
