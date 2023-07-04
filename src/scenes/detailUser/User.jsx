import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Avatar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { editUser } from "../../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function User() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: user.email,
    phone: user.phone_number,
    username: user.username,
    // address: user.address ? user.address : "",
  });

  const handleOnChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleEditUser = async () => {
    setLoading(true);
    const res = await editUser(userInfo);
    toast.success(res.message);
    setLoading(false);
    localStorage.setItem("user", JSON.stringify(res.user));
  };

  return (
    <>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80vw",
          gap: "1rem",
          margin: "0 auto",
          marginTop: "10vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 56, height: 56 }}></Avatar>
        </div>
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

        {/* <FormControl>
          <InputLabel htmlFor="phone">Địa chỉ</InputLabel>
          <Input
            id="address"
            aria-describedby="helper-name"
            name="address"
            value={userInfo.address ? userInfo.address : ""}
            onChange={(e) => handleOnChange(e)}
          />
        </FormControl> */}

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
