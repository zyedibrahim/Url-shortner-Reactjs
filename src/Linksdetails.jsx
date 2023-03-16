import { useEffect, useState } from "react";
import { API } from "./global";
import { AdminNavbar } from "./Adminnavbar";

export function Linkdetails() {
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
  }

  useEffect(() => {
    getink();
  }, []);

  // async function deletfun(data) {
  //   await fetch(`${API}/shorturlpage/${data}`, {
  //     method: "DELETE",
  //   });

  //   getink();
  // }

  const [searchValue, setSearchValue] = useState();
  console.log(searchValue);
  const filteredArray = getdata?.filter((item) => {
    const itemDate = new Date(item.date);
    const searchDate = new Date(searchValue);
    console.log(itemDate, searchDate);
    return (
      itemDate.getDate() === searchDate.getDate() &&
      itemDate.getMonth() === searchDate.getMonth() &&
      itemDate.getFullYear() === searchDate.getFullYear()
    );
  });
  console.log(filteredArray);

  return (
    // <div style={{ display: "flex", height: "1000%" }}>
    //   <Sidebarcom />
    //   <div className="con">
    //     <button className="btn  btn-toggler" onClick={() => collapseSidebar()}>
    //       Collapse
    //     </button>
    //     <div className="h3 ms-5 mt-5 text-decoration-underline text-center ">
    //       All Link Created
    //     </div>
    //     <div className="row">
    //       <div className="col">
    //         <table className="table table-dark table-striped table-hover">
    //           <thead>
    //             <tr>
    //               <th scope="col">#</th>
    //               <th scope="col">Link</th>
    //               <th scope="col">Clickcount</th>
    //               <th scope="col">Delete</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {getdata?.map((data, index) => {
    //               return (
    //                 <tr key={data._id}>
    //                   <th scope="row">{index}</th>
    //                   <td>
    //                     <a href={data.shorturl} target="_blank">
    //                       {data.shorturl}
    //                     </a>
    //                   </td>
    //                   <td>{data.clickcount}</td>
    //                   <td>
    //                     <button
    //                       onClick={() => deletfun(data._id)}
    //                       className="btn btn-danger"
    //                     >
    //                       Delete
    //                     </button>
    //                   </td>
    //                 </tr>
    //               );
    //             })}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <AdminNavbar />
      <div className="container ">
        {/* {filteredData.map((item) => (
          <div key={item.id}>{item.date}</div>
        ))} */}

        <div className="h3 mt-5 text-decoration-underline text-center ">
          All Link Created Day
          <input
            type="date"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <div className="row  ">
          <div className="co-md-10">
            <table className="table table-dark table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Link</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {getdata?.map((data, index) => {
                  return (
                    <tr key={data._id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <a href={data.shorturl} target="_blank">
                          {data.shorturl}
                        </a>
                      </td>
                      <td>
                        <small className="text">{data.date}</small>
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
