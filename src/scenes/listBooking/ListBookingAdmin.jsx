import { useEffect, useState } from "react";
import { deleteAdminBooking, getAllBooking, handleRequest } from "../../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ModalDetail from "../../components/ModalDetail";
import ModalDelete from "../../components/ModalDelete";
import DropDown from "../../components/DropDownSelect";
import convertDate from "../../utils/convertDate";

function ListBookingAdmin() {
  const [listBooking, setListBooking] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "user.username",
      headerName: "Tên người đặt",
      width: 245,
      editable: true,
      valueGetter: (params) => {
        return params.row.user.username;
      },
    },
    {
      field: "room.numRoom",
      headerName: "Phòng được đặt",
      width: 120,
      editable: true,
      valueGetter: (params) => {
        return params.row.room.numRoom;
      },
    },
    {
      field: "startDate",
      headerName: "Thời điểm nhận phòng",
      width: 230,
      editable: true,
      valueGetter: (params) => {
        const date = new Date(params.row.startDate);
        return convertDate(date);
      },
    },
    {
      field: "endDate",
      headerName: "Thời điểm trả phòng",
      width: 230,
      editable: true,
      valueGetter: (params) => {
        const date = new Date(params.row.endDate);
        return convertDate(date);
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      editable: true,
      valueGetter: (params) => {
        const status = params.row.status;
        const valStatus =
          status === 0
            ? "Chờ xử lý"
            : status === 1
            ? "Từ chối"
            : status === 2
            ? "Đồng ý"
            : status === 3
            ? "Đã nhận phòng"
            : "Đã trả phòng";
        return valStatus;
      },
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: "400px",
      renderCell: (params) => (
        <Box>
          <Button onClick={() => handleEdit(params.row._id)}>Cập nhật</Button>
          <Button onClick={() => handleDelete(params.row._id)}>Xóa</Button>
          <Button onClick={() => handleDetail(params.row._id)}>Chi tiết</Button>
        </Box>
      ),
    },
  ];

  const [detailBooking, setDetailBooking] = useState();

  const loadBooking = async () => {
    const result = await getAllBooking();
    if (result.message !== undefined) {
      toast.warning(result.message);
    } else {
      setListBooking(result);
    }
  };

  let row = [];

  if (listBooking.length > 0) {
    listBooking.forEach((booking, index) => {
      row.push({ ...booking, id: index + 1 });
    });
  }

  // delete
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const showModalDelete = () => setOpenModalDelete(true);
  const closeModalDelete = () => setOpenModalDelete(false);

  const handleDeleteBookingAdmin = async (id) => {
    const result = await deleteAdminBooking(id);
    closeModalDelete();
    toast.success(result.message);
    loadBooking();
  };

  const handleDelete = (id) => {
    const _detailBooking = listBooking.filter((booking) => booking._id === id);
    setDetailBooking(_detailBooking[0]);
    showModalDelete();
  };

  // detail
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const showModalDetail = () => setOpenModalDetail(true);
  const closeModalDetail = () => setOpenModalDetail(false);

  const handleDetail = (id) => {
    const _detailBooking = listBooking.filter((booking) => booking._id === id);
    setDetailBooking(_detailBooking[0]);
    // console.log(detailBooking);
    showModalDetail();
  };

  // edit
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const showDialogEdit = () => setOpenDialogEdit(true);
  const closeDialogEdit = () => setOpenDialogEdit(false);

  const handleEdit = (id) => {
    const _detailBooking = listBooking.filter((booking) => booking._id === id);
    setDetailBooking(_detailBooking[0]);
    showDialogEdit();
  };

  const handleOnChangeReq = (e) => {
    setDetailBooking({ ...detailBooking, [e.target.name]: e.target.value });
  };

  const handleReqBooking = async () => {
    const result = await handleRequest(detailBooking._id, detailBooking);
    toast.success(result.message);
    await loadBooking();
    closeDialogEdit();
  };

  useEffect(() => {
    loadBooking();
  }, []);

  return (
    <>
      {listBooking.length > 0 && (
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
            booking={detailBooking}
            open={openModalDetail}
            handleClose={closeModalDetail}
          />
          <ModalDelete
            open={openModalDelete}
            handleClose={closeModalDelete}
            booking={detailBooking}
            handleDeleteBooking={handleDeleteBookingAdmin}
          />

          <Dialog open={openDialogEdit} onClose={closeDialogEdit}>
            <DialogTitle>Xử lý yêu cầu</DialogTitle>
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
                <DropDown
                  booking={detailBooking}
                  handleUpdateBooking={handleOnChangeReq}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialogEdit}>Hủy</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleReqBooking()}
              >
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>

          <Box sx={{ width: "101%" }}>
            <DataGrid
              rows={row}
              columns={columns}
              pageSizeOptions={[10]}
              slots={{ toolbar: GridToolbar }}
              // checkboxSelection
            />
          </Box>
        </>
      )}
    </>
  );
}

export default ListBookingAdmin;
