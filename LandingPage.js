import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { StateContext } from "../contextAPI/StateProvider";
import { auth } from "../Firebase";
import { userId } from "../utils";
import LandingImage from "../assets/landingImage.png";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

function LandingPage() {
  const history = useHistory();
  const [{ user }, dispatch] = useContext(StateContext);
  const currentUserEmail = user?.email;

  const handleLogout = () => {
    if (user) {
      history.push("/");
      auth.signOut();
    }
  };

  return (
    <div id="landing-page">
      <div className="inner">
        <div className="container">
          {/* header section */}
          <header className="desktop-header">
            <Link to="/" className="logo link">
              <span>Frontend</span>Team
            </Link>
            <div className="header-right">
              {user ? (
                <>
                  <a onClick={handleLogout}>Logout</a>
                </>
              ) : (
                <Link to="/register">
                  <div>Login</div>
                </Link>
              )}
            </div>
          </header>

          {/* body section */}
          <div className="error-for-public-user">
            {user ? (
              userId.includes(user.uid) ? (
                ""
              ) : (
                <p>
                  <span> Hey {`${currentUserEmail.split("@")[0]}`}, </span>
                  <br/>
                  <ErrorOutlineIcon/> You do not have permission to access. 
                  If you think this is incorrect, please contact administrator.
                </p>
              )
            ) : (
              ""
            )}
          </div>
          <section className="landing-body">
            <div className="row">
              <div className="col-md-4 col-xs-12">
                <div className="banner-container">
                  <p className="banner-text">Talk, share and have fun.</p>
                  <div className="small-description">
                    Schedule meetings with team. Discuss interesting things you found while doing research, 
                    and share your knowledge with everyone.
                  </div>
                  <div className="button-container">
                    <Link to="/" className="button">
                      Discover More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-xs-12">
                <img src={LandingImage} alt="landing image" />
              </div>
            </div>
          </section>

          {/* footer section */}
          <section className="footer">
            <p>
              Made with{" "}
              <span role="img" aria-label="">
                ♥️
              </span>{" "}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
