import React from "react";
import { Link, withRouter } from "react-router-dom";

function StudentNavigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="#">
            FYP DAPP
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              
              <li
                class={`nav-item  ${
                  props.location.pathname === "/bbstudent" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/bbstudent">
                 Blackboard
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/khstudent" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/khstudent">
                 Kahoot
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

export default withRouter(StudentNavigation);