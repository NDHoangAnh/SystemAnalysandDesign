import { useEffect, useState } from "react";
import {
  getAllRooms,
  deleteRoom,
  addRoom,
  getAllServices,
  getRoomByNumber,
  editRoom,
  booking,
} from "../../apis";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Room from "../../containers/room/Room";
import "./AllRooms.css";
import DropDown from "../../components/DropDownSelect";

function AllRooms() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [rooms, setRooms] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [infoRoom, setInfoRoom] = useState({
    numRoom: null,
    description: "",
    image_1: "",
    image_2: "",
  });

  const [type, setType] = useState(null);
  const handleTypeChange = (_type) => {
    setType(_type);
  };

  const [serviceChoiceUser, setServiceChoiceUser] = useState(null);
  const handleChangeService = (_service) => {
    setServiceChoiceUser(_service);
  };

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
    setLoading(true);
    const deleteResult = await deleteRoom(num);
    toast.success(deleteResult.message);
    const result = await getAllRooms();
    setRooms(result);
    setLoading(false);
  };

  const handleAddRoom = async () => {
    setLoading(true);
    const addResult = await addRoom({
      ...infoRoom,
      type,
      service: serviceChoiceUser,
    });
    if (addResult.saveRoom === undefined) {
      toast.error(addResult.message);
    } else {
      toast.success(addResult.message);
    }
    setInfoRoom({
      numRoom: null,
      description: "",
      image_1: "",
      image_2: "",
    });
    setType(null);
    setServiceChoiceUser(null);
    const results = await getAllRooms();
    setRooms(results);
    setLoading(false);
    handleCloseDialog();
  };

  const handleDetailRoom = async (num) => {
    const result = await getRoomByNumber(num);
    return result;
  };

  const handleEditRoom = async (num, data) => {
    setLoading(true);
    const result = await editRoom(num, data);
    if (result.room === undefined) {
      toast.warning(result.message);
    } else {
      toast.success(result.message);
    }
    const results = await getAllRooms();
    setRooms(results);
    setLoading(false);
  };

  const handleBooking = async (data) => {
    setLoading(true);
    const result = await booking(data);
    if (result.saveBooking === undefined) {
      toast.warning(result.message);
    } else {
      alert(
        `Bạn đã đặt phòng này với tổng tiền là ${result.saveBooking.price} `
      );
      toast.success(result.message);
    }
    setLoading(false);
  };

  const loadRooms = async () => {
    setLoading(true);
    const result = await getAllRooms();
    setRooms(result);
    setLoading(false);
  };

  const loadService = async () => {
    setLoading(true);
    const result = await getAllServices();
    setServices(result);
    setLoading(false);
  };

  useEffect(() => {
    loadRooms();
    loadService();
  }, []);

  return (
    <>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <Room
                room={room}
                key={index}
                handleDetailRoom={handleDetailRoom}
                listService={services}
                handleBooking={handleBooking}
              />
            </div>
          ))}
        </div>
      )}
      {user.role === "admin" && (
        <>
          <div className="list-room">
            {rooms.map((room, index) => (
              <div className="test" sx={{ height: "100px" }}>
                <Room
                  room={room}
                  key={index}
                  listService={services}
                  handleDeleteRoom={handleDeleteRoom}
                  handleDetailRoom={handleDetailRoom}
                  handleEditRoom={handleEditRoom}
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

                <DropDown type={true} handleTypeChange={handleTypeChange} />
                <DropDown
                  isService={true}
                  listService={services}
                  handleChangeService={handleChangeService}
                />
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
