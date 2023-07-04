import React, { useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePassword } from "../../apis";
import LockOpenIcon from "@mui/icons-material/LockOpen";
function ChangePass() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [infoToChange, setInfoToChange] = useState({
    old_pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  const handleOnChangePass = (e) => {
    setInfoToChange({ ...infoToChange, [e.target.name]: e.target.value });
  };

  const changePass = async () => {
    setLoading(true);
    const result = await changePassword({ ...infoToChange, email: user.email });
    if (result.message === "Cập nhật mật khẩu thành công") {
      toast.success(result.message);
    } else {
      toast.warning(result.message);
    }
    setLoading(false);
    setInfoToChange({
      old_pass: "",
      new_pass: "",
      confirm_pass: "",
    });
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
          marginTop: "10vh",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 56, height: 56 }}>
            <LockOpenIcon />
          </Avatar>
        </div>
        <FormControl sx={{ mb: 2 }}>
          <InputLabel htmlFor="old_pass">Nhập mật khẩu hiện tại</InputLabel>
          <Input
            id="old_pass"
            aria-describedby="helper-name"
            name="old_pass"
            value={infoToChange.old_pass}
            type="password"
            onChange={(e) => handleOnChangePass(e)}
          />
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <InputLabel htmlFor="new_pass">Nhập mật khẩu mới</InputLabel>
          <Input
            id="new_pass"
            aria-describedby="helper-name"
            name="new_pass"
            value={infoToChange.new_pass}
            onChange={(e) => handleOnChangePass(e)}
            type="password"
          />
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <InputLabel htmlFor="confirm_pass">Xác nhận mật khẩu mới</InputLabel>
          <Input
            id="confirm_pass"
            aria-describedby="helper-name"
            name="confirm_pass"
            value={infoToChange.confirm_pass}
            onChange={(e) => handleOnChangePass(e)}
            type="password"
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changePass()}
        >
          Xác nhận
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

export default ChangePass;
