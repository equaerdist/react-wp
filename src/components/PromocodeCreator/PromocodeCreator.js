import { Formik, Form } from "formik";
import useHttp from "../../hooks/useHttp";
import config from "../../config";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LinearProgress from "@mui/material/LinearProgress";
import { promoTransform } from "../../dataTransform/tariffTransform";
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
const validScheme = yup.object({
  tariffName: yup.string().required("Это поле обязательное"),
});
const PromocodeCreator = (props) => {
  const [process, setProcess] = useState("idle");
  const { tariffs, open, handleClose, updatePromo } = props;
  const options = tariffs.map((tariff) => (
    <option value={tariff.tariffName}>{tariff.tariffName}</option>
  ));
  const request = useHttp();

  const onRequest = async (values) => {
    setProcess("loading");
    await request(`${config.api}/tarif/promocodes`, values, "POST")
      .then((promo) => {
        let transformed = promoTransform([promo]);
        updatePromo(transformed[0]);
        setProcess("idle");
      })
      .catch(() => setProcess("error"));
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableAutoFocus
    >
      <Box sx={style}>
        <Formik
          validationSchema={validScheme}
          initialValues={{
            tariffName: tariffs.length === 0 ? "" : tariffs[0].tariffName,
          }}
          onSubmit={(values, { setSubmitting }) => {
            onRequest(values).then(() => setSubmitting(false));
          }}
        >
          {({
            isSubmitting,
            handleBlur,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <Form>
              <select
                style={{ width: "100%", padding: "10px" }}
                type="text"
                value={values.tariffName}
                name="tariffName"
                onBlur={handleBlur}
                onChange={handleChange}
              >
                {options}
              </select>
              {errors.tariffName && touched.tariffName ? (
                <div
                  style={{
                    color: "red",
                    display: "block",
                    marginTop: "15px",
                  }}
                >
                  {errors.tariffName}
                </div>
              ) : null}
              {process === "loading" ? (
                <LinearProgress color="inherit" sx={{ mt: "10px" }} />
              ) : null}
              {process === "error" ? (
                <Alert severity="error" sx={{ mt: "10px" }}>
                  <AlertTitle>Ошибка</AlertTitle>
                  Не удалось добавить промокод —
                  <strong> поробуйте снова!</strong>
                </Alert>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="button"
                style={{
                  marginTop: "15px",
                  paddingInline: "15px",
                  marginLeft: 0,
                }}
              >
                Сгенерировать промокод
              </button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
export default PromocodeCreator;
