import React, { useEffect, useState } from "react";
import { API } from "../global";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Job from "./Job";

function JobsList() {
  const navigate = useNavigate();
  const [List, setList] = useState([]);
  const token = localStorage.getItem("token");
  const getJobs = async () => {
    if (token) {
      const jobs = await axios.get(`${API}/jobs`);

      setList(jobs.data);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div className="job-list">
      {List.map((job) => (
        <Job jobs={job} />
      ))}
    </div>
  );
}
export default JobsList;
