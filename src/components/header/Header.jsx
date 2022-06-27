import React from "react";
// import { Search } from "@material-ui/icons";
import "./header.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Drawer from "../Drawer/Drawer";

import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Image } from "@material-ui/icons";

function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="header">
      {user ? (
        <>
          <div className="header-info">
            <Drawer />
          </div>
          <div className="headerUser">
            <Typography variant="body1">{user.name}</Typography>
            {user.avaterImg ? <img /> : <AccountCircleIcon />}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
