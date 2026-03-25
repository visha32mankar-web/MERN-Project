import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <h1>Welcome Admin Panel</h1>
    </>
  );
}

export default AdminDashboard;