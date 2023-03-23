import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./global";
import { AdminNavbar } from "./AdminNavbar";

export function ShortUrlPage() {
  const [getdata, setdata] = useState([]);
  const [state, setstate] = useState(false);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      urllink: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      await fetch(`${API}/shorturlpage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      getink();
      setstate(true);
    },
  });
  // git branch --delete dubplicatemaseter
  function getink() {
    fetch(`${API}/shorturlpage/get`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        setdata(data);
      });
  }

  useEffect(() => {
    getink();
  }, []);

  const lastObject = getdata?.filter((obj, index) => {
    return index === getdata?.length - 1;
  });

  console.log(state);
  // function logout() {
  //   localStorage.clear();
  //   window.location.href = "/";
  // }

  // async function deletfun(data) {
  //   await fetch(`${API}/shorturlpage/${data}`, {
  //     method: "DELETE",
  //   });

  //   getink();
  // }

  return (
    <div>
      <nav className=" navbar navbar-expand-md bg-primary text-light navbar-dark">
        <div className="container">
          <span>URL SHORTNER</span>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#mynav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" navbar-collapse " id="mynav">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item active ">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item  ">
                <Link to={"/signup"} className="nav-link">
                  Signup
                </Link>
              </li>
              <li className="nav-item ">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container ">
        <div className="row mt-5 d-flex justify-content-center">
          <div className=" col-xl-7 col-lg-7 col-md-7 col-sm-12">
            <form onSubmit={handleSubmit}>
              <div className="mt-3 text-center ">
                <div className="h2">URL SHORTNER</div>
              </div>
              <div className="p-3">
                <div className=" shadow-lg input-group mb-2">
                  <input
                    placeholder="Paste Your Url"
                    id="urllink"
                    name="urllink"
                    onChange={handleChange}
                    value={values.urllink}
                    type="text"
                    className="form-control form-control-lg"
                  />
                  <button type="submit" className="btn btn-lg btn-danger">
                    Enter
                  </button>
                </div>

                <div className="text-muted text-center">
                  <h6>Past Your Url </h6>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-around ">
          <div className="col-md-7">
            <p>
              <span>Short Url : </span>
              {state === true ? (
                <div>
                  {lastObject?.map((ele) => {
                    return (
                      <div key={ele._id}>
                        <h4>{ele.shorturl}</h4>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
