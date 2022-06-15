import React, { FunctionComponent } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../interfaces";
import { logout, selectAuth } from "../../slices/auth";
import { AppDispatch } from "../../store";
import styles from "./styles.module.scss";

const TopNav: FunctionComponent = () => {
  const auth = useSelector(selectAuth);
  const user = auth?.user as IUser;

  const dispatch: AppDispatch = useDispatch();

  let appNode: HTMLElement | null;

  function onMenuIconClick() {
    if (!appNode) appNode = document.getElementById("mjlDash");

    if (appNode) {
      const { classList } = appNode;
      classList.contains("nav-open")
        ? classList.remove("nav-open")
        : classList.add("nav-open");
    }
  }

  function onLogout() {
    dispatch(logout());
  }

  return (
    <nav className={styles.navTop}>
      <Button
        variant="ghost"
        onClick={onMenuIconClick}
        className={styles.hamburger}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          role="img"
          aria-label="Open navigation menu"
        >
          <path d="M0 9.333v-2.667h32v2.667h-32zM10.667 25.333v-2.667h21.333v2.667h-21.333zM5.333 17.333v-2.667h26.667v2.667h-26.667z"></path>
        </svg>
      </Button>

      <div></div>

      <ul className={`${styles.navLinks} list-inline`}>
        <li className="dropdown">
          <Dropdown>
            <Dropdown.Toggle
              variant="ghost"
              id="dropdown-basic"
              style={{ display: "inline-block" }}
            >
              <div className={styles.navAvatar}>{user.name.charAt(0)}</div>
              <strong>{user.name}</strong>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">
                <i className="fas fa-user"></i> Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
