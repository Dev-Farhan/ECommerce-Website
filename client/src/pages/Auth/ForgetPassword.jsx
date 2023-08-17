import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { ForgetPass } from "../../utils/APIRoutes";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    answer: "",
    newPassword: "",
  });
  //   const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  //   const location = useLocation();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const { email, newPassword, answer } = values;
        const res = await axios.post(ForgetPass, {
          email,
          newPassword,
          answer,
        });

        if (res && res.data.success) {
          //   console.log(res);
          toast.success("Forget Password Successfully");

          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleValidation = () => {
    const { email, newPassword, answer } = values;
    if (email === "") {
      toast.error("Email is required !");
      return false;
    } else if (newPassword < 8) {
      toast.error("Password should be greater than 8 character !");
      return false;
    } else if (answer === "") {
      toast.error("Please Enter Your Answer!");
      return false;
    }
    return true;
  };

  return (
    <Layout>
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
            <form className="register-form" onSubmit={handleSubmit}>
              <h2 className="mb-3">Rest Password 🧾</h2>

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
                  type="text"
                  name="answer"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Favorite Sport "
                  autoComplete="off"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  placeholder="Enter Password "
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update It
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}
