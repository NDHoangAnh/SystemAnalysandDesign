import { useEffect, useState } from "react";
import { getAllRooms, deleteRoom } from "../../apis";
import {
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
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Room from "../../containers/room/Room";

function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [infoRoom, setInfoRoom] = useState({
    numRoom: 0,
    description: "",
    image1: "",
    image2: "",
    type: 0,
    service: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  // const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const handleOnChangeInfoRoom = (e) => {
    setInfoRoom({ ...infoRoom, [e.target.name]: e.target.value });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const loadRooms = async () => {
    const result = await getAllRooms();
    setRooms(result);
  };

  // const handleOpenDetailDialog = () => {};

  // const handleCloseDetailDialog = () => {};

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteRoom = async (num) => {
    const deleteResult = await deleteRoom(num);
    toast.success(deleteResult.message);
    const result = await getAllRooms();
    setRooms(result);
  };

  const handleAddRoom = () => {
    // Add staff logic here
    // ...
    // Close the dialog
    handleCloseDialog();
  };
  console.log(rooms);

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <>
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
      {(user.role === "user" || user.role === "staff") && (
        <div>Bạn không có quyền xem nội dung này</div>
      )}
      {user.role === "admin" && (
        <>
          {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Số phòng</TableCell>
                  <TableCell>Mô tả</TableCell>
                  {user.role === "admin" && (
                    <TableCell align="center" colSpan={3}>
                      Action
                    </TableCell>
                  )}
                  {(user.role === "user" || user.role === "staff") && (
                    <TableCell align="center">Action</TableCell>
                  )}
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
                    <TableCell align="center">
                      <Button>Chi tiết</Button>
                    </TableCell>
                    {user.role === "admin" && (
                      <TableCell align="center">
                        <Button>Sửa</Button>
                      </TableCell>
                    )}
                    {user.role === "admin" && (
                      <TableCell align="center">
                        <Button onClick={() => handleDeleteRoom(room.numRoom)}>
                          Xóa
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          <div className="list-room">
            {rooms.map((room, index) => (
              <Room
                room={room}
                key={index}
                handleDeleteRoom={handleDeleteRoom}
              />
            ))}
          </div>
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
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <FormControl>
                  <InputLabel htmlFor="name">Số phòng</InputLabel>
                  <Input
                    id="name"
                    aria-describedby="helper-name"
                    name="name"
                    value={infoRoom.name}
                    onChange={(e) => handleOnChangeInfoRoom(e)}
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
                    value={infoRoom.email}
                    onChange={(e) => handleOnChangeInfoRoom(e)}
                  />
                  <FormHelperText id="helper-name">Nhập email</FormHelperText>
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="name">Số điện thoại</InputLabel>
                  <Input
                    id="email"
                    aria-describedby="helper-name"
                    name="email"
                    value={infoRoom.phone}
                    onChange={(e) => handleOnChangeInfoRoom(e)}
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
                onClick={handleAddRoom}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}

export default AllRooms;
