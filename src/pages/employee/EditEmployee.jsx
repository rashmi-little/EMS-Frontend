import { useParams } from "react-router-dom";
import EmployeeRegisterForm from "../../components/EmployeeRegisterForm";

export default () => {
  const { empId } = useParams();

  return <EmployeeRegisterForm empId={empId} type={"Update"} />;
};
