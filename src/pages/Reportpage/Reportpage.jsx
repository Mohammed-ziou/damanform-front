import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Grid, Paper, Typography } from "@material-ui/core";

import UserDataTable from "./dataTabels/UserDataTable";
import FormsDataTable from "./dataTabels/FormsDataTable";

import "./reports.css";

function Reportpage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <Typography variant="h3" className="reports-main-header">
            User
          </Typography>
          <Paper elevation={5} className="main-report-container">
            <UserDataTable />
          </Paper>
          <Typography variant="h3" className="reports-main-header">
            Forms
          </Typography>
          <Paper elevation={5} className="main-report-container mb-5">
            <FormsDataTable />
          </Paper>
        </div>
        <Paper elevation={10} className="reportsFooter">
          <Typography variant="caption">HololTech</Typography>
        </Paper>
      </Grid>
    </>
  );
}

export default Reportpage;
