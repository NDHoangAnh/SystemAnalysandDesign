import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Modal,
} from "@mui/material";
import style from "../styles/StyleModal";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalEdit = (props) => {
  const { isOpenModalEdit, closeModalEdit, modalEditUser, userEdit, editUser } =
    props;

  // user
  const [userToEdit, setUserToEdit] = useState({
    name: userEdit?.name,
    email: userEdit?.email,
    id: userEdit?.id,
  });

  const { email, name } = userToEdit;

  const handleOnChangeInputUser = (e) => {
    setUserToEdit({ ...userToEdit, [e.target.name]: e.target.value });
  };

  const checkValidInputUser = () => {
    let isValid = true;
    let arrInput = ["name", "email"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!userToEdit[arrInput[i]]) {
        isValid = false;
        toast.error("Missing parameter " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  const handleEditUser = () => {
    let check = checkValidInputUser();
    if (check === true) {
      editUser(userToEdit);
    }
  };
  //

  return (
    <div>
      <ToastContainer />
      {modalEditUser && userEdit && (
        <Modal
          open={isOpenModalEdit}
          onClose={closeModalEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                aria-describedby="helper-name"
                name="name"
                value={name}
                onChange={(e) => handleOnChangeInputUser(e)}
              />
              <FormHelperText id="helper-name">
                Please enter your name
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                aria-describedby="helper-email"
                name="email"
                value={email}
                onChange={(e) => handleOnChangeInputUser(e)}
              />
              <FormHelperText id="helper-email">
                Please enter your email
              </FormHelperText>
            </FormControl>

            <Box>
              <Button
                onClick={() => handleEditUser()}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Add
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ModalEdit;
