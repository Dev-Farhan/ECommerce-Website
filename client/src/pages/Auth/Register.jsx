import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RegisterRoute } from "../../utils/APIRoutes";
import Layout from "../../components/Layout/Layout";

export default function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const { name, email, password, phone, address, answer } = values;
        const res = await axios.post(RegisterRoute, {
          name,
          email,
          password,
          phone,
          address,
          answer,
        });

        if (res && res.data.success) {
          // console.log(res);
          toast.success("Register Successfully");
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
    const { name, email, password, phone, address, answer } = values;
    if (name < 3) {
      toast.error("Name should be greater than 3 character !");
      return false;
    } else if (email === "") {
      toast.error("Email is required !");
      return false;
    } else if (password < 8) {
      toast.error("Password should be greater than 8 character !");
      return false;
    } else if (phone.length !== 10) {
      toast.error("Phone Number should be 10 digits !");
      return false;
    } else if (address === "") {
      toast.error("Address Required !");
      return false;
    } else if (answer === "") {
      toast.error("Answer Required !");
      return false;
    }
    return true;
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col">
            <img src="/images/regg.webp" alt="Register img" />
          </div>
          <div className="col">
            <form className="register-form" onSubmit={handleSubmit}>
              <h2 className="mb-3">Sign Up 🧾</h2>
              <div className="mb-3">
                <input
                  type="name"
                  name="name"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                  onChange={(e) => handleChange(e)}
                />
              </div>
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
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Enter Phone"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Enter Address"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="answer"
                  className="form-control"
                  placeholder="Enter Your Favoriate Sport"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}
