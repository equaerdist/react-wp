import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LinearProgress from "@mui/material/LinearProgress";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 5,
  px: 4,
  pb: 3,
};
export default function ExportUsers(props) {
  const { setOpen, open, handleRequest } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const [error, setError] = useState("idle");

  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        {error !== "idle" && error !== "loading" ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Ошибка</AlertTitle>
            Что-то пошло не так - <strong>попробуйте снова!</strong>
          </Alert>
        ) : null}

        <TextField
          id="standard-basic"
          variant="standard"
          type="date"
          value={firstDate}
          onInput={(e) => setFirstDate(e.target.value)}
        />
        <TextField
          style={{ marginLeft: 10 }}
          id="standard-basic"
          variant="standard"
          type="date"
          placeholder="FH"
          value={secondDate}
          onInput={(e) => setSecondDate(e.target.value)}
        />
        {error === "loading" ? (
          <LinearProgress color="inherit" sx={{ mt: 3 }} />
        ) : null}
        <button
          className="button"
          onClick={async () => {
            setError("loading");
            try {
              await handleRequest(firstDate, secondDate);
              setError("idle");
            } catch {
              setError("error");
            }
          }}
          style={{
            textAlign: "center",
            padding: 25,
            paddingTop: 10,
            paddingBottom: 10,
            margin: 0,
            marginTop: 20,
          }}
        >
          Экспорт
        </button>
      </Box>
    </Modal>
  );
}
