import { useState, useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const authCheck = async () => {
    try {
      console.log("Checking auth...");
      const { data } = await axios.get(
        "http://localhost:5972/api/auth/user-auth",
        {
          withCredentials: true
        }
      );
      console.log("Auth response:", data);
      
      if (data?.ok) {
        console.log("Auth successful");
        setOk(true);
      } else {
        console.log("Auth failed - no success in response");
        setOk(false);
      }
    } catch (error) {
      console.log("Auth error:", error);
      setOk(false);
      navigate("/login");
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("Current auth from localStorage:", auth);
    if (auth?.user) {
      authCheck();
    } else {
      console.log("No user found in localStorage");
      setLoading(false);
      setOk(false);
    }
  }, [auth?.user]);

  if (loading) return <Spinner />;
  
  return ok ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
