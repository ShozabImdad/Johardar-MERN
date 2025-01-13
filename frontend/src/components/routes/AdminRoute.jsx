// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
//   const [ok, setOk] = useState(false);
// //   const [auth] = useAuth();
//   const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("auth"))

//   const authCheck = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:5972/api/auth/admin-auth",
//         {
//           withCredentials: true,
//         }
//       );
//       if (data.ok) {
//         setOk(true);
//       } else {
//         setOk(false);
//         navigate("/login");
//       }
//     } catch (error) {
//       setOk(false);
//       navigate("/login");
//     }
//   };

//   useEffect(() => {
    

//     if (auth?.authToken) authCheck();
//     else navigate("/login");
//   }, [auth?.authToken, navigate]);

  return auth?.user?.role === "admin" ? <Outlet /> : <Spinner />;
};

export default AdminRoute;
