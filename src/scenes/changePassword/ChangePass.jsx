import React, { useState } from "react";
import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePassword } from "../../apis";
function ChangePass() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [infoToChange, setInfoToChange] = useState({
    old_pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  const handleOnChangePass = (e) => {
    setInfoToChange({ ...infoToChange, [e.target.name]: e.target.value });
  };

  const changePass = async () => {
    const result = await changePassword({ ...infoToChange, email: user.email });
    if (result.message === "Cập nhật mật khẩu thành công") {
      toast.success(result.message);
    } else {
      toast.warning(result.message);
    }
    setInfoToChange({
      old_pass: "",
      new_pass: "",
      confirm_pass: "",
    });
    window.location.reload();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "25vw",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <FormControl>
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

        <FormControl>
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

        <FormControl>
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
