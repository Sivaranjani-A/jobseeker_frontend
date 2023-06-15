import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import { Login } from "./components/Login";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { AddProfile } from "./components/AddProfile";
import { EditProfile } from "./components/EditProfile";
import { UserProvider } from "./context/UserContext";
import { Forgotpassword } from "./components/forgotpassword";
import Verification from "./components/verification";
import ChangePassword from "./components/changepassword";

import JobsList from "./components/JobsList";

function App() {
  const navigate = useNavigate();
  const doLogout = () => {
    if (window.confirm("Do you really want to Logout?")) {
      try {
        localStorage.clear();

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const token = localStorage.getItem("token");
  const profile = localStorage.getItem("profile");
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => navigate("/home")} color="inherit">
            Home
          </Button>
          {token ? (
            <Button onClick={() => navigate("/jobs")} color="inherit">
              Jobs
            </Button>
          ) : null}
          {token ? (
            <Button onClick={() => navigate("/addprofile")} color="inherit">
              Profile
            </Button>
          ) : null}

          {token ? (
            <Button
              onClick={() => {
                doLogout();
              }}
              color="inherit"
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <UserProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/ForgotPassword" element={<Forgotpassword />} />
          <Route path="/Verification" element={<Verification />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/jobs" element={<JobsList />} />

          {/* <Route path="/editprofile" element={<EditProfile />} /> */}
          {profile === "true" ? (
            <Route path="/addprofile" element={<EditProfile />} />
          ) : (
            <Route path="/addprofile" element={<AddProfile />} />
          )}
        </Routes>
      </UserProvider>
    </>
  );
}
function Home() {
  return <h1>Welocome To The JobPortal App🤗🤗</h1>;
}
export default App;
