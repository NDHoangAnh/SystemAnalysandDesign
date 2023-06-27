import { useEffect, useState } from "react";
import {
  getAllServices,
  addService,
  deleteService,
  editService,
} from "../../apis";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllServices() {
  const [services, setServices] = useState([]);
  const [infoService, setInfoService] = useState({
    name: "",
    description: "",
    phone: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  // edit
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const handleShowDialogEdit = (data) => {
    setInfoService({
      name: data.service_name,
      description: data.description,
      phone: data.phone,
    });

    setOpenDialogEdit(true);
  };

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const handleEditService = async () => {
    const nameServiceEdit = infoService.name;
    const resultEdit = await editService(nameServiceEdit, infoService);
    toast.success(resultEdit.message);
    const result = await getAllServices();
    setServices(result);
    handleCloseDialogEdit();
  };
  //

  const handleOnChangeInputService = (e) => {
    setInfoService({ ...infoService, [e.target.name]: e.target.value });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const loadService = async () => {
    const result = await getAllServices();
    setServices(result);
  };

  useEffect(() => {
    loadService();
  }, []);

  const handleOpenDialog = () => {
    setInfoService({
      name: "",
      description: "",
      phone: "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteService = async (name) => {
    const deleteResult = await deleteService(name);
    toast.success(deleteResult.message);
    const result = await getAllServices();
    setServices(result);
  };

  const handleAddService = async () => {
    const addResult = await addService(infoService);
    if (addResult.saveService === undefined) toast.error(addResult.message);
    else toast.success(addResult.message);
    const result = await getAllServices();
    setServices(result);
    handleCloseDialog();
  };

  return (
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
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleShowDialogEdit(service)}
                      >
                        Sửa
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleDeleteService(service.service_name)
                        }
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
                  <InputLabel htmlFor="name">Tên dịch vụ</InputLabel>
                  <Input
                    id="name"
                    aria-describedby="helper-name"
                    name="name"
                    value={infoService.name}
                    onChange={(e) => handleOnChangeInputService(e)}
                  />
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
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddService}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openDialogEdit} onClose={handleCloseDialogEdit}>
            <DialogTitle>Edit Service</DialogTitle>
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
                  <InputLabel htmlFor="name">Mô tả</InputLabel>
                  <Input
                    id="description"
                    aria-describedby="helper-name"
                    name="description"
                    value={infoService.description}
                    onChange={(e) => handleOnChangeInputService(e)}
                  />
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
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogEdit}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditService()}
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
