import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "react-toastify/dist/ReactToastify.css";

import ModalDelete from "../../components/ModalDelete";
import { useEffect, useState } from "react";
import ModalDetail from "../../components/ModalDetail";
import { getRoomByNumber } from "../../apis";

export default function Room({ room, handleDeleteRoom, handleDetailRoom }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [detailRoom, setDetailRoom] = useState();
  const loadDetailRoom = async () => {
    const res = await handleDetailRoom(room.numRoom);
    setDetailRoom(res);
  };

  useEffect(() => {
    loadDetailRoom();
  }, []);

  // delete
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  // detail
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const handleOpenModalDetail = () => setOpenModalDetail(true);
  const handleCloseModalDetail = () => setOpenModalDetail(false);

  const typeRoom =
    room.type === 1
      ? "Phòng bình dân"
      : room.type === 2
      ? "Phòng thương gia"
      : "Phòng Vip";

  return (
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
      />
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
              <Button size="small">Sửa</Button>
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
  );
}
