import { Box, Button, Modal } from "@mui/material";

import "./ModalDetail.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "fit-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  alignItems: "center",
};
const ModalDetail = (props) => {
  const { open, handleClose, room } = props;
  return (
    <div>
      <Modal
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="image-room" sx={{ width: "50vw", height: "20vh" }}>
            <img
              className="image-room-detail"
              src={room.image_1}
              alt="demo-1"
            />
            <img
              className="image-room-detail"
              src={room.image_2}
              alt="demo-2"
            />
          </Box>
          <Box className="info-room">{room.description}</Box>
          <Button style={{ bottom: 0 }}>Đặt phòng</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDetail;
