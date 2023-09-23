import { Formik, Form, useField } from "formik";
import useHttp from "../../hooks/useHttp";
import { useState, useEffect } from "react";
import * as yup from "yup";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import "./authorize.scss";
const validationSchema = yup.object({
  login: yup.string().required("Поле является обязательным"),
  password: yup.string().required("Поле является обязательным"),
});
const TextField = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="auth__wrapper">
        <label htmlFor={`#${props.id}`} className="auth__label">
          {props.label}
        </label>
        <input {...field} {...props} className="auth__input"></input>
      </div>
      {meta.touched && meta.error ? (
        <div className="auth__error">{meta.error}</div>
      ) : null}
    </>
  );
};
const Authorize = (props) => {
  const [process, setProcess] = useState("idle");
  const request = useHttp();
  const navigate = useNavigate();
  useEffect(() => {
    request(`${config.api}/auth`)
      .then(() => navigate("/main/report"))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="auth">
      <Formik
        validationSchema={validationSchema}
        initialValues={{ login: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setProcess("loading");
          request(`${config.api}/auth`, values, "POST")
            .then((data) => {
              localStorage.setItem("token", data.token);
              setProcess("idle");
              navigate("/main/report");
            })
            .catch((error) => setProcess(error.message))
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="auth__form">
            <TextField
              type="text"
              name="login"
              id="login"
              label="Логин"
            ></TextField>
            <TextField
              type="password"
              name="password"
              id="password"
              label="Пароль"
            ></TextField>
            {process === "loading" ? (
              <LinearProgress sx={{ mt: "10px" }} color="inherit" />
            ) : null}
            {process !== "loading" && process !== "idle" ? (
              <Alert sx={{ mt: "10px" }} severity="error">
                <AlertTitle>Ошибка</AlertTitle>
                {process} — <strong>попробуйте снова!</strong>
              </Alert>
            ) : null}
            <button
              type="submit"
              className="button auth__button"
              disabled={isSubmitting}
            >
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Authorize;
