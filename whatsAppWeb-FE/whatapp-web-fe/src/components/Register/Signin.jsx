import { Alert, Button, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../Redux/Auth/Action";

const Signin = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const auth = useSelector((store)=>store.auth);


  const submitForm = (e) => {
    console.log("handle submit");
    e.preventDefault();
    setOpenSnackbar(true);
    dispatch(login(inputData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value })); //that property of inputData will change
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (token) {
      dispatch(currentUser(token));
    }
  }, [token]);

  useEffect(() => {
    if (auth?.reqUser?.fullName) {
      navigate("/"); //if user exist then redirect to homepage
    }
  }, [auth.reqUser]);

  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={submitForm} className="space-y-5">
            <div>
              <p className="mb-2">Email</p>
              <input
                placeholder="Enter your Email"
                onChange={(e) => handleChange(e)}
                type="email"
                value={inputData.email}
                name="email"
                className="py-2 outline outline-green-600 w-full rounded-md border"
              />
            </div>
            <div>
              <p className="mb-2">Password</p>
              <input
                placeholder="Enter your Password"
                onChange={(e) => handleChange(e)}
                type="password"
                name="password"
                value={inputData.password}
                className="py-2 outline outline-green-600 w-full rounded-md border"
              />
            </div>
            <div>
              <Button
                type="submit"
                style={{ backgroundColor: "#4CAF50", padding: ".5rem 0rem" }}
                variant="contained"
                className="w-full bg-green-600"
              >
                Sign In
              </Button>
            </div>
          </form>

          <div className="flex space-x-3 items-center mt-4">
            <p className="m-0">Create New Account</p>
            <Button variant="text" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Login Successful !
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signin;
