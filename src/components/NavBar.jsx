import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { activeLink } from "../utils/ActiveLink";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container-fluid">
          <ul className="navbar-nav mx-auto  mb-2 mb-lg-0">
            <li className="nav-item ">
              <Link
                to={ROUTER.Home}
                className={
                  activeLink(ROUTER.Home, pathname) ? "activeLink" : "Link"
                }
              >
                Table
              </Link>
            </li>
            <li className="nav-item mx-lg-5">
              <Link
                to={ROUTER.AddUser}
                className={
                  activeLink(ROUTER.AddUser, pathname) ? "activeLink" : "Link"
                }
              >
                Add User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
