import {
  Modal,
  Box,
  TextField,
  Alert,
  AlertTitle,
  LinearProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import { object, string, number } from "yup";

let settingSchema = object({
  name: string().required("Поле является обязательным"),
  value: number()
    .required("Поле является обязательным")
    .positive("Значение не может быть отрицательным")
    .typeError("Поле должно быть числом"),
  nameUser: string().required("Поле является обязательным"),
});
const styles = {
  width: 500,
  position: "absolute",
  top: "50%",
  left: "50%",
  backgroundColor: "background.paper",
  border: "none",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  padding: 10,
  borderRadius: 2,
};
const SettingsEditor = (props) => {
  const { name, nameUser, value, handleClose, onRequest, process } = props;
  return (
    <Modal open={true} disableAutoFocus onClose={handleClose}>
      <Box sx={styles}>
        <Formik
          initialValues={{ name: name, nameUser: nameUser, value: value }}
          style={{ width: "100%" }}
          validationSchema={settingSchema}
          onSubmit={(values) => onRequest(values)}
        >
          {({ handleBlur, handleChange, values, errors, touched }) => (
            <Form>
              <TextField
                fullWidth
                margin="normal"
                sx={{ display: "block" }}
                read
                label="Настройка"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                inputProps={{ readOnly: true }}
              ></TextField>
              <TextField
                fullWidth
                margin="normal"
                sx={{ display: "block" }}
                label="Настройка для пользователя"
                value={values.nameUser}
                name="nameUser"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.nameUser && touched.nameUser}
                helperText={errors.nameUser}
              ></TextField>
              <TextField
                fullWidth
                margin="normal"
                sx={{ display: "block" }}
                Label="Значение"
                name="value"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.value}
                error={errors.value && errors.touched}
                helperText={errors.value}
              ></TextField>
              {process === "loading" ? (
                <LinearProgress
                  sx={{ mt: "20px", width: "381px" }}
                  color="inherit"
                />
              ) : null}
              {process === "error" ? (
                <Alert severity="error" sx={{ mt: "20px", width: "381px" }}>
                  <AlertTitle>Ошибка</AlertTitle>
                  Произошла ошибка при применении настроек —
                  <strong>попробуйте снова!</strong>
                </Alert>
              ) : null}
              <button
                type="submit"
                disabled={props.isSubmitting}
                className="button"
                style={{ paddingLeft: 20, margin: 0, marginTop: 20 }}
              >
                Применить
              </button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
export default SettingsEditor;
