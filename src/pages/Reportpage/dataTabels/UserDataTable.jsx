import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { getUsers, reset } from "../../../redux/users/userSlice";
import { useNavigate } from "react-router";

const column = [
  { field: "id", headerName: "ID", width: 150, sortable: false },
  { field: "name", headerName: "Name", width: 150 },
  { field: "responses", headerName: "Total Responses", width: 200 },
  { field: "weeklyRes", headerName: "Week Responses", width: 200 },
];

function UserDataTable() {
  const [usersTD, setUsersTd] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { users, isSuccess, isUpdated, message, isLoading, isError } =
    useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) console.log(message);

    if (!user.token) navigate("/login");

    dispatch(getUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (users) setUsersTd(users);
    // console.log(users);
    // console.log(usersTD);
  }, [users]);

  const rows = [
    ...usersTD.map((u, i) => ({
      id: i + 1,
      name: u.name,
      responses: u.responsesCollected,
      weeklyRes: u.weeklyRes || 0,
      mongoId: u._id,
    })),
  ];

  if (isLoading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "70vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      {usersTD.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={column}
          pageSize={5}
          rowsPerPageOptions={[5]}
        ></DataGrid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default UserDataTable;
