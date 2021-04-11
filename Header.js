import React, { useContext } from "react";
import { StateContext } from "../contextAPI/StateProvider";
import { Link } from "react-router-dom";
import { userList } from "../utils";
import DefaultAvatar from "../assets/default-user.png";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";

function Header() {
  const [{ user }, dispatch] = useContext(StateContext);
  const currentUserName = user?.email.split("@")[0];
  const currentEmail = user?.email;
  const firstLetterCapitalInUserName =
    user && currentUserName.charAt(0).toUpperCase() + currentUserName.slice(1);

  const handleTheme = () => {
    let x = document.getElementsByTagName("BODY")[0];
    x.classList.toggle("dark-mode");
  }

  return (
    <>
      <header className="dashboarf-header" id="header">
        <Link to="/" className="logo link">
          <span>Frontend</span>Team
        </Link>
        <div className="header-right">
          <div className="theme-icon" onClick={handleTheme}>
            <Brightness4RoundedIcon />
          </div>

          <div className="user-details">
            {user ? (
              <>
                <span>
                  {userList?.map((user, i) => {
                    if (
                      user.name.substr(0,user.name.indexOf(' ')).toUpperCase() === currentUserName.toUpperCase()
                    ) {
                      return (
                        <img
                          key={i}
                          src={user.image}
                          className="user-image"
                          onError={(e) => {
                            e.target.src = DefaultAvatar;
                          }}
                        />
                      );
                    }
                  })}
                </span>

                <div className="user-info">
                  {firstLetterCapitalInUserName}
                  <div>{currentEmail}</div>
                </div>
              </>
            ) : (
              <Link to="/register">
                <div>Login</div>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
