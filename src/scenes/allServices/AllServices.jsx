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
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllServices() {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [infoService, setInfoService] = useState({
    name: "",
    description: "",
    phone: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleOnChangeInputService = (e) => {
    setInfoService({ ...infoService, [e.target.name]: e.target.value });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const loadService = async () => {
    setLoading(true);
    const result = await getAllServices();
    setServices(result);
    setLoading(false);
  };

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadService();
  }, []);

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
      {user.role !== "user" && (
        <div className="list-staff">
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="search">Search</InputLabel>
              <Input
                id="search"
                name="search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </FormControl>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Tên dịch vụ
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: "bold" }}>Mô tả</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Số điện thoại
                    </Typography>
                  </TableCell>
                  {user.role === "admin" && (
                    <TableCell align="center" colSpan={2}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Hành động
                      </Typography>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredServices.map((service, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{service.service_name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{service.phone}</TableCell>
                    {user.role === "admin" && (
                      <>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
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
                      </>
                    )}
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
