import { useFormik } from "formik";
import { Navbar } from "./Navbar";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./global";

export function ShortUrlPage() {
  const [getdata, setdata] = useState([]);
  const [state, setstate] = useState(false);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      urllink: "",
    },
    onSubmit: async (values) => {
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

  function getink() {
    fetch(`${API}/shorturlpage`, {
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

  const lastObject = getdata.filter((obj, index) => {
    return index === getdata.length - 1;
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
      <Navbar />
      {/* <button onClick={() => logout()} className="btn m-2 btn-danger">
        Logout
      </button> */}
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
                  {lastObject.map((ele) => {
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
