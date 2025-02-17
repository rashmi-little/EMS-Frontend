import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import ViewEmployeeDetails from "./ViewEmployeeDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeTable/>}></Route>
          <Route path="/employee/create" element={<CreateEmployee/>}></Route>
          <Route path="/employee/edit/:empId" element={<EditEmployee/>}></Route>
          <Route path="/employee/view/:empId" element={<ViewEmployeeDetails/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
