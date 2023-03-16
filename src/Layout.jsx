// import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
// import { AllLink } from "./AllLink";
// import { Routes, Route } from "react-router-dom";
// import { API } from "./global";
// import { useState, useEffect } from "react";

// export function Layout() {
//   const [getdata, setdata] = useState();

//   function getink() {
//     fetch(`${API}/shorturlpage`, {
//       method: "GET",
//       headers: {
//         "x-auth-token": localStorage.getItem("token"),
//       },
//     })
//       .then((data) => data.json())
//       .then((data) => {
//         setdata(data);
//       });
//   }

//   useEffect(() => {
//     getink();
//   }, []);

//   async function deletfun(data) {
//     await fetch(`${API}/shorturlpage/${data}`, {
//       method: "DELETE",
//     });

//     getink();
//   }
//   const { collapseSidebar } = useProSidebar();

//   return (
//     <div style={{ display: "flex", height: "100%" }}>
//       <Sidebar className="slider-sidebar">
//         <Menu>
//           <MenuItem component={<Link to="/shortnerurl/alllink" />}>
//             {" "}
//             All Link
//           </MenuItem>
//           <MenuItem component={<Link to="/shortnerurl/linkdetails" />}>
//             {" "}
//             Link details
//           </MenuItem>
//           <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
//         </Menu>
//       </Sidebar>
//       <main>
//         <button className="btn" onClick={() => collapseSidebar()}>
//           Collapse
//         </button>
//         <div className="container ms-5 ">
//           <div className="h3 mt-5 text-decoration-underline text-center ">
//             All Link Created
//           </div>
//           <div className="row  ">
//             <div className="col">
//               <table className="table table-dark table-striped table-hover">
//                 <thead>
//                   <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">Link</th>
//                     <th scope="col">Clickcount</th>
//                     <th scope="col">Delete</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {getdata?.map((data, index) => {
//                     return (
//                       <tr key={data._id}>
//                         <th scope="row">{index}</th>
//                         <td>
//                           <a href={data.shorturl} target="_blank">
//                             {data.shorturl}
//                           </a>
//                         </td>
//                         <td>{data.clickcount}</td>
//                         <td>
//                           <button
//                             onClick={() => deletfun(data._id)}
//                             className="btn btn-danger"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
