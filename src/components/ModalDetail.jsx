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
  Typography,
  Divider,
  Grid,
  Paper,
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
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  height: "85vh",
  // alignItems: "center",
};

const ModalDetail = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { open, handleClose, room, booking, userbooking, handleBooking } =
    props;
  const serviceBooking = userbooking && userbooking.roomDetail.service;

  const [openFormBooking, setOpenFormBooking] = useState(false);
  const showForm = () => setOpenFormBooking(true);
  const closeForm = () => setOpenFormBooking(false);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${padNumber(day)}/${padNumber(month)}/${padNumber(
      year
    )} ${padNumber(hours)}:${padNumber(minutes)}`;
  };

  const padNumber = (number) => {
    return number.toString().padStart(2, "0");
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
              <Box className="image-room" sx={{ width: "20vw", ml: "35%" }}>
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
              <Typography variant="h4" sx={{ mt: 2 }}>
                Phòng số {room.numRoom}
              </Typography>
              <Box
                className="info-room"
                sx={{
                  mb: 3,
                  mt: 3,
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2">{room.description}</Typography>
              </Box>
              <Typography variant="h6">Dịch vụ</Typography>
              <Divider />
              <Box
                className="service-room"
                sx={{ maxHeight: 250, overflowY: "auto" }}
              >
                {room.service.length !== 0 &&
                  room.service.map((_service, index) => (
                    <div>
                      <Box key={index} sx={{ mb: 1, mt: 1 }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {_service?.service_name}
                        </Typography>
                        <Typography>{_service?.description}</Typography>
                        <Typography>Contact: {_service?.phone}</Typography>
                      </Box>
                      <Divider />
                    </div>
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
            <DialogTitle variant="h4" sx={{ textAlign: "center" }}>
              Đặt phòng
            </DialogTitle>
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
                    fullWidth
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
                    fullWidth
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
                    fullWidth
                  />
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Chọn ngày tháng năm sinh"
                      onChange={onChangeDateOfBirth}
                      sx={{ width: "100vh" }}
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
              <Button onClick={closeForm}>Hủy</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => _handleBooking()}
              >
                Xác nhận
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box className="user-booking" sx={{ height: "40vh" }}>
                  <Paper elevation={1} sx={{ height: "40vh", width: "30vw" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        marginTop: "1rem",
                        marginLeft: "1rem",
                      }}
                    >
                      Thông tin người đặt
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                    >
                      Tài khoản: {booking.user.username}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                    >
                      Tên: {booking.user.fullName ? booking.user.fullName : ""}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                    >
                      Email: {booking.user.email ? booking.user.email : ""}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                    >
                      Số điện thoại:{" "}
                      {booking.user.phone_number
                        ? booking.user.phone_number
                        : ""}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="booking-detail" sx={{ height: "40vh" }}>
                  <Paper elevation={1} sx={{ height: "40vh", width: "30vw" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        marginTop: "1rem",
                        marginLeft: "1rem",
                      }}
                    >
                      Thông tin đơn đặt phòng
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                    >
                      Giá: {booking.price}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                    >
                      Thời gian bắt đầu: {formatDate(booking.startDate)}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                    >
                      Thời gian kết thúc: {formatDate(booking.endDate)}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="room-booking" sx={{ height: "40vh" }}>
                  <Paper elevation={1} sx={{ height: "40vh", width: "30vw" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        marginTop: "1rem",
                        marginLeft: "1rem",
                      }}
                    >
                      Thông tin phòng
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                    >
                      Phòng được đặt: {booking?.room?.numRoom}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                    >
                      Loại phòng:{" "}
                      {booking.room.type === 1
                        ? "Phòng bình dân"
                        : booking.room.type === 2
                        ? "Phòng thương gia"
                        : "Phòng Vip"}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  className="service-detail"
                  sx={{ height: "40vh", overflowY: "auto" }}
                >
                  <Paper elevation={3} sx={{ width: "30vw" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        marginTop: "1rem",
                        marginLeft: "1rem",
                      }}
                    >
                      Thông tin dịch vụ
                    </Typography>
                    {booking.room.service.length > 0 &&
                      booking.room.service.map((service, index) => (
                        <Box key={index}>
                          <Typography
                            variant="h6"
                            sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                          >
                            {"> "}
                            {service.service_name}
                          </Typography>
                          <Typography variant="subtitle2" color="gray">
                            {service.description}
                          </Typography>
                        </Box>
                      ))}
                  </Paper>
                </Box>
              </Grid>
            </Grid>
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
            <Box className="room-detail-booking" sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold" }} variant="h5">
                Phòng số: {userbooking.roomDetail.numRoom}
              </Typography>
              <Typography variant="subtitle2">
                {userbooking.roomDetail.description}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant="h6">Số người: {userbooking.slot}</Typography>
              <Typography variant="h6">Giá: {userbooking.price}</Typography>
              <Typography variant="h6">
                Thời gian bắt đầu: {formatDate(userbooking.startDate)}
              </Typography>
              <Typography variant="h6">
                Thời gian kết thúc: {formatDate(userbooking.endDate)}
              </Typography>
            </Box>
            <Divider />
            <Typography sx={{ mt: 2 }} variant="h5">
              Dịch vụ kèm
            </Typography>
            <Box sx={{ overflowY: "auto" }}>
              {serviceBooking.length > 0 &&
                serviceBooking.map((service, index) => (
                  <Box key={index}>
                    <Typography variant="h6">
                      {"> "}
                      {service.service_name}
                    </Typography>
                    <Typography variant="subtitle2" color="gray">
                      {service.description}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ModalDetail;
