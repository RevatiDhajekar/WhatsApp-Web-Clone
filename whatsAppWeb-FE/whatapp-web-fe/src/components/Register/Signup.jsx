import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, register } from "../../Redux/Auth/Action";

const Signup = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const auth = useSelector((store)=>store.auth);
  const token = localStorage.getItem("token");

  console.log("current user=",auth.reqUser)

  useEffect(()=>{
    if(token){
        dispatch(currentUser(token));
    }
  },[token]);

  useEffect(()=>{
    if(auth?.reqUser?.fullName){
        navigate("/")   //if user exist then redirect to homepage
    }
  },[auth.reqUser])


  const submitForm = (e) => {
    console.log("handle submit", inputData);
    dispatch(register(inputData))
    e.preventDefault();
    setOpenSnackbar(true);
  };

  const handleChange = (e) => {
    const {name , value} = e.target;
    setInputData((prevData)=>({...prevData,[name]:value}));  //that property of inputData will change
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={submitForm} className="space-y-5">
            <div>
              <p className="mb-2">Username</p>
              <input
                placeholder="Enter username"
                onChange={(e) => handleChange(e)}
                type="text"
                value={inputData.fullName}
                name="fullName"
                className="py-2 outline outline-green-600 w-full rounded-md border"
              />
            </div>
            <div>
              <p className="mb-2">Email</p>
              <input
                placeholder="Enter your Email"
                onChange={(e) => handleChange(e)}
                type="email"
                name="email"
                value={inputData.email}
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
            <Button
              type="submit"
              style={{ backgroundColor: '#4CAF50', padding: '.5rem 0rem' }}
              variant="contained"
              className="w-full bg-green-600"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex space-x-3 items-center mt-4">
            <p className="m-0">Already Have Account?</p>
            <Button variant="text" onClick={()=>navigate("/signin")}>
              signin
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
          Your Account Created Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;
