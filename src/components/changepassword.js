import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";

import React, { useContext } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { API } from "../global";
import UserContext from "../context/UserContext";

function ChangePassword() {
  const navigate = useNavigate();
  const userContextData = useContext(UserContext);
  let input = userContextData.forgotUser;
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
      },

      validationSchema: yup.object({
        password: yup.string().required().min(8),
      }),
      onSubmit: async (values) => {
        try {
          const register = await axios.post(
            `${API}/user/changepassword/${input.email}`,
            values,
            {
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            }
          );
          alert(register.data.message);
          navigate("/");
        } catch (error) {
          alert(error.response.message);
          console.log(error);
        }
      },
    });
  return (
    <>
      <form onSubmit={handleSubmit} className="signup-form form">
        <h3>Reset Password</h3>

        <TextField
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && errors.password ? true : false}
          helperText={
            touched.password && errors.password ? errors.password : null
          }
        />
        <Button variant="contained" type="submit" endIcon={<SendIcon />}>
          Reset Password
        </Button>
      </form>
    </>
  );
}

export default ChangePassword;
