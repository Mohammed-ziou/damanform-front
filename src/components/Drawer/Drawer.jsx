import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import {
  AssessmentOutlined,
  FormatAlignLeft,
  Menu,
  Person,
  ExitToApp,
  ExitToAppOutlined,
  PeopleAltOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut, reset } from "../../redux/auth/authSlice";
import "./Drawer.css";

function Drawer() {
  const [state, setState] = useState({ left: false });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const handleLogOut = (e) => {
    dispatch(logOut());
    dispatch(reset());
  };

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer("left", true)}>
          <Menu />
        </IconButton>
        <SwipeableDrawer
          className="left-drawer"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
          anchor={"left"}
        >
          <Paper className="p-4">
            <Typography variant="h4" className="drawer-heading">
              Daman Survey
            </Typography>

            <Divider />
            <div>
              <List>
                <Link className="list-items-links" to="/">
                  <ListItem button key={"survey"} className={"list-items"}>
                    <ListItemIcon>
                      <FormatAlignLeft />
                    </ListItemIcon>
                    <ListItemText primary={"Survey"} />
                  </ListItem>
                </Link>
              </List>
              <List>
                <Link className="list-items-links" to="/reports">
                  <ListItem button key={"reports"} className={"list-items"}>
                    <ListItemIcon>
                      <AssessmentOutlined />
                    </ListItemIcon>
                    <ListItemText primary={"Reports"} />
                  </ListItem>
                </Link>
              </List>
              <Divider />
              <List>
                {user.isAdmin ? (
                  <Link className="list-items-links" to="/users">
                    <ListItem button key={"users"} className={"list-items"}>
                      <ListItemIcon>
                        <PeopleAltOutlined />
                      </ListItemIcon>
                      <ListItemText primary={"Users"} />
                    </ListItem>
                  </Link>
                ) : (
                  console.log(user.id)
                )}
              </List>
              {user ? (
                <React.Fragment>
                  <Divider />
                  <List>
                    <button className="logout-btn" onClick={handleLogOut}>
                      <ListItem button key={"users"} className={"list-items"}>
                        <ListItemIcon>
                          <ExitToApp />
                        </ListItemIcon>
                        <ListItemText primary={"Log out"} />
                      </ListItem>
                    </button>
                  </List>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Divider />
                  <List>
                    <Link className="list-items-links" to="/users">
                      <ListItem button key={"users"} className={"list-items"}>
                        <ListItemIcon>
                          <ExitToAppOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Login"} />
                      </ListItem>
                    </Link>
                    <Link className="list-items-links" to="/users">
                      <ListItem button key={"users"} className={"list-items"}>
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        <ListItemText primary={"Register"} />
                      </ListItem>
                    </Link>
                  </List>
                </React.Fragment>
              )}
            </div>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

export default Drawer;
