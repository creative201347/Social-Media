import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { UilPen } from "@iconscout/react-unicons";
import { useParams } from "react-router-dom";

import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import * as UserApi from "../../api/UserRequests.js";
import { logOut } from "../../actions/AuthAction";
import "./InfoCard.css";

const InfoCard = () => {
  const params = useParams();
  const profileUserId = params.id;
  const [modalOpened, setModalOpened] = useState(false);
  const [profileUser, setProfileUser] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId && (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default InfoCard;
