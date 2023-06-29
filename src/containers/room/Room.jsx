import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModalDelete from "../../components/ModalDelete";
import { useEffect, useState } from "react";
import ModalDetail from "../../components/ModalDetail";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import DropDown from "../../components/DropDownSelect";

export default function Room({
  room,
  handleDeleteRoom,
  handleDetailRoom,
  listService,
  handleEditRoom,
  handleBooking,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [detailRoom, setDetailRoom] = useState();
  const loadDetailRoom = async () => {
    const res = await handleDetailRoom(room.numRoom);
    setDetailRoom(res);
  };

  // delete
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  // detail
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const handleOpenModalDetail = () => setOpenModalDetail(true);
  const handleCloseModalDetail = () => setOpenModalDetail(false);

  // edit
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const handleOpenDialogEdit = () => setOpenDialogEdit(true);
  const handleCloseDialogEdit = () => setOpenDialogEdit(false);

  const handleOnChangeEditRoom = (e) => {
    setDetailRoom({ ...detailRoom, [e.target.name]: e.target.value });
  };

  const _handleEditRoom = async (num, data) => {
    await handleEditRoom(num, data);
    handleCloseDialogEdit();
  };

  // booking

  const typeRoom =
    room.type === 1
      ? "Phòng bình dân"
      : room.type === 2
      ? "Phòng thương gia"
      : "Phòng Vip";

  useEffect(() => {
    loadDetailRoom();
  }, []);

  return (
    <>
      {detailRoom && room && (
        <>
          <ModalDelete
            open={openModalDelete}
            handleClose={handleCloseModalDelete}
            room={room}
            handleDeleteRoom={handleDeleteRoom}
          />

          <ModalDetail
            open={openModalDetail}
            handleClose={handleCloseModalDetail}
            room={detailRoom}
            handleBooking={handleBooking}
          />

          <Dialog open={openDialogEdit} onClose={handleCloseDialogEdit}>
            <DialogTitle>Chỉnh sửa phòng</DialogTitle>
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
                  <InputLabel htmlFor="description">Mô tả</InputLabel>
                  <Input
                    multiline={true}
                    id="description"
                    aria-describedby="helper-name"
                    name="description"
                    value={detailRoom.description}
                    onChange={(e) => handleOnChangeEditRoom(e)}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="image_1">Ảnh số 1</InputLabel>
                  <Input
                    id="image_1"
                    aria-describedby="helper-name"
                    name="image_1"
                    value={detailRoom.image_1}
                    onChange={(e) => handleOnChangeEditRoom(e)}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="image_2">Ảnh số 2</InputLabel>
                  <Input
                    id="image_2"
                    aria-describedby="helper-name"
                    name="image_2"
                    value={detailRoom.image_2}
                    onChange={(e) => handleOnChangeEditRoom(e)}
                  />
                </FormControl>

                <DropDown
                  type={true}
                  isEdit={true}
                  handleOnChangeEditRoom={handleOnChangeEditRoom}
                  detailRoom={detailRoom}
                />

                <DropDown
                  isService={true}
                  isEdit={true}
                  handleOnChangeEditRoom={handleOnChangeEditRoom}
                  detailRoom={detailRoom}
                  listService={listService}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogEdit}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => _handleEditRoom(detailRoom.numRoom, detailRoom)}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Card sx={{ maxWidth: 345, padding: "10px" }}>
            <CardMedia
              sx={{ height: "200px", objectFit: "contain", width: "350px" }}
              image={room?.image_1}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {`Phòng số ${room.numRoom}`}
                <Typography variant="body1" color="text.secondary">
                  {typeRoom}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {room.description}
              </Typography>
            </CardContent>
            <CardActions>
              {user.role === "admin" && (
                <>
                  <Button size="small" onClick={() => handleOpenDialogEdit()}>
                    Sửa
                  </Button>
                  <Button size="small" onClick={handleOpenModalDelete}>
                    Xóa
                  </Button>
                </>
              )}
              <Button size="small" onClick={handleOpenModalDetail}>
                Xem chi tiết
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </>
  );
}
