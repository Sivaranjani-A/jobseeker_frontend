import Button from "@mui/material/Button";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../global";
import axios from "axios";
import { useEffect, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
const profilevalidationSchema = yup.object({
  Name: yup.string().required(),
  DOB: yup.string().required(),
  Contact_Number: yup.number().required(),
  Whatsapp_Number: yup.number().required(),
  Educational_Qualification: yup.string().required(),
  Experience: yup.number().required(),
});

export function EditProfile() {
  //navigate hook
  const [resume, setresume] = useState("");
  const inputclicked = async (event) => {
    const file = event.target.files;

    console.log(file[0]);
    const blobServiceClient = new BlobServiceClient(
      "https://firsttesting1234.blob.core.windows.net/fortesting?sp=racwdl&st=2023-06-14T17:43:42Z&se=2023-07-28T01:43:42Z&sv=2022-11-02&sr=c&sig=%2BYpcgvO4QtMvULsX2n5kj59K5c7PjEOlznoT3hzDG6c%3D"
    );
    const containerClient = blobServiceClient.getContainerClient("A");

    const blockBlobClient = containerClient.getBlockBlobClient(file[0].name);
    await blockBlobClient.uploadData(file[0]);

    setresume(blockBlobClient.url);
  };
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  useEffect(() => {
    getProfile();
  }, []);

  let getProfile = async () => {
    try {
      const details = await axios.get(`${API}/user/profile/${email}`);
      console.log(details.data);
      formik.setValues(details.data);
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      Name: "",
      DOB: "",
      Contact_Number: "",
      Whatsapp_Number: "",
      Educational_Qualification: "",
      Experience: "",
      Resume: "",
    },
    validationSchema: profilevalidationSchema,
    onSubmit: async (values) => {
      const profile = await axios.put(`${API}/user/profile/${email}`, {
        Name: values.Name,
        DOB: values.DOB,
        Contact_Number: values.Contact_Number,
        Whatsapp_Number: values.Whatsapp_Number,
        Educational_Qualification: values.Educational_Qualification,
        Experience: values.Experience,
        Resume: resume,
      });
      alert(profile.data.message);
    },
  });

  return (
    <form className="add-profile-form" onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: 1, marginBottom: 16 }}
              >
                *
              </Typography>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        value={formik.values.Name}
        name="Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.Name && formik.errors.Name}
        helperText={
          formik.touched.Name && formik.errors.Name ? formik.errors.Name : null
        }
      />
      <TextField
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: 1, marginBottom: 16 }}
              >
                *
              </Typography>
            </InputAdornment>
          ),
        }}
        type="date"
        value={formik.values.DOB}
        name="DOB"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.DOB && formik.errors.DOB}
        helperText={
          formik.touched.DOB && formik.errors.DOB ? formik.errors.DOB : null
        }
      />

      <TextField
        label="Contact Number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: 1, marginBottom: 16 }}
              >
                *
              </Typography>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        value={formik.values.Contact_Number}
        name="Contact_Number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.Contact_Number && formik.errors.Contact_Number}
        helperText={
          formik.touched.Contact_Number && formik.errors.Contact_Number
            ? formik.errors.Contact_Number
            : null
        }
      />

      <TextField
        label="Whatsapp Number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: 1, marginBottom: 16 }}
              >
                *
              </Typography>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        value={formik.values.Whatsapp_Number}
        name="Whatsapp_Number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.Whatsapp_Number && formik.errors.Whatsapp_Number}
        helperText={
          formik.touched.Whatsapp_Number && formik.errors.Whatsapp_Number
            ? formik.errors.Whatsapp_Number
            : null
        }
      />

      <TextField
        label="Educational Qualification"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: 1, marginBottom: 16 }}
              >
                *
              </Typography>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        value={formik.values.Educational_Qualification}
        name="Educational_Qualification"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.Educational_Qualification &&
          formik.errors.Educational_Qualification
        }
        helperText={
          formik.touched.Educational_Qualification &&
          formik.errors.Educational_Qualification
            ? formik.errors.Educational_Qualification
            : null
        }
      />

      <TextField
        label="Experience"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: 1, marginBottom: 16 }}
              >
                *
              </Typography>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        value={formik.values.Experience}
        name="Experience"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.Experience && formik.errors.Experience}
        helperText={
          formik.touched.Experience && formik.errors.Experience
            ? formik.errors.Experience
            : null
        }
      />
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: 1, marginBottom: 16 }}
              >
                *
              </Typography>
            </InputAdornment>
          ),
        }}
        type="file"
        variant="outlined"
        name="Resume"
        onChange={inputclicked}
        onBlur={formik.handleBlur}
      />

      <Button variant="contained" type="submit">
        Update
      </Button>
    </form>
  );
}
