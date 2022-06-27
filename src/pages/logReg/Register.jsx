import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

import { register, reset } from "../../redux/auth/authSlice";

import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password2: "",
  });

  const { name, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isLoading, isSuccess, message, navigate, dispatch]);

  const handleFormInput = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("hello");
    if (password !== password2) {
      toast.error("Password don't match");
    } else {
      const userData = {
        name,
        password,
      };
      console.log(userData);
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="login-cont">
      <div className="login-sec-cont">
        <h1>Create an Account</h1>
        <form onSubmit={handleRegister}>
          <div className="form-log">
            <TextField
              name="name"
              label="Name"
              className="my-3"
              value={name}
              onChange={handleFormInput}
            />
            <TextField
              name="password"
              label="Password"
              className="my-3"
              value={password}
              onChange={handleFormInput}
            />
            <TextField
              name="password2"
              label="Confirm Password"
              className="my-3"
              value={password2}
              onChange={handleFormInput}
            />
            <button
              className=" my-3 btn btn-success"
              type="submit"
              onSubmit={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
        <Link className="link" to={"/login"}>
          Already have an account?
        </Link>
      </div>
    </div>
  );
}

export default Login;
