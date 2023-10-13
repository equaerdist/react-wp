import { Modal, Box, Checkbox } from "@mui/material";
import "./Sender.scss";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import config from "../../config";
import { LinearProgress, AlertTitle, Alert } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
const Sender = (props) => {
  const request = useHttp();
  const dispatch = useDispatch();
  const { type, text, messageProcess } = useSelector((state) => state.settings);
  const { open, handleClose, onRequest, onType, onSwitch } = props;
  return (
    <>
      <Modal
        disableAutoFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Box sx={style}>
          <textarea
            className="sender-text"
            onChange={(e) => onType(e.target.value)}
          ></textarea>
          <div>
            <Checkbox onChange={(e) => onSwitch(e.target.checked)}></Checkbox>
            <span>По активным пользователям</span>
          </div>
          {messageProcess === "loading" ? (
            <LinearProgress
              sx={{ mt: "20px", width: "381px" }}
              color="inherit"
            />
          ) : null}
          {messageProcess === "error" ? (
            <Alert severity="error" sx={{ mt: "20px", width: "381px" }}>
              <AlertTitle>Ошибка</AlertTitle>
              Произошла ошибка при применении настроек —
              <strong>попробуйте снова!</strong>
            </Alert>
          ) : null}
          <button
            className="button sender__button"
            onClick={() => dispatch(onRequest(request, config.api, type, text))}
          >
            Добавить в рассылку
          </button>
        </Box>
      </Modal>
    </>
  );
};
export default Sender;
