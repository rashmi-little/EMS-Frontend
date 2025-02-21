import { Link, NavLink } from "react-router-dom";
import styles from "@styles/Navbar.module.css";
export default () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.navLinks}>
        <NavLink
          to="/dashboard/employee"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : `${styles.navItem} ${styles.inactive}`
          }
        >
          Employee
        </NavLink>

        <NavLink
          to="/dashboard/department"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : `${styles.navItem} ${styles.inactive}`
          }
        >
          Department
        </NavLink>
      </div>

      <div className={styles.logoutContainer}>
        <Link to="/logout" className={styles.logoutLink}>
          Logout
        </Link>
      </div>
    </nav>
  );
};
