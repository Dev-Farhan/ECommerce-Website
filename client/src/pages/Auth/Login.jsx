import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { LoginRoute } from "../../utils/APIRoutes";
import { useAuth } from "../../contexts/auth";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const { email, password } = values;
        const res = await axios.post(LoginRoute, {
          email,
          password,
        });
        if (res && res.data.success) {
          toast.success("Register Successfully");
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
        } else {
          toast.error("Invalid Password");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    // } catch (error) {
    //   toast.error("Something went wrong", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    // }
    // toast.success("Register Succeccfull !", {
    //   position: toast.POSITION.TOP_CENTER,
    // });
  };
  const handleValidation = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email is required !");
      return false;
    } else if (password < 8) {
      toast.error("Password should be greater than 8 character !");
      return false;
    }
    return true;
  };

  return (
    <Layout title={"Login - Ecommerce App"}>
      <div className="container">
        <div className="row">
          <div className="col">
            <img
              className="loginImg"
              src="/images/login.avif"
              alt="Register img"
            />
          </div>
          <div className="col">
            <form onSubmit={handleSubmit} className="register-form">
              <h2 className="mb-3">Sign In 🧾</h2>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  autoComplete="off"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password "
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
              <div className="mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/forget-password");
                  }}
                >
                  Forget Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}
