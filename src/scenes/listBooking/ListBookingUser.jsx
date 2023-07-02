import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteUserBooking, getUserBooking } from "../../apis";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ModalDetail from "../../components/ModalDetail";
import convertDate from "../../utils/convertDate";

function ListBookingUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookingUser, setBookingUser] = useState([]);
  const [chooseBooking, setChooseBooking] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadBookingUser = async () => {
    setLoading(true); // Set loading state to true before fetching data
    const result = await getUserBooking(user._id);
    if (result.message !== undefined) {
      setMessage(result.message);
    } else {
      setBookingUser(result);
    }
    setLoading(false); // Set loading state to false after data is fetched
  };

  // detail
  const [openDetailUserBooking, setOpenDetailUserBooking] = useState(false);
  const showUserBooking = () => setOpenDetailUserBooking(true);
  const closeUserBooking = () => setOpenDetailUserBooking(false);

  const handleDetailBookingUser = (booking) => {
    setChooseBooking(booking);
    console.log(booking);
    showUserBooking();
  };

  // delete
  const handleDeleteBooking = async (id) => {
    const result = await deleteUserBooking(id);
    await loadBookingUser();
    toast.warning(result.message);
  };

  useEffect(() => {
    loadBookingUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {bookingUser.length > 0 && (
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

          <ModalDetail
            userbooking={chooseBooking}
            open={openDetailUserBooking}
            handleClose={closeUserBooking}
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Số phòng</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Thời điểm gửi yêu cầu</TableCell>
                  <TableCell align="center">Thời điểm nhận phòng</TableCell>
                  <TableCell align="center">Thời điểm trả phòng</TableCell>
                  <TableCell align="center" colSpan={2}>
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingUser.map((booking, index) => {
                  const statusReq =
                    booking.status === 0
                      ? "Chờ xử lý"
                      : booking.status === 1
                      ? "Từ chối"
                      : booking.status === 2
                      ? "Đồng ý"
                      : booking.status === 3
                      ? "Đã nhận phòng"
                      : "Đã trả phòng";
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        {booking?.roomDetail?.numRoom}
                      </TableCell>
                      <TableCell align="center">{statusReq}</TableCell>
                      <TableCell align="center">
                        {convertDate(booking?.createdAt)}
                      </TableCell>
                      <TableCell align="center">
                        {convertDate(booking?.startDate)}
                      </TableCell>
                      <TableCell align="center">
                        {convertDate(booking?.endDate)}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleDetailBookingUser(booking)}
                          variant="contained"
                        >
                          Chi tiết
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleDeleteBooking(booking._id)}
                          variant="contained"
                          color="error"
                        >
                          Hủy yêu cầu
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {bookingUser.length === 0 && <Box>{message}</Box>}
    </>
  );
}

export default ListBookingUser;
