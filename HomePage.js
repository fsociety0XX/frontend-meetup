import React, { useContext } from "react";
import { StateContext } from "../contextAPI/StateProvider";
import { userList } from "../utils";
import DefaultAvatar from "../assets/default-user.png";

function HomePage() {
  const [{ user }, dispatch] = useContext(StateContext);

  return (
    <>
      <div className="dashboard" id="dashboard">
        <div className="homepage" id="homepage">
          <div className="team-profiles">
            <div className="inner">
              <div className="container">
                <div className="row">
                  {userList?.map((user, i) => {
                    return (
                      <div className="col-xs-12 col-sm-4 col-md-3" key={i}>
                        <div className="profile-card">
                          <img
                            className="profile-image"
                            src={user.image}
                            onError={(e) => {
                              e.target.src = DefaultAvatar;
                            }}
                          />
                          <p className="profile-name">{user.name}</p>
                          <div className="profile-email">{user.email}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
