import React from "react";
import { Add, DeleteForever, Edit, PlayForWork } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";

function SingleForm({ doc, handleResponseDownload, handleFormDelete }) {
  return (
    <div>
      <Paper elevation={10} className="my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{doc.title}</h5>
            <p className="card-text ">{doc.description}</p>
            <div className="responseCounter">
              <p>Responses: {doc.response.length}</p>
            </div>
            <div className="row ">
              <div className="col-6 px-1">
                <Link to={`/form/edit/${doc._id}`}>
                  <button className="btn btn-forms btn-outline-primary d-flex justify-content-evenly">
                    <Edit />
                    Edit
                  </button>
                </Link>
              </div>
              <div className="col-6 px-1">
                <button
                  className="btn btn-forms btn-outline-danger d-flex justify-content-evenly"
                  onClick={(e) => handleFormDelete(e, doc._id)}
                >
                  <DeleteForever />
                  Delete
                </button>
              </div>
              <div className="col-12 px-1">
                <a
                  href={`https://damanapi.herokuapp.com/api/docs/${doc._id}/download`}
                  target="_blank"
                  className="btn btn-forms btn-outline-success mt-2 py-2 d-flex justify-content-center"
                >
                  Download Responses
                  <PlayForWork />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default SingleForm;
