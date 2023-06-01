import { Box, Modal } from "@mui/material";
import style from "../styles/StyleModal";

const ModalDetail = (props) => {
  const { isOpenModalDetail, closeModalDetail, modalDetailUser, detailUser } =
    props;
  return (
    <div>
      {modalDetailUser && detailUser && (
        <Modal
          open={isOpenModalDetail}
          onClose={closeModalDetail}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>{detailUser?.name}</div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ModalDetail;
