import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "../Layout/Spinner";
import { useAuth } from "../../contexts/auth";
import { UserAuth } from "../../utils/APIRoutes";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(UserAuth, {
          headers: {
            Authorization: auth?.token,
          },
        });
        console.log(response.data);
        if (response.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle the 404 error here
          console.log("Request failed with status code 404");
        } else {
          // Handle other errors
          console.log("An error occurred:", error.message);
        }
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
