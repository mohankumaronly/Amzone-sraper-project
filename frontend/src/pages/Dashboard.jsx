import { useNavigate } from "react-router-dom";
import { logout } from "../services/api.service";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();      // backend clears cookies
      logoutUser();        // frontend clears auth state
      navigate("/login");  // routing now works
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button onClick={handleLogout}>
      Log out
    </button>
  );
};

export default Dashboard;
