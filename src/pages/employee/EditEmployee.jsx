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
  const { empId } = useParams();

  return (
    <EmployeeRegisterForm empId={empId} type={"Update"}/>
  );
};
