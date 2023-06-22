import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Copyright from "../../components/Conpyright";
import LoginStyle from "./Login.style";
import { route } from "../../configs/route";
import backgroundImage from "../../images/authbackground.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../apis";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateFormLogin = () => {
    const { password, email } = user;
    if (email === "") {
      toast.error("Vui lòng nhập email");
      return false;
    } else if (password === "") {
      toast.error("Vui lòng nhập mật khẩu");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let check = validateFormLogin();
    if (check) {
      const { password, email } = user;
      console.log(user);
      const data = await login({ email, password });
      if (data.user === undefined || data.user === null) {
        toast.error(data.message);
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message);
        navigate(route.HOMEPAGE);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <LoginStyle>
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
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={(e) => handleSubmit(e)}
                className="round-border"
              >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  className="text-field"
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className="text-field"
                  onChange={(e) => handleChange(e)}
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
                    <NavLink
                      name="register"
                      to={route.REGISTER}
                      variant="body2"
                    >
                      Don&apos;t have an account? Sign up
                    </NavLink>
                  </Grid>
                </Grid>
                <Copyright />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </LoginStyle>
    </>
  );
};

export default Login;
