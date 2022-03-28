import React from "react";
import { Link, withRouter } from "react-router-dom";

function AdminNavigation(props) {
  
 
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/admin">
            FYP DAPP
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">

              <li
                class={`nav-item  ${
                  props.location.pathname === "/admin" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/admin">
                  Admin 
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/adminbb" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/adminbb">
                  BB
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}

              >
                <Link class="nav-link" to="/">
                 Logout
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(AdminNavigation);