/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { ComponentType } from "react";
import { NavLink } from "react-router-dom";
import TopNav from "../../components/top-nav";
import { ROLES } from "../../constants";
import AuthorizeView from "../../components/authorize-view";
import { AiFillHome } from "react-icons/ai";
import { FaRestroom } from "react-icons/fa";
import "./styles.scss";

export const withDashboard =
  (ChildComponent: ComponentType<any>) => (props: any) =>
    (
      <div id="mjlApp">
        <nav className="nav-right">
          <div className="nav-brand d-flex">
            <div className="img-wrap">
              <img src="/favicon.ico" alt="logo" />
            </div>
          </div>
          <ul className="nav-links neutralize">
            <li>
              <NavLink to="/">
                <div className="s-icon">
                  <AiFillHome />
                </div>{" "}
                Home
              </NavLink>
            </li>
            <li>
              <AuthorizeView authorizedRoles={[ROLES.admin]}>
                <NavLink to="/restrooms">
                  <div className="s-icon">
                    <FaRestroom />
                  </div>{" "}
                  Restrooms
                </NavLink>
              </AuthorizeView>
            </li>
          </ul>

          <div
            style={{
              position: "absolute",
              width: "100%",
              background: "rgb(24, 32, 46)",
              bottom: 0,
              left: 0,
              color: "#007bff",
              fontSize: ".8rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              &copy; Yatri Motorcycles
            </div>
          </div>
        </nav>
        <div className="_main_panel">
          <TopNav />
          <div className="_bod_wrap">
            <div className="_bod_content">
              <ChildComponent {...props} />
            </div>
          </div>
        </div>
      </div>
    );
