import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/api.service";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await logout();          
      navigate("/login");      
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col space-y-3">
      <h1 className="font-bold text-4xl">Welcome to Dashboard</h1>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="px-5 py-3 bg-orange-500 font-bold text-white rounded-sm cursor-pointer disabled:opacity-60"
      >
        {loading ? "Logging out..." : "Log out"}
      </button>
    </div>
  );
};

export default Dashboard;
