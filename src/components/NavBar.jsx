import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { route } from "../configs/route";

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const login = () => {
    navigate(route.LOGIN);
  };
  const register = () => {
    navigate(route.REGISTER);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hotel
          </Typography>
          {(user === undefined || user === null) && (
            <>
              <Button color="inherit" onClick={() => login()}>
                Đăng nhập
              </Button>
              <Button color="inherit" onClick={() => register()}>
                Đăng ký
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
