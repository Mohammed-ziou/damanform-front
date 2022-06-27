import * as React from "react";
import { TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logIn, reset } from "../../redux/auth/authSlice";

function Login() {
  const [formData, setFormData] = React.useState({ name: "", password: "" });

  const { name, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  React.useEffect(() => {
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

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      name,
      password,
    };
    console.log(userData);
    dispatch(logIn(userData));
  };

  return (
    <div className="login-cont">
      <div className="login-sec-cont">
        <h1>Login</h1>
        <form>
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
            <button
              className=" my-3 btn btn-success"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
        <Link className="link" to={"/register"}>
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}

export default Login;
