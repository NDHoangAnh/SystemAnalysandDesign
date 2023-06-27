import { useEffect, useState } from "react";
import { getAllRooms, deleteRoom, addRoom } from "../../apis";
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
import "./AllRooms.css";

function AllRooms() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rooms, setRooms] = useState([]);

  const [infoRoom, setInfoRoom] = useState({
    numRoom: null,
    description: "",
    image_1: "",
    image_2: "",
    type: 0,
    service: [],
  });

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOnChangeInfoRoom = (e) => {
    setInfoRoom({ ...infoRoom, [e.target.name]: e.target.value });
  };

  const handleDeleteRoom = async (num) => {
    const deleteResult = await deleteRoom(num);
    toast.success(deleteResult.message);
    const result = await getAllRooms();
    setRooms(result);
  };

  const handleAddRoom = async () => {
    const addResult = await addRoom(infoRoom);
    if (addResult.saveRoom === undefined) {
      toast.error(addResult.message);
    } else {
      toast.success(addResult.message);
    }
    const results = await getAllRooms();
    setRooms(results);
    handleCloseDialog();
  };

  const loadRooms = async () => {
    const result = await getAllRooms();
    setRooms(result);
  };
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
        <div className="list-room">
          {rooms.map((room, index) => (
            <div>
              <Room room={room} key={index} />
            </div>
          ))}
        </div>
      )}
      {user.role === "admin" && (
        <>
          <div className="list-room">
            {rooms.map((room, index) => (
              <div>
                <Room
                  room={room}
                  key={index}
                  handleDeleteRoom={handleDeleteRoom}
                />
              </div>
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
                  <InputLabel htmlFor="numRoom">Số phòng</InputLabel>
                  <Input
                    id="numRoom"
                    aria-describedby="helper-name"
                    name="numRoom"
                    value={infoRoom.numRoom}
                    onChange={(e) => handleOnChangeInfoRoom(e)}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="description">Mô tả phòng</InputLabel>
                  <Input
                    id="description"
                    aria-describedby="helper-name"
                    name="description"
                    value={infoRoom.description}
                    onChange={(e) => handleOnChangeInfoRoom(e)}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="image_1">Ảnh mô tả số 1</InputLabel>
                  <Input
                    id="image_1"
                    aria-describedby="helper-name"
                    name="image_1"
                    value={infoRoom.image_1}
                    onChange={(e) => handleOnChangeInfoRoom(e)}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="image_2">Ảnh mô tả số 2</InputLabel>
                  <Input
                    id="image_2"
                    aria-describedby="helper-name"
                    name="image_2"
                    value={infoRoom.image_2}
                    onChange={(e) => handleOnChangeInfoRoom(e)}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="type">Ảnh mô tả số 2</InputLabel>
                  <Input
                    id="type"
                    aria-describedby="helper-name"
                    name="type"
                    value={infoRoom.type}
                    onChange={(e) => handleOnChangeInfoRoom(e)}
                  />
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
