import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import * as yup from "yup";
import { Navbar } from "./Navbar";

const formvalidationschema = yup.object({
  username: yup.string().required("This is fiels is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Passwords must be at least 8 characters"),
});

export function Home() {
  return (
    <div>
      <Navbar />
      <Login />
    </div>
  );
}

function Login() {
  const navigate = useNavigate();

  const successnotify = (data) => toast.success(data);
  const errornotify = (data) => toast.error(data);

  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formvalidationschema,
      onSubmit: (data) => {
        console.log(data);
        Logincheck(data);
      },
    });

  async function Logincheck(val) {
    const data = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    });

    const result = await data.json();

    if (result.message === "login success") {
      localStorage.setItem("token", result.token);
      successnotify(result.message);

      setTimeout(() => {
        navigate("/shortnerurl/alllink");
      }, 3000);
    } else {
      errornotify(result.message);
    }

    console.log(result.message);
  }
  const [check, setcheck] = useState("false");
  return (
    <div>
      <div className="container">
        <div className=" row d-flex justify-content-center">
          <div className="cen shadow-lg col-11 col-md-6 col-lg-4 col-xl-4 card mt-5">
            <form className="card-body" onSubmit={handleSubmit}>
              <ul className="nav nav-pills nav-justified mb-3" id="ex1">
                <li className="nav-item" role="presentation">
                  <a className="nav-link active" id="tab-login" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a className="nav-link" id="tab-register" href="/signup">
                    Register
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="pills-login"
                  role="tabpanel"
                  aria-labelledby="tab-login"
                >
                  <div className="text-center mb-3">
                    <p>Sign in with:</p>
                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <i className="fab fa-google"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <i className="fab fa-github"></i>
                    </button>
                  </div>

                  <p className="text-center">or:</p>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">
                      Email or username
                    </label>
                    <input
                      onBlur={handleBlur}
                      type="text"
                      id="loginName"
                      value={values.username}
                      name="username"
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.username && errors.username ? errors.username : ""}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword">
                      Password
                    </label>
                    <input
                      onBlur={handleBlur}
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                      type={check === false ? "text" : "password"}
                      id="loginPassword"
                      className="form-control"
                    />
                    {touched.password && errors.password ? errors.password : ""}
                  </div>

                  <div className="mt-2 mb-2 form-check">
                    <input
                      id="show"
                      value=""
                      className="form-check-input"
                      onClick={() => setcheck(!check)}
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="show">
                      Show Password
                    </label>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 d-flex justify-content-center">
                      <div className="form-check mb-3 mb-md-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="loginCheck"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="loginCheck"
                        >
                          {" "}
                          Remember me{" "}
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6 d-flex justify-content-center">
                      <Link to="/forgotpage">Forgot password?</Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign in
                  </button>

                  <div className="text-center">
                    <p>
                      Not a member? <a href="/signup">Register</a>
                    </p>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
// value={values.username}
// name="username"
// onChange={handleChange}
// type="text"

// value={values.password}
// name="password"
// onChange={handleChange}
// type="text"

// {/* <ul
// className="nav nav-pills nav-justified mb-3"
// id="ex1"
// role="tablist"
// >
// <li className="nav-item" role="presentation">
//   <a
//     className="nav-link active"
//     id="tab-login"
//     data-mdb-toggle="pill"
//     href="#pills-login"
//     role="tab"
//     aria-controls="pills-login"
//     aria-selected="true"
//   >
//     Login
//   </a>
// </li>
// <li className="nav-item" role="presentation">
//   <a
//     className="nav-link"
//     id="tab-register"
//     href="#pills-register"
//     role="tab"
//     aria-controls="pills-register"
//     aria-selected="false"
//   >
//     Register
//   </a>
// </li>
// </ul> */}

// {/* <div
//   className="tab-pane fade"
//   id="pills-register"
// >
//   <div className="text-center mb-3">
//     <p>Sign up with:</p>
//     <button
//       type="button"
//       className="btn btn-link btn-floating mx-1"
//     >
//       <i className="fab fa-facebook-f"></i>
//     </button>

//     <button
//       type="button"
//       className="btn btn-link btn-floating mx-1"
//     >
//       <i className="fab fa-google"></i>
//     </button>

//     <button
//       type="button"
//       className="btn btn-link btn-floating mx-1"
//     >
//       <i className="fab fa-twitter"></i>
//     </button>

//     <button
//       type="button"
//       className="btn btn-link btn-floating mx-1"
//     >
//       <i className="fab fa-github"></i>
//     </button>
//   </div>

//   <p className="text-center">or:</p>

//   <div className="form-outline mb-4">
//     <input
//       type="text"
//       id="registerName"
//       className="form-control"
//     />
//     <label className="form-label" htmlFor="registerName">
//       Name
//     </label>
//   </div>

//   <div className="form-outline mb-4">
//     <input
//       type="text"
//       id="registerUsername"
//       className="form-control"
//     />
//     <label className="form-label" htmlFor="registerUsername">
//       Username
//     </label>
//   </div>

//   <div className="form-outline mb-4">
//     <input
//       value={values.username}
//       name="username"
//       onChange={handleChange}
//       type="text"
//       id="registerEmail"
//       className="form-control"
//     />
//     <label className="form-label" htmlFor="registerEmail">
//       Email
//     </label>
//   </div>

//   <div className="form-outline mb-4">
//     <input
//       value={values.password}
//       name="password"
//       onChange={handleChange}
//       type="text"
//       id="registerPassword"
//       className="form-control"
//     />
//     <label className="form-label" htmlFor="registerPassword">
//       Password
//     </label>
//   </div>

//   <div className="form-outline mb-4">
//     <input
//       type="password"
//       id="registerRepeatPassword"
//       className="form-control"
//     />
//     <label
//       className="form-label"
//       htmlFor="registerRepeatPassword"
//     >
//       Repeat password
//     </label>
//   </div>

//   <div className="form-check d-flex justify-content-center mb-4">
//     <input
//       className="form-check-input me-2"
//       type="checkbox"
//       value=""
//       id="registerCheck"
//       aria-describedby="registerCheckHelpText"
//     />
//     <label className="form-check-label" htmlFor="registerCheck">
//       I have read and agree to the terms
//     </label>
//   </div>

//   <button
//     type="submit"
//     className="btn btn-primary btn-block mb-3"
//   >
//     Sign in
//   </button>
// </div> */}
