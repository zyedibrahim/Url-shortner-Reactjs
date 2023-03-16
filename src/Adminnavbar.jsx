import { Link } from "react-router-dom";

export function AdminNavbar() {
  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#">
          Offcanvas dark navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end w-50 text-bg-dark"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Dark offcanvas
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/shortnerurl/alllink"
                >
                  Link
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shortnerurl/linkdetails">
                  Actions
                </Link>
              </li>

              <li onClick={() => logout()} className="nav-item">
                <Link className="nav-link"> Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
