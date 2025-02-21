import { useParams } from "react-router-dom";
import DepartmentRegisterForm from "../../components/DepartmentRegisterForm";

export default () => {
  const { deptId } = useParams();

  return <DepartmentRegisterForm deptId={deptId} type={"Update"} />;
};
