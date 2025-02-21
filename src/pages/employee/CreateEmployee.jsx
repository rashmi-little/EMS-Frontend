import { Link, useNavigate } from "react-router-dom";
import styles from "../../css/CreateEmployeeForm.module.css";
import "../../css/Base.css";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getDepartments } from "../../services/DepartmentService";
import { addEmployee } from "../../services/EmployeeService";
import { addDepartmentToEmployee } from "../../services/RelationShipService";
import EmployeeRegisterForm from "../../components/EmployeeRegisterForm";

const BASE_URL = "http://localhost:2200/api/v1";
export default () => {
  // const [AllDepartments, setAllDepartments] = useState([]);

  // const navigate = useNavigate();

  // const nameRef = useRef("");
  // const emailRef = useRef("");
  // const salaryRef = useRef(0);
  // const dateOfJoiningRef = useRef("");
  // const departmentRef = useRef(null);

  // useEffect(() => {
  //   fetchDepartments();
  // }, []);

  // const fetchDepartments = async () => {
  //   try {
  //     const response = await getDepartments();

  //     if (response.status === 200) {
  //       const departments = response.data;
  //       setAllDepartments(departments);
  //     } else {
  //       throw new Error("error fetching departments");
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error.message || "something went wrong. please try again later"
  //     );
  //   }
  // };

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const name = nameRef.current.value;
  //   const email = emailRef.current.value;
  //   const salary = salaryRef.current.value;
  //   const dateOfJoining = dateOfJoiningRef.current.value;
  //   const departmentId = departmentRef.current.value;

  //   const employeeRequestDto = { name, email, salary, dateOfJoining };

  //   try {
  //     const employeeResponse = await addEmployee(employeeRequestDto);

  //     if (employeeResponse.status === 201) {
  //       const { id } = employeeResponse.data;

  //       const departmentResponse = await addDepartmentToEmployee(
  //         id,
  //         departmentId
  //       );

  //       if (departmentResponse.status !== 200) {
  //         throw new Error("unable to add department");
  //       }
  //     } else {
  //       toast.error("Unable to add employee");
  //     }
  //     toast.success("Employee created successfully");
  //     navigate("/dashboard");
  //   } catch (error) {
  //     if (error.response.status === 400) {
  //       toast.error("Invalid employee data. please verify it");
  //     } else {
  //       toast.error(error.message || "something went wrong try again later");
  //     }
  //   }
  // }

  // return (
  //   <div className={styles.container}>
  //     {/* <h2>Add Employee</h2> */}

  //     <form onSubmit={handleSubmit}>
  //       <div className={styles.form_group}>
  //         <label htmlFor="name">Enter employee name:</label>
  //         <input
  //           type="text"
  //           name="name"
  //           id="name"
  //           ref={nameRef}
  //           placeholder="John Doe"
  //           required
  //         />
  //       </div>

  //       <div className={styles.form_group}>
  //         <label htmlFor="email">Enter employee email:</label>
  //         <input
  //           type="email"
  //           name="email"
  //           id="email"
  //           ref={emailRef}
  //           placeholder="john.doe@example.com"
  //           required
  //         />
  //       </div>

  //       <div className={styles.form_group}>
  //         <label htmlFor="salary">Enter employee salary:</label>
  //         <input
  //           type="number"
  //           name="salary"
  //           ref={salaryRef}
  //           placeholder="50000"
  //           min="0"
  //           id="salary"
  //           required
  //         />
  //       </div>

  //       <div className={styles.form_group}>
  //         <label htmlFor="doj">Enter date of joining:</label>
  //         <input
  //           type="date"
  //           name="doj"
  //           id="doj"
  //           ref={dateOfJoiningRef}
  //           required
  //         />
  //       </div>

  //       <div className={styles.form_group}>
  //         <label htmlFor="departments">Select department:</label>
  //         <select
  //           name="departments"
  //           id="departments"
  //           ref={departmentRef}
  //           required
  //         >
  //           {AllDepartments.map((dept) => {
  //             return (
  //               <option value={dept.id} key={dept.id}>
  //                 {dept.name}
  //               </option>
  //             );
  //           })}
  //         </select>
  //       </div>

  //       <div className={styles.form_action}>
  //         <button className={styles.save_btn} type="submit">
  //           Save
  //         </button>
  //         <Link to="/" className={styles.back_btn}>Back</Link>
  //       </div>
  //     </form>
  //   </div>
  // );
  return <EmployeeRegisterForm empId={undefined} type={"Add"} />
};
