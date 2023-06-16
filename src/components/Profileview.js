import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../global";
import axios from "axios";

function Profileview() {
  const params = useParams();
  const navigate = useNavigate();
  function Back() {
    navigate(-1);
  }
  const [details, setData] = useState([]);
  useEffect(() => {
    getuser();
  }, []);

  let getuser = async () => {
    try {
      const users = await axios.get(`${API}/user/${params.id}`);
      console.log(users.data);
      setData(users.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="profile-container">
      <CardContent>
        <div className="job-specs">
          <h2 className="job-name">{details.Name}</h2>
        </div>
        <p className="job-summary">Email: {details.email}</p>
        <p className="job-summary">DOB: {details.DOB}</p>
        <p className="job-summary">Contact_Number: {details.Contact_Number}</p>
        <p className="job-summary">
          Whatsapp_Number: {details.Whatsapp_Number}
        </p>
        <p className="job-summary">
          Education: {details.Educational_Qualification}
        </p>
        <p className="job-summary">Experience: {details.Experience}</p>
        <p className="job-summary">Resume: {details.Resume}</p>
      </CardContent>
    </Card>
  );
}

export default Profileview;
