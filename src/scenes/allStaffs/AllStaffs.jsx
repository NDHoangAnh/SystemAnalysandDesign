import { useEffect, useState } from "react";
import { getAllStaffs, addStaff, deleteStaff } from "../../apis";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllStaffs() {
  const [loading, setLoading] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [infoStaff, setInfoStaff] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnChangeInputStaff = (e) => {
    setInfoStaff({ ...infoStaff, [e.target.name]: e.target.value });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const loadStaff = async () => {
    setLoading(true);
    const result = await getAllStaffs();
    setStaffs(result);
    setLoading(false);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleOpenDialog = () => {
    setInfoStaff({
      name: "",
      email: "",
      phone: "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteStaff = async (email) => {
    const deleteResult = await deleteStaff(email);
    toast.success(deleteResult.message);
    const result = await getAllStaffs();
    setStaffs(result);
  };

  const handleAddStaff = async () => {
    const addResult = await addStaff(infoStaff);
    if (addResult.saveStaff === null) toast.error(addResult.message);
    else toast.success(addResult.message);
    const result = await getAllStaffs();
    setStaffs(result);
    handleCloseDialog();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaffs = staffs.filter((staff) =>
    staff.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div>Bạn không có quyền xem nội dung này</div>
      )}
      {user.role === "admin" && (
        <div className="list-staff">
          <div className="search-bar">
            <FormControl fullWidth>
              <InputLabel htmlFor="search">Search by Username</InputLabel>
              <Input
                id="search"
                aria-describedby="helper-search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </FormControl>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: "bold" }}>Họ tên</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Số điện thoại
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ fontWeight: "bold" }}>Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaffs.map((staff, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.username}</TableCell>
                    <TableCell>{staff.phone_number}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" sx={{ mr: 2 }}>
                        Sửa
                      </Button>
                      <Button
                        onClick={() => handleDeleteStaff(staff.email)}
                        variant="contained"
                        color="error"
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Fab
            color="primary"
            onClick={handleOpenDialog}
            sx={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <AddIcon />
          </Fab>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add Staff</DialogTitle>
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
                  <InputLabel htmlFor="name">Họ tên</InputLabel>
                  <Input
                    id="name"
                    aria-describedby="helper-name"
                    name="name"
                    value={infoStaff.name}
                    onChange={(e) => handleOnChangeInputStaff(e)}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="name">Email</InputLabel>
                  <Input
                    id="email"
                    aria-describedby="helper-name"
                    name="email"
                    value={infoStaff.email}
                    onChange={(e) => handleOnChangeInputStaff(e)}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="name">Số điện thoại</InputLabel>
                  <Input
                    id="phone"
                    aria-describedby="helper-name"
                    name="phone"
                    value={infoStaff.phone}
                    onChange={(e) => handleOnChangeInputStaff(e)}
                  />
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddStaff}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default AllStaffs;
