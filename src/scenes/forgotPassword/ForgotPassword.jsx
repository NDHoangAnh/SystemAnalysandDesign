import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Copyright from "../../components/Conpyright";
import ForgotStyle from "./ForgotPassword.style";
import { route } from "../../configs/route";
import backgroundImage from "../../images/authbackground.jpg";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  return (
    <>
      <ToastContainer />
      <ForgotStyle>
        <Grid container component="main" className="grid-container">
          <CssBaseline />
          <Grid item xs={7}>
            <img
              src={backgroundImage}
              alt="background"
              className="background-image"
            />
          </Grid>
          <Grid item xs={5}>
            <Box className="box">
              <Avatar className="avatar round-border">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Forgot password
              </Typography>
              <Box
                component="form"
                noValidate
                className="round-border"
                sx={{ width: "30vw", mt: 2 }}
              >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  margin="normal"
                  className="text-field"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="button"
                >
                  Sign in
                </Button>
                <Grid container>
                  <Grid item>
                    <NavLink name="register" to={route.LOGIN} variant="body2">
                      Have account ? Sign in
                    </NavLink>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    <NavLink
                      name="register"
                      to={route.REGISTER}
                      variant="body2"
                    >
                      Dont have account yet?
                    </NavLink>
                  </Grid>
                </Grid>
                <Copyright />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ForgotStyle>
    </>
  );
};

export default ForgotPassword;
