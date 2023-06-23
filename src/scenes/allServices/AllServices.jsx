import { useEffect, useState } from "react";
import { getAllServices } from "../../apis";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function AllServices() {
  const [services, setServices] = useState([]);
  const [infoService, setInfoService] = useState({
    service_name: "",
    description: "",
    phone: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleOnChangeInputService = (e) => {
    setInfoService({ ...infoService, [e.target.name]: e.target.value });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const loadService = async () => {
    const result = await getAllServices();
    console.log(result);
    setServices(result);
  };

  useEffect(() => {
    loadService();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddService = () => {
    // Add staff logic here
    // ...
    // Close the dialog
    handleCloseDialog();
  };

  return (
    <>
      {(user.role === "user" || user.role === "staff") && (
        <div>Bạn không có quyền xem nội dung này</div>
      )}
      {user.role === "admin" && (
        <div className="list-staff">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tên dịch vụ</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell align="center" colSpan={2}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{service.service_name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{service.phone}</TableCell>
                    <TableCell align="center">
                      <Button>Sửa</Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button>Xóa</Button>
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
            <DialogTitle>Add Service</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "40vw",
                }}
              >
                <FormControl>
                  <InputLabel htmlFor="name">Tên dịch vụ</InputLabel>
                  <Input
                    id="service_name"
                    aria-describedby="helper-name"
                    name="service_name"
                    value={infoService.service_name}
                    onChange={(e) => handleOnChangeInputService(e)}
                  />
                  <FormHelperText id="helper-name">
                    Nhập tên dịch vụ
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="name">Mô tả</InputLabel>
                  <Input
                    id="description"
                    aria-describedby="helper-name"
                    name="description"
                    value={infoService.description}
                    onChange={(e) => handleOnChangeInputService(e)}
                  />
                  <FormHelperText id="helper-name">Nhập mô tả</FormHelperText>
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="name">Số điện thoại</InputLabel>
                  <Input
                    id="phone"
                    aria-describedby="helper-name"
                    name="phone"
                    value={infoService.phone}
                    onChange={(e) => handleOnChangeInputService(e)}
                  />
                  <FormHelperText id="helper-name">Nhập email</FormHelperText>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddService}
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

export default AllServices;
