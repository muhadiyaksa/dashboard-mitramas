import React, { useState, useEffect } from "react";
import Button from "../element/Button";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import { login } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Login() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const [spiner, setSpiner] = useState(false);
  const postLogin = () => {
    setSpiner(true);
    Axios({
      method: "POST",
      data: {
        email: "akun17@mig.id",
        password: "21EBDDE5",
      },
      url: "https://mitramas-test.herokuapp.com/auth/login",
    }).then(async (res) => {
      if (res.data) {
        // console.log(res.data);
        const actionResult = await dispatch(login(res.data));
        // const result = unwrapResult(actionResult);
        // console.log(result);
        // if (result) {
        //   window.location.reload();
        // }
        setSpiner(false);
      }
    });
  };
  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <div className="login">
          <div className="form-login">
            <h5>Login</h5>
            <span>Langsung Login dengan Data yang sudah disediakan</span>
            <label htmlFor="">Email</label>
            <input type="email" defaultValue="akun17@mig.id" className="form-control disabled" />

            <label htmlFor="">Password</label>
            <input type="password" defaultValue="21EBDDE5" className="form-control disabled" />
            <Button isPrimary className="d-inline-flex align-items-center justify-content-center " onClick={postLogin}>
              <span>Login</span>
              {spiner === true ? <span className="lds-dual-ring"></span> : ""}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
