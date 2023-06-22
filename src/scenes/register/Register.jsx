import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import isEmail from "validator/lib/isEmail";
import Copyright from "../../components/Conpyright";
import RegisterStyle from "./Register.style";
import { route } from "../../configs/route";
import backgroundImage from "../../images/authbackground.jpg";
import { register } from "../../apis";

const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const renderCheckEmail = () => {
    if (!isEmail(email)) return "Email is not valid";
    return "";
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const checkInputValid = ({
    email,
    username,
    phone_number,
    password,
    confirm_pass,
  }) => {
    const input = [email, username, phone_number, password, confirm_pass];
    let isInputFilled = true;

    input.forEach((value) => {
      if (value === "") {
        isInputFilled = false;
      }
    });

    if (!isInputFilled) {
      toast.warning("Vui lòng điền đầy đủ thông tin");
      return false;
    }

    if (!isEmail(email)) {
      toast.error("Email không hợp lệ");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      username: data.get("username"),
      phone_number: data.get("phone_number"),
      password: data.get("password"),
      confirm_pass: data.get("confirm_pass"),
    };

    if (checkInputValid(payload)) {
      if (payload.password !== payload.confirm_pass) {
        toast.error("Mật khẩu xác nhận không đúng");
        return;
      }

      try {
        const result = await register(payload);
        if (result.saveUser === null || result.saveUser === undefined) {
          toast.error(result.message);
        } else {
          toast.success(result.message);
          navigate(route.LOGIN);
        }
      } catch (error) {
        toast.error("Something is wrong");
      }
    }
    return;
  };

  return (
    <RegisterStyle>
      <ToastContainer theme="colored" />
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => handleSubmit(e)}
              className="form-box"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="First name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phone_number"
                    label="Phone number"
                    name="phone_number"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChangeEmail}
                    error={email !== "" && !isEmail(email)}
                    helperText={renderCheckEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm_pass"
                    label="Confirm password"
                    type="password"
                    id="confirm_pass"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="button"
              >
                Sign up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to={route.LOGIN} variant="body2">
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright />
        </Grid>
      </Grid>
    </RegisterStyle>
  );
};

export default Register;
