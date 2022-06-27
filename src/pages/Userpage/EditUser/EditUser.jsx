import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function EditUser() {
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="row">Edit user</div>
    </>
  );
}

export default EditUser;
