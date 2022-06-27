import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Add } from "@material-ui/icons";

import { CircularProgress, Grid, Paper, Typography } from "@material-ui/core";
import {
  deleteForm,
  getForms,
  getFormsCount,
  reset,
} from "../../redux/docs/docSlice";

import "./forms.css";
import { downloadRes } from "../../redux/response/resSlice";
import SingleForm from "../../components/SingleForm/SingleForm";

function Forms() {
  const [query, setQuery] = useState("");
  const [pN, setPN] = useState(1);
  const [pageCount, setPageCount] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { docs, isLoading, message, isError, count } = useSelector(
    (state) => state.docs
  );

  const handlePervious = () => {
    setPN((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  };
  const handleNext = () => {
    setPN((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  };

  const getDocOffset = (num) => {
    const querys = { query, pN: num || pN };
    dispatch(getForms(querys));
  };

  useEffect(() => {
    getDocOffset();
  }, [pN]);

  useEffect(() => {
    if (query.length === 0 || query.length > 2) {
      getDocOffset(1);
    }
  }, [query]);

  const handleResponseDownload = (e, docId) => {
    dispatch(downloadRes(docId));
  };

  const handleFormDelete = (e, docId) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete this form? all data including all the responses will be deleted, there is no coming back!!!"
      )
    ) {
      dispatch(deleteForm(docId));
    }
  };

  useEffect(() => {
    if (isError) console.log(message);

    if (!user.token) navigate("/login");

    const querys = { query, pN };
    dispatch(getFormsCount());
    dispatch(getForms(querys));

    return () => dispatch(reset());
  }, [user, navigate, isError, message]);

  useEffect(() => {
    setPageCount(Math.ceil(count / 6));
  }, [count]);

  // const handleSearchClick = (e) => {
  //   e.preventDefault();
  //
  //   if (query.length > 2) {
  //     console.log("hello");
  //     const querys = { query, pN: 1 };
  //     dispatch(getForms(querys));
  //   }
  // };

  // if (isLoading) {
  //   return (
  //     <Grid
  //       container
  //       spacing={0}
  //       direction="column"
  //       alignItems="center"
  //       justifyContent="center"
  //       style={{ minHeight: "70vh" }}
  //     >
  //       <CircularProgress />
  //     </Grid>
  //   );
  // }

  return (
    <div className="container">
      <div className="row search-header"></div>

      <div className="row d-flex justify-content-end my-5 w-100 align-items-center">
        <div className="col-12 col-md-6 my-3">
          <Link to="/forms/new">
            <button className="btn btn-success w-100">
              <Add />
              Create New Form
            </button>
          </Link>
        </div>
        <div className="col-12 col-md-6 d-flex ">
          <div className="col-12">
            <input
              type="query"
              className="form-control mr-sm-2 h-100"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder={"search"}
            />
          </div>
          <div className="col-4">
            {/* <button
              className="btn btn-outline-success w-100"
              type="submit"
              onClick={handleSearchClick}
            >
              Search <Search />
            </button> */}
          </div>
        </div>
      </div>
      <Paper elevation={3} className="p-3 w-100">
        {isLoading ? (
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
        ) : (
          <>
            <div className="row text-center">
              <Typography variant="h3">Forms</Typography>
            </div>
            <div className="row">
              {docs.length > 0 ? (
                docs.map((doc) => (
                  <div
                    className={`col-12 col-sm-6 col-md-4 ${""}`}
                    key={doc._id}
                  >
                    <SingleForm
                      doc={doc}
                      handleFormDelete={handleFormDelete}
                      handleResponseDownload={handleResponseDownload}
                    />
                  </div>
                ))
              ) : (
                <h3>Create your first form</h3>
              )}
              {/* <TablePagination count={10} /> */}
            </div>

            {docs.length > 0 && (
              <>
                <div className="mt-5 py-3 d-flex justify-content-center align-items-center">
                  <button
                    disabled={pN === 1}
                    className="btn mx-2"
                    onClick={handlePervious}
                  >
                    Pervious
                  </button>
                  <div>{`page ${pN} of ${pageCount}`}</div>
                  <button
                    className="btn mx-2"
                    disabled={pN === pageCount}
                    onClick={handleNext}
                  >
                    Next
                  </button>

                  {/* <select
          className="p-2"
          onChange={(e) => {
            const { value } = e.target;
            if (page !== value) setPage(parseInt(value, 10));
          }}
        >
          {Array(pageCount)
            .fill(null)
            .map((_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
        </select> */}
                </div>
              </>
            )}
          </>
        )}
      </Paper>
    </div>
  );
}

export default Forms;
