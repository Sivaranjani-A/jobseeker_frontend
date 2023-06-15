import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Job({ jobs }) {
  return (
    <Card className="job-container">
      <CardContent>
        <div className="job-specs">
          <h2 className="job-name">{jobs.name}</h2>
        </div>

        <p className="job-summary">Role: {jobs.type}</p>
        <p className="job-summary">Salary: {jobs.salary}</p>
        <p className="job-summary">Location: {jobs.location}</p>
      </CardContent>
    </Card>
  );
}

export default Job;
