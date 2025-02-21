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
  return <EmployeeRegisterForm empId={undefined} type={"Add"} />;
};
