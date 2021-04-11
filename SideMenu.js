import React, { useContext, useState, useEffect } from "react";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { auth } from "../Firebase";
import { StateContext } from "../contextAPI/StateProvider";
import ForumIcon from "@material-ui/icons/Forum";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function SideMenu() {
  const [{ user }, dispatch] = useContext(StateContext);
  const [sideMenu, setSideMenu] = useState(false);
  const [activeHomeMenu, setActiveHomeMenu] = useState(false);
  const [activeCalMenu, setActiveCalMenu] = useState(false);
  const [activeDisMenu, setActiveDisMenu] = useState(false);
  const history = useHistory();

  const logout = () => {
    if (user) {
      history.push("/");
      auth.signOut();
    }
  };

  const openHomePage = () => {
    setActiveHomeMenu(true);
    setActiveDisMenu(false);
    setActiveCalMenu(false);
    history.push("/home");
    setSideMenu(false);
  };

  const openCalender = () => {
    setActiveCalMenu(true);
    setActiveDisMenu(false);
    setActiveHomeMenu(false);
    history.push("/calender");
    setSideMenu(false);
  };

  const openDiscussions = () => {
    setActiveDisMenu(true);
    setActiveCalMenu(false);
    setActiveHomeMenu(false);
    history.push("/discussions");
    setSideMenu(false);
  };

  const openSideMenu = () => {
    setSideMenu(!sideMenu);
    if (document.getElementById("dashboard")) {
      document.getElementById("dashboard").classList.toggle("expander");
    }
  };

  // this will add an active class on home icon inside Side menu initially when user comes to homepage on first render or login
  useEffect(() => {
    openHomePage();
  }, []);

  return (
    <>
      <a onClick={openSideMenu} className="nav__logo hamburger" id="nav-toggle">
        <MenuRoundedIcon fontSize="default" />
      </a>

      <div className= "l-navbar" id="navbar">
        <nav className={`${sideMenu ? "nav show" : "nav"}`}>
          <ul className="nav__list nav__navbar">
            <li className="nav__item">
              <Link onClick={openHomePage}
              className={`${activeHomeMenu ? "nav__link active" : "nav__link"}`}>
                <AppsRoundedIcon />
                <span className="nav__text">Home</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link onClick={openCalender}
              className={`${activeCalMenu ? "nav__link active" : "nav__link"}`}>
                <DateRangeRoundedIcon />
                <span className="nav__text">Calendar</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link onClick={openDiscussions}
              className={`${activeDisMenu ? "nav__link active" : "nav__link"}`}>
                <ForumIcon />
                <span className="nav__text">Discussion</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link onClick={logout} className="nav__link">
                <PowerSettingsNewIcon />
                <span className="nav__text">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default SideMenu;
