import { useState, useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const adminCheck = async () => {
    try {
      console.log("Checking admin auth...");
      const { data } = await axios.get(
        "http://localhost:5972/api/auth/admin-auth",
        {
          withCredentials: true
        }
      );
      console.log("Admin auth response:", data);
      
      if (data?.ok) {
        console.log("Admin auth successful");
        setOk(true);
      } else {
        console.log("Admin auth failed - no success in response");
        setOk(false);
      }
    } catch (error) {
      console.log("Admin auth error:", error);
      setOk(false);
      navigate("/login");
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("Current admin auth from localStorage:", auth);
    if (auth?.user?.role === "admin") {
      adminCheck();
    } else {
      console.log("No admin user found in localStorage");
      setLoading(false);
      setOk(false);
    }
  }, [auth?.user]);

  if (loading) return <Spinner />;
  
  return ok ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
