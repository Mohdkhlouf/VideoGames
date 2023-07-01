import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function Login(props) {
  let [errors, setErrors] = useState([]);
  let navigate = useNavigate();
  let [statusError, setStatusError] = useState("");

  const schema = Yup.object({
    email: Yup.string()
      .required("You have to enter a valid Email")
      .email("this is not a vaild email"),
    password: Yup.string().required("You have to add passsword"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: sendRegisterData,
  });

  async function sendRegisterData(values) {
    let { data } = await axios
      .post(
        "https://king-prawn-app-3mgea.ondigitalocean.app/auth/login",
        values
      )
      .catch((err) => {
        setStatusError(err.response.data.message);
      });
    
    if (data.message == "Done") {
      setErrors([]);
      setStatusError("");
      localStorage.setItem("userTokens", data.access_token);
      props.userData();
      navigate("/Cart");
    }
  }

  return (
    <>
      <div className="width-75 m-auto">
        <h2>Register Now</h2>

        {errors.map((error) => {
          return <div className="text-danger">{error.message}</div>;
        })}
        <form onSubmit={formik.handleSubmit}>
          <label>User Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p className="text-danger">{formik.errors.email}</p>
          <div className="text-danger">{statusError}</div>

          <label>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <p className="text-danger">{formik.errors.password}</p>

          <button type="submit" className="btn btn-info mt-3">
            Register!
          </button>
        </form>
      </div>
    </>
  );
}
