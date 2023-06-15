import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { API } from "../global";

function Signup() {
  const navigate = useNavigate();
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        Name: "",
        email: "",
        password: "",
      },

      validationSchema: yup.object({
        Name: yup.string().required().min(3),
        email: yup.string().email().required(),
        password: yup.string().required().min(8),
      }),
      onSubmit: async (values) => {
        try {
          const register = await axios.post(`${API}/user/register`, values);
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
        <h3>SignUp</h3>

        <TextField
          label="Name"
          type="Name"
          name="Name"
          value={values.Name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.Name && errors.Name ? true : false}
          helperText={touched.Name && errors.Name ? errors.Name : null}
        />

        <TextField
          label="email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email ? true : false}
          helperText={touched.email && errors.email ? errors.email : null}
        />

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
          Register
        </Button>
        <p>Already have an account?</p>
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          color="success"
          startIcon={<LoginIcon />}
        >
          Back to Login
        </Button>
      </form>
    </>
  );
}

export default Signup;
