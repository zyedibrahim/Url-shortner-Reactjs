import { useEffect, useState } from "react";
import { API } from "./global";
import { AdminNavbar } from "./AdminNavbar";

export function AllLink() {
  const [getdata, setdata] = useState();

  function getink() {
    fetch(`${API}/shorturlpage`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setdata(data);
      });

    if (!localStorage.getItem("token")) window.location.href = "/";
  }

  useEffect(() => {
    getink();
  }, []);

  async function deletfun(data) {
    await fetch(`${API}/shorturlpage/${data}`, {
      method: "DELETE",
    });

    getink();
  }
  return (
    <div>
      <AdminNavbar />
      <div className="container ">
        <div className="h3 mt-5 text-decoration-underline text-center ">
          All Link Created
        </div>
        <div className="row  ">
          <div className="co-md-10">
            <table className="table table-dark table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Link</th>
                  <th scope="col">Clickcount</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {getdata?.map((data, index) => {
                  return (
                    <tr key={data._id}>
                      <th scope="row">{index}</th>
                      <td>
                        <a href={data.shorturl} target="_blank">
                          {data.shorturl}
                        </a>
                      </td>
                      <td>{data.clickcount}</td>
                      <td>
                        <button
                          onClick={() => deletfun(data._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
