import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getForm, reset } from "../../../redux/docs/docSlice";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ResponsesChart from "./Responses/ResponsesChart";

const useStyles = makeStyles({
  main: {
    minWidth: "100%",
    minHeight: "100%",
    padding: "20px 30px",
  },
  title: {
    fontWeight: "bold",
    fontSize: "30px",
    textTransform: "capitalize",
    color: "#555",
  },
  restitle: {
    fontWeight: "bold",
    fontSize: "30px",
    textTransform: "capitalize",
    color: "#333",
  },
  resContainer: {
    fontWeight: "bold",
    color: "#eee",
    backgroundColor: "#444",
    borderRadius: "100px",
    padding: "5px 8px 3px",
    width: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    margin: "20px 0",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  text3: {
    margin: "20px 0",
    width: "100%",
    display: "flex",
    alignItems: "baseline",
  },
  titleHeading: {
    fontSize: "25px",
    textTransform: "capitalize",
    paddingRight: "5px",
    color: "#333",
    fontWeight: "bold",
  },
});

function FormReportPage() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const { doc, message, isError, isLoading } = useSelector(
    (state) => state.docs
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isError) console.log(message);

    if (!user.token) navigate("/login");

    dispatch(getForm(id));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, id]);

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
    <div className="container my-10px">
      <Paper elevation={2} className={`${classes.main} mt-4`}>
        <Typography className={classes.title}>
          <span className={classes.titleHeading}>Title:</span> {doc?.title}
        </Typography>
        <Typography className={classes.text3}>
          <span className={classes.titleHeading}>Description: </span>
          {doc?.description}
        </Typography>
        <Typography className={classes.text}>
          <span className={classes.titleHeading}>Total Responses: </span>
          <span className={classes.resContainer}>{doc?.response?.length}</span>
        </Typography>
      </Paper>
      <Typography className={classes.restitle}>Responses</Typography>
      <Paper elevation={5} className="p-5 my-3 w-100 h-100">
        <ResponsesChart doc={doc} />
      </Paper>
    </div>
  );
}

export default FormReportPage;
