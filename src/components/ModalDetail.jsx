import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Modal,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import "./ModalDetail.css";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

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
  alignItems: "center",
};

const ModalDetail = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { open, handleClose, room, booking, userbooking, handleBooking } =
    props;
  const serviceBooking = userbooking && userbooking.roomDetail.service;

  const [openFormBooking, setOpenFormBooking] = useState(false);
  const showForm = () => setOpenFormBooking(true);
  const closeForm = () => setOpenFormBooking(false);

  console.log(room);

  const [bookingData, setBookingData] = useState({
    user_id: user._id,
    room_id: room && room._id,
    slot: 1,
    phone_number: null,
    fullName: "",
    gender: "",
    address: "",
  });

  const onChangeBookingData = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [date_of_birth, setDateOfBirth] = useState(null);

  // const onChangeStartDate = (_date) => {
  //   const date = new Date(_date);
  //   const formattedDate = date.toISOString();
  //   setStartDate(formattedDate);
  // };

  const onChangeStartDate = (_date) => {
    if (!_date) {
      return;
    }

    const date = new Date(_date);

    if (isNaN(date)) {
      console.log("Invalid date");
      return;
    }

    const formattedDate = date.toISOString();
    setStartDate(formattedDate);
  };

  const onChangeEndDate = (_date) => {
    if (!_date) {
      return;
    }

    const date = new Date(_date);

    if (isNaN(date)) {
      return;
    }

    const formattedDate = date.toISOString();
    setEndDate(formattedDate);
  };

  const onChangeDateOfBirth = (_date) => {
    if (!_date) {
      return;
    }

    const date = new Date(_date);

    if (isNaN(date)) {
      return;
    }

    const formattedDate = date.toISOString();
    setDateOfBirth(formattedDate);
  };

  const _handleBooking = async () => {
    await handleBooking({
      ...bookingData,
      start_date,
      end_date,
      date_of_birth,
    });
    closeForm();
  };

  return (
    <>
      {room && (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box
                className="image-room"
                sx={{ width: "50vw", height: "20vh" }}
              >
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
              <Box className="service-room">
                {room.service.length !== 0 &&
                  room.service.map((_service, index) => (
                    <Box key={index}>
                      <Box>{_service?.service_name}</Box>
                      <Box>{_service?.description}</Box>
                      <Box>{_service?.phone}</Box>
                    </Box>
                  ))}
              </Box>
              {user.role === "user" && (
                <Button onClick={showForm} style={{ bottom: 0 }}>
                  Đặt phòng
                </Button>
              )}
            </Box>
          </Modal>
          <Dialog open={openFormBooking} onClose={closeForm}>
            <DialogTitle>Add Service</DialogTitle>
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
                  <InputLabel htmlFor="slot">Lựa chọn số người</InputLabel>
                  <Input
                    id="slot"
                    aria-describedby="helper-name"
                    name="slot"
                    value={bookingData.slot}
                    onChange={onChangeBookingData}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="phone_number">
                    Nhập số điện thoại
                  </InputLabel>
                  <Input
                    id="phone_number"
                    aria-describedby="helper-name"
                    name="phone_number"
                    value={bookingData.phone_number}
                    onChange={onChangeBookingData}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="fullName">Nhập họ tên đầy đủ</InputLabel>
                  <Input
                    id="fullName"
                    aria-describedby="helper-name"
                    name="fullName"
                    value={bookingData.fullName}
                    onChange={onChangeBookingData}
                  />
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Chọn ngày tháng năm sinh"
                      onChange={onChangeDateOfBirth}
                    />
                  </DemoContainer>
                </LocalizationProvider>

                <FormControl>
                  <InputLabel htmlFor="address">Nhập địa chỉ</InputLabel>
                  <Input
                    id="address"
                    aria-describedby="helper-name"
                    name="address"
                    value={bookingData.address}
                    onChange={onChangeBookingData}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="gender">Nhập giới tính</InputLabel>
                  <Input
                    id="gender"
                    aria-describedby="helper-name"
                    name="gender"
                    value={bookingData.gender}
                    onChange={onChangeBookingData}
                  />
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Chọn thời điểm nhận phòng"
                      onChange={onChangeStartDate}
                    />
                  </DemoContainer>
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Chọn thời điểm trả phòng"
                      onChange={onChangeEndDate}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeForm}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => _handleBooking()}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {booking && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box className="user-booking">
              Thông tin người đặt: {booking?.user?.username}
            </Box>
            <Box className="room-booking">
              Phòng được đặt: {booking?.room?.numRoom}
            </Box>
          </Box>
        </Modal>
      )}

      {userbooking && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box className="room-detail-booking">
              Thông tin phòng : {userbooking.roomDetail.numRoom}
            </Box>
            {serviceBooking.length > 0 &&
              serviceBooking.map((service, index) => (
                <Box key={index}>
                  <Box>{service.service_name}</Box>
                  <Box>{service.description}</Box>
                </Box>
              ))}
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ModalDetail;
