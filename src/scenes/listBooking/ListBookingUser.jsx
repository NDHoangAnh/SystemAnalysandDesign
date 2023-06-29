import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteUserBooking, getUserBooking } from "../../apis";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ModalDetail from "../../components/ModalDetail";
import convertDate from "../../utils/convertDate";

function ListBookingUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookingUser, setBookingUser] = useState([]);
  const [chooseBooking, setChooseBooking] = useState();

  const loadBookingUser = async () => {
    const result = await getUserBooking(user._id);
    console.log(result);
    if (result.message !== undefined) {
      toast.success(result.message);
    } else {
      setBookingUser(result);
    }
  };

  // detail
  const [openDetailUserBooking, setOpenDetailUserBooking] = useState(false);
  const showUserBooking = () => setOpenDetailUserBooking(true);
  const closeUserBooking = () => setOpenDetailUserBooking(false);

  const handleDetailBookingUser = (booking) => {
    setChooseBooking(booking);
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
  }, []);

  return (
    <>
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
                  <TableCell>Số phòng</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thời điểm gửi yêu cầu</TableCell>
                  <TableCell>Thời điểm nhận phòng</TableCell>
                  <TableCell>Thời điểm trả phòng</TableCell>
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
                      <TableCell>{booking?.roomDetail?.numRoom}</TableCell>
                      <TableCell>{statusReq}</TableCell>
                      <TableCell>{convertDate(booking?.createdAt)}</TableCell>
                      <TableCell>{convertDate(booking?.startDate)}</TableCell>
                      <TableCell>{convertDate(booking?.endDate)}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleDetailBookingUser(booking)}
                        >
                          Chi tiết
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleDeleteBooking(booking._id)}
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
    </>
  );
}

export default ListBookingUser;
