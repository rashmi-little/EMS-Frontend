import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../css/CreateEmployeeForm.module.css";
import { useEffect, useState } from "react";
import Select from "react-select/base";
import { toast } from "react-toastify";
import { getDepartments } from "../../services/DepartmentService";
import {
  addDepartmentsToEmployee,
  getEmployeeWithDepartments,
} from "../../services/RelationShipService";
import { updateEmployee } from "../../services/EmployeeService";
import EmployeeRegisterForm from "../../components/EmployeeRegisterForm";

export default () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [salary, setSalary] = useState(0);
  // const [dateOfJoining, setDateOfJoining] = useState("");
  // const [allDepartments, setAllDepartments] = useState([]);
  // const [departmentsId, setDepartmentsId] = useState(new Set());
  const { empId } = useParams();

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const handleCloseMenu = () => setIsMenuOpen(false);
  // const handleOpenMenu = () => setIsMenuOpen(true);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   fetchEmployee();
  //   fetchDepartment();
  // }, []);

  // const fetchDepartment = async () => {
  //   try {
  //     const response = await getDepartments();

  //     if (response.status === 200) {
  //       const departments = response.data;
  //       setAllDepartments(departments);
  //     } else {
  //       throw new Error("error fetching employee");
  //     }
  //   } catch (error) {
  //     toast.error("something went wrong unable fetch departments");
  //   }
  // };

  // const fetchEmployee = async () => {
  //   try {
  //     const response = await getEmployeeWithDepartments(empId);

  //     if (response.status === 200) {
  //       const employeeWithDepartment = response.data;
  //       const employeeData = employeeWithDepartment.employee;
  //       const departmentsData = employeeWithDepartment.departments;

  //       setEmployeeData(employeeData);

  //       departmentsData.map((dept) => {
  //         setDepartmentsId((prev) => prev.add(dept.id));
  //       });
  //     } else {
  //       toast.error("error fetching employee");
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error.message || "something went wrong. please try again later"
  //     );
  //   }
  // };

  // function setEmployeeData(employee) {
  //   setName(employee.name);
  //   setEmail(employee.email);
  //   setSalary(employee.salary);
  //   setDateOfJoining(employee.dateOfJoining);
  // }

  // function handleNameChange(e) {
  //   setName(e.target.value);
  // }
  // function handleEmailChange(e) {
  //   setEmail(e.target.value);
  // }
  // function handleSalaryChanage(e) {
  //   setSalary(e.target.value);
  // }
  // function handleDateOfJoiningChange(e) {
  //   setDateOfJoining(e.target.value);
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const employeeRequestDto = { name, email, salary, dateOfJoining };

  //   try {
  //     const employeeResponse = await updateEmployee(empId, employeeRequestDto);

  //     if (employeeResponse.status !== 200) {
  //       throw new Error("Failed to updated employee");
  //     }

  //     const updateDepartmentsResponse = await addDepartmentsToEmployee(
  //       empId,
  //       Array.from(departmentsId)
  //     );

  //     if (updateDepartmentsResponse.status === 200) {
  //       toast.success("employee updated successfully");
  //     } else {
  //       throw new Error("failed to update departments");
  //     }
  //   } catch (error) {
  //     toast.error("something went wrong please try again later");
  //   }
  //   navigate("/");
  // }

  // function handleInputChange(e) {}

  // return (
  //   <div className={styles.container}>
  //     <form onSubmit={handleSubmit}>
  //       <div className={styles.form_group}>
  //         <label htmlFor="name">Enter employee name : </label>
  //         <input
  //           type="text"
  //           name="name"
  //           id="name"
  //           value={name}
  //           required
  //           onChange={handleNameChange}
  //         />
  //       </div>
  //       <div className={styles.form_group}>
  //         <label htmlFor="email">Enter employee email : </label>
  //         <input
  //           type="email"
  //           name="email"
  //           id="email"
  //           value={email}
  //           required
  //           onChange={handleEmailChange}
  //         />
  //       </div>
  //       <div className={styles.form_group}>
  //         <label htmlFor="salary">Enter employee salary : </label>
  //         <input
  //           type="number"
  //           name="salary"
  //           value={salary}
  //           placeholder="Enter salary"
  //           min="0"
  //           step="0.01"
  //           id="salary"
  //           required
  //           onChange={handleSalaryChanage}
  //         />
  //       </div>

  //       <div className={styles.form_group}>
  //         <label htmlFor="doj">Enter date of joining : </label>
  //         <input
  //           type="date"
  //           name="doj"
  //           id="doj"
  //           value={dateOfJoining}
  //           required
  //           onChange={handleDateOfJoiningChange}
  //         />
  //       </div>

  //       <div className={styles.form_group}>
  //         <label>Edit Departments :</label>
  //         <Select
  //           options={allDepartments.map((dept) => ({
  //             value: dept.id,
  //             label: dept.name,
  //           }))}
  //           onMenuClose={handleCloseMenu}
  //           onMenuOpen={handleOpenMenu}
  //           menuIsOpen={isMenuOpen}
  //           isMulti={true}
  //           onChange={(selectedOptions) => {
  //             const selectedIds = new Set(
  //               selectedOptions.map((option) => option.value)
  //             );
  //             setDepartmentsId(selectedIds);
  //           }}
  //           value={allDepartments
  //             .filter((dept) => departmentsId.has(dept.id))
  //             .map((dept) => ({
  //               value: dept.id,
  //               label: dept.name,
  //             }))}
  //           onInputChange={handleInputChange}
  //         />
  //       </div>
  //       <div className={styles.form_action}>
  //         <button className={styles.save_btn}>Update</button>
  //         <Link to="/" className={styles.back_btn}>
  //           Back
  //         </Link>
  //       </div>
  //     </form>
  //   </div>
  // );
  return (
    <EmployeeRegisterForm empId={empId} type={"Update"}/>
  );
};
