import axios from "axios";
import { useEffect, useState } from "react";

import { API } from "../global";
import JobseekersList from "./JobseekersList";

function Jobseekers() {
  const [list, setlist] = useState([]);

  const getList = async () => {
    try {
      const list = await axios.get(`${API}/user/getlist`);
      console.log(list);

      if (list) {
        setlist(list.data);
      } else {
        alert(list.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div className="list-container">
        <JobseekersList list={list} />
      </div>
    </>
  );
}
export default Jobseekers;
