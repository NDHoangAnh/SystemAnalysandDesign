import { useEffect, useState } from "react";
import { getAllStaffs } from "../../apis";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
function AllStaffs() {
  const [staffs, setStaffs] = useState([]);
  const [infoStaff, setInfoStaff] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleOnChangeInputStaff = (e) => {
    setInfoStaff({ ...infoStaff, [e.target.name]: e.target.value });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const loadStaff = async () => {
    const result = await getAllStaffs();
    setStaffs(result);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <>
      {(user.role === "user" || user.role === "staff") && (
        <div>Bạn không có quyền xem nội dung này</div>
      )}
      {user.role === "admin" && (
        <div className="list-staff">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffs.map((staff, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.username}</TableCell>
                    <TableCell>{staff.phone_number}</TableCell>
                    <TableCell>
                      <Button>Xóa</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <FormControl>
              <InputLabel htmlFor="name">Họ tên</InputLabel>
              <Input
                id="name"
                aria-describedby="helper-name"
                name="name"
                value={infoStaff.name}
                onChange={(e) => handleOnChangeInputStaff(e)}
              />
              <FormHelperText id="helper-name">
                Nhập tên nhân viên
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="name">Email</InputLabel>
              <Input
                id="email"
                aria-describedby="helper-name"
                name="email"
                value={infoStaff.email}
                onChange={(e) => handleOnChangeInputStaff(e)}
              />
              <FormHelperText id="helper-name">Nhập email</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="name">Số điện thoại</InputLabel>
              <Input
                id="email"
                aria-describedby="helper-name"
                name="email"
                value={infoStaff.phone}
                onChange={(e) => handleOnChangeInputStaff(e)}
              />
              <FormHelperText id="helper-name">Nhập email</FormHelperText>
            </FormControl>

            <Button variant="contained" color="success">
              Submit
            </Button>
          </Box>
        </div>
      )}
    </>
  );
}

export default AllStaffs;
