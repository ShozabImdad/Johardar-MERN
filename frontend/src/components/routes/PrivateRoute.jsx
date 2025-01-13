// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
import { Outlet, useNavigate,Navigate } from "react-router-dom";
// import axios from "axios";
// import Spinner from "../Spinner";

const PrivateRoute = () => {
  const auth=JSON.parse(localStorage.getItem("auth"))

//   console.log(ok)

// const authCheck = async () => {
//     try {
//       const  data  = await axios.get(
//         "http://localhost:5972/api/auth/userauth",
//         {
//           withCredentials: true,
//         }
//       );
//       console.log(data)
//       if (data?.ok) {
//         setOk(true);
//       } 
//     } catch (error) {
//       setOk(false);
//       navigate("/login");
//     }
//   };

//   useEffect(() => {


//     if (auth?.authToken) authCheck();
//     else navigate("/login");
//   }, [navigate]);

  return  auth?.user?.email? <Outlet /> : <Navigate to={"/login"}/>;
};

export default PrivateRoute;
