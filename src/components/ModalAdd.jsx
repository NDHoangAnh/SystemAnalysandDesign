import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Modal,
} from "@mui/material";
import { useState } from "react";
import style from "../styles/StyleModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalAdd = (props) => {
  const { isOpenModalAdd, createNewUser, closeModalAdd, modalUser } = props;

  // user
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const { name, email } = user;

  const handleOnChangeInputUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const checkValidInputUser = () => {
    let isValid = true;
    let arrInput = ["name", "email"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!user[arrInput[i]]) {
        isValid = false;
        toast.error("Missing parameter " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  const handleAddUser = () => {
    let isValid = checkValidInputUser();
    if (isValid === true) {
      createNewUser(user);
    }
    setUser({
      name: "",
      email: "",
    });
  };
  //

  return (
    <div>
      <ToastContainer />
      {modalUser && (
        <Modal
          open={isOpenModalAdd}
          onClose={closeModalAdd}
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
                onClick={() => handleAddUser()}
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

// const ModalAdd = () => {
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter name"
//         onChange={(e) => setNameUser(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button type="submit" onClick={(e) => handleAddUser()}>
//         Add
//       </button>
//     </div>
//   );
// };

export default ModalAdd;
