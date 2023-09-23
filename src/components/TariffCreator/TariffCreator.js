import Box from "@mui/material/Box";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Modal from "@mui/material/Modal";
import { useField } from "formik";
import { useState } from "react";
import useHttp from "../../hooks/useHttp";
import config from "../../config";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LinearProgress from "@mui/material/LinearProgress";
export function TextField(props) {
  const [field, meta] = useField(props.name);
  return (
    <>
      <input
        {...field}
        {...props}
        style={{
          marginTop: "10px",
          paddingTop: "10px",
          paddingInline: "15px",
          paddingBottom: "10px",
          fontSize: "16px",
        }}
      />
      {meta.error && meta.touched && (
        <div style={{ color: "red", marginTop: "5px" }}>{meta.error}</div>
      )}
    </>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const validationSchema = yup.object({
  tariffName: yup.string().required("Это поле обязательное"),
  duration: yup
    .number()
    .typeError("Поле должно быть положительным числом")
    .required("Это поле обязательное")
    .min(0),
  price: yup
    .number()
    .typeError("Поле должно быть положительным числом")
    .required("Это поле обязательное")
    .min(0),
});
const TableCreator = (props) => {
  const [process, setProcess] = useState("idle");
  const request = useHttp();
  const { tariff, handleClose, open, setTariffs, updateTariff, addTariff } =
    props;
  const onDelete = () => {
    setProcess("loading");
    request(`${config.api}/tarif/${tariff.id ?? -1}`, null, "DELETE")
      .then(() => {
        handleClose();
        setProcess("idle");
        setTariffs(tariff?.id);
      })
      .catch(() => setProcess("error"));
  };
  const onCreate = async (values) => {
    setProcess("loading");
    await request(`${config.api}/tarif`, values, "POST")
      .then((data) => {
        setProcess("idle");
        addTariff(data);
      })
      .catch(() => setProcess("error"));
  };
  const onUpdate = async (values) => {
    setProcess("loading");
    await request(`${config.api}/tarif/${tariff.id ?? -1}`, values, "PUT")
      .then(() => {
        setProcess("idle");
        updateTariff(tariff.id, values);
      })
      .catch(() => setProcess("error"));
  };
  return (
    <Modal
      disableAutoFocus
      open={open}
      closeAfterTransition
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Formik
          initialValues={{
            tariffName: tariff?.tariffName ?? "",
            duration: tariff?.duration ?? "",
            price: tariff?.price ?? "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (tariff) onUpdate(values).then(() => setSubmitting(false));
            else onCreate(values).then(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                type="text"
                name="tariffName"
                className="input"
                placeholder="Название тарифа"
              />
              <TextField
                type="text"
                name="duration"
                className="input"
                placeholder="Длительность"
              />
              <TextField
                type="text"
                name="price"
                className="input"
                placeholder="Цена"
              />
              {process === "loading" ? (
                <LinearProgress color="inherit" sx={{ my: "10px" }} />
              ) : null}
              {process === "error" ? (
                <Alert severity="error" sx={{ my: "10px" }}>
                  <AlertTitle>Ошибка</AlertTitle>
                  Произошла ошибка при операции —
                  <strong> попробуйте снова!</strong>
                </Alert>
              ) : null}
              <div style={{ display: "flex" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button"
                  style={{
                    display: "block",
                    marginLeft: "0px",
                    marginTop: "20px",
                    paddingInline: "15px",
                  }}
                >
                  {!tariff ? "Добавить тариф" : "Обновить"}
                </button>
                {tariff ? (
                  <button
                    className="button"
                    onClick={onDelete}
                    type="button"
                    style={{
                      backgroundColor: "red",
                      display: "block",
                      marginLeft: "15px",
                      marginTop: "20px",
                      paddingInline: "15px",
                    }}
                  >
                    Удалить тариф
                  </button>
                ) : null}
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
export default TableCreator;
