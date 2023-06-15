import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../global";
import axios from "axios";

const profilevalidationSchema = yup.object({
  Name: yup.string().required(),
  DOB: yup.string().required(),
  Contact_Number: yup.number().required(),
  Whatsapp_Number: yup.number().required(),
  Educational_Qualification: yup.string().required(),
  Experience: yup.number().required(),
  Resume: yup.string().required().url(),
});

export function AddProfile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
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
      console.log(values);
      const profile = await axios.post(`${API}/user/profile/${email}`, values);
      alert(profile.data.message);
    },
  });

  return (
    <form className="add-profile-form" onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
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
        label="Resume URL"
        variant="outlined"
        value={formik.values.Resume}
        name="Resume"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.Resume && formik.errors.Resume}
        helperText={
          formik.touched.Resume && formik.errors.Resume
            ? formik.errors.Resume
            : null
        }
      />

      <Button variant="contained" type="submit">
        Add
      </Button>
    </form>
  );
}
