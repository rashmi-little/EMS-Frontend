import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../css/DepartmentTable.module.css";
import "../../css/Base.css";
import { toast } from "react-toastify";
import {
  deleteDepartmentById,
  getDepartmentsInBatch,
} from "../../services/DepartmentService";

export default () => {
  const [departments, setDepartments] = useState([]);
  const [pageDepartments, setPageDepartments] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
    page: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const fetchDepartments = async () => {
    try {
      const response = await getDepartmentsInBatch(currentPage);

      const pageDepartments = response.data;
      setPageDepartments(pageDepartments);
      const departments = pageDepartments.content;

      if (departments.length == 0) {
        handlePageDecrease();
      }
      if (response.status !== 200) {
        throw new Error("unable to fetch departments");
      }

      setDepartments(departments);
    } catch (error) {
      toast.error(
        error.message || "something went wrong while fetching departments."
      );
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [currentPage]);

  function handleView(deptId) {
    navigate(`./view/${deptId}`);
  }

  function handleEdit(deptId) {
    navigate(`./edit/${deptId}`);
  }

  async function handleDelete(deptId) {
    if (
      window.confirm(
        "are you sure to delete the department with the id " + deptId
      )
    ) {
      try {
        const response = await deleteDepartmentById(deptId);

        if (response.status !== 204) {
          throw new Error("failed to delete");
        }

        setDepartments((prevDepartment) =>
          prevDepartment.filter((dept) => dept.id != deptId)
        );
        await fetchDepartments();
        toast.success("department deleted successfully");
      } catch (error) {
        toast.error("something went wrong. please try again later");
      }
    }
  }

  function handlePageDecrease() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function handlePageIncrease() {
    setCurrentPage((prev) => prev + 1);
  }
  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
        <h2 className={styles.h2}>Departments</h2>
        <Link to="./create" className={styles.addBtn}>
          + Add
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments &&
              departments.map((dept, index) => (
                <tr key={dept.id}>
                  <td>{index + 1}</td>
                  <td>{dept.name}</td>
                  <td>{dept.location}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.view}
                        onClick={() => handleView(dept.id)}
                      >
                        View
                      </button>
                      <button
                        className={styles.edit}
                        onClick={() => handleEdit(dept.id)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.delete}
                        onClick={() => handleDelete(dept.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationContainer}>
        <button
          className={styles.paginationButton}
          onClick={handlePageDecrease}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className={styles.paginationButton}
          onClick={handlePageIncrease}
          disabled={!(currentPage < pageDepartments.totalPages)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
