import { useEffect, useState } from "react";
import { getAllRooms } from "../../apis";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [infoStaff, setInfoStaff] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleOnChangeInputStaff = (e) => {
    setInfoStaff({ ...infoStaff, [e.target.name]: e.target.value });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const loadStaff = async () => {
    const result = await getAllRooms();
    console.log(result);
    setRooms(result);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddStaff = () => {
    // Add staff logic here
    // ...
    // Close the dialog
    handleCloseDialog();
  };

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
                  <TableCell>Số phòng</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.map((room, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{room.numRoom}</TableCell>
                    <TableCell>{room.description}</TableCell>
                    <TableCell>
                      <Button>Chi tiết</Button>
                    </TableCell>
                    <TableCell>
                      <Button>Xóa</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Fab
            color="primary"
            onClick={handleOpenDialog}
            sx={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <AddIcon />
          </Fab>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add Room</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "25vw",
                }}
              >
                <FormControl>
                  <InputLabel htmlFor="name">Số phòng</InputLabel>
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
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddStaff}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default AllRooms;
