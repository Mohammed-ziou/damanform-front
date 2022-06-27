import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import { useNavigate } from "react-router";

import { getForms, getFormsCount, reset } from "../../../redux/docs/docSlice";

import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 150, sortable: false, hide: true },
  { field: "name", headerName: "Title", width: 200 },
  { field: "totalRes", headerName: "Total Responses", width: 200 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      return (
        <Link to={`/reports/${params.id}`} className="btn btn-primary">
          Report
        </Link>
      );
    },
  },
  {
    field: "download",
    headerName: "Download Responses",
    width: 180,
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking
        console.log(params);
      };

      return (
        <a
          href={`https://damanapi.herokuapp.com/api/docs/${params.id}/download`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-success"
        >
          Download
        </a>
      );
    },
  },
];

function FormsDataTable() {
  const [formsTD, setFormsTd] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { docs, message, isLoading, isError } = useSelector(
    (state) => state.docs
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) console.log(message);

    if (!user.token) navigate("/login");

    const querys = { query: "", pN: -1 };
    dispatch(getFormsCount());
    dispatch(getForms(querys));

    return () => dispatch(reset());
  }, [user, navigate, isError, message]);

  useEffect(() => {
    if (docs) setFormsTd(docs);
    dispatch(getFormsCount());
  }, [docs]);

  let rows = [
    ...formsTD.map((f) => ({
      id: f._id,
      name: f.title,
      totalRes: f.response?.length || 0,
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
    <div style={{ height: 450, width: "100%" }}>
      {docs ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
        ></DataGrid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default FormsDataTable;
