import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
} from "@mui/material";
import { editUser } from "../../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function User() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [userInfo, setUserInfo] = useState({
    email: user.email,
    phone: user.phone_number,
    username: user.username,
  });

  const handleOnChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleEditUser = async () => {
    const res = await editUser(userInfo);
    toast.success(res.message);
    localStorage.setItem("user", JSON.stringify(res.user));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          gap: "50px",
          margin: "0 auto",
        }}
      >
        <FormControl>
          <InputLabel htmlFor="name">Email</InputLabel>
          <Input
            id="email"
            aria-describedby="helper-name"
            name="email"
            value={userInfo.email}
            disabled={true}
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="name">Họ tên</InputLabel>
          <Input
            id="name"
            aria-describedby="helper-name"
            name="username"
            value={userInfo.username}
            onChange={(e) => handleOnChange(e)}
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="phone">Số điện thoại</InputLabel>
          <Input
            id="phone"
            aria-describedby="helper-name"
            name="phone"
            value={userInfo.phone}
            onChange={(e) => handleOnChange(e)}
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditUser()}
        >
          Save
        </Button>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default User;
