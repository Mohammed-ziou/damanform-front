import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  deleteUser,
  getUsers,
  reset,
  updateUser,
} from "../../redux/users/userSlice";
import CustomPaginationActionsTable from "./UserPagination";

function Userpage() {
  const [usersData, setUsersData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, message, isError, isSuccess, isUpdated } =
    useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteUser = (e, userId) => {
    e.preventDefault();
    // console.log(userId);
    dispatch(deleteUser(userId));
  };

  const handleMakeAdmin = (e, userInfo) => {
    e.preventDefault();
    const newUser = { ...userInfo };
    // console.log(newUser);
    newUser.isAdmin = !newUser.isAdmin;
    // console.log(newUser);
    dispatch(updateUser(newUser));
  };

  useEffect(() => {
    // if (!user.isAdmin) navigate("/");

    if (isError) console.log(message);

    if (!user.token) navigate("/login");

    dispatch(getUsers());
    console.log(users);

    setUsersData(users);

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    if (!user.isAdmin) navigate("/");
    dispatch(getUsers());
  }, [isUpdated, dispatch, navigate]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isSuccess) {
    return (
      <>
        {user.token ? (
          <div className="container">
            <div className="row w-100">
              <div className="col-4">
                <Link to="/">
                  <button className="btn btn-success">Add new</button>
                </Link>
              </div>
              <div className="col-4"></div>
              <div className="col-4"></div>
            </div>
            <div className="row">
              <CustomPaginationActionsTable
                users={users}
                handleDeleteUser={handleDeleteUser}
                handleMakeAdmin={handleMakeAdmin}
              />
            </div>
          </div>
        ) : (
          navigate("/")
        )}
      </>
    );
  }
}

export default Userpage;
