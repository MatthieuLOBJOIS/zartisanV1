import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row } from "antd";
import "antd/dist/antd.css";
import FormEditUser from "src/components/FormEditUser";
import Loader from "src/components/Loader";

const ProfileSettingsUser = () => {
  const userSelect = useSelector(state => state.user);

  if (userSelect != "") {
    sessionStorage.setItem("ProfileUser", JSON.stringify(userSelect));
  }
  const sessionUser = JSON.parse(sessionStorage.getItem("ProfileUser"));

  const [profileUser, setProfileUser] = useState({
    pictureAvatar: "",
    nickname: "",
    firstname: "",
    lastname: "",
    phone: "",
    mail: ""
  });

  useEffect(() => {
    if (sessionUser !== null) {
      setProfileUser({
        pictureAvatar: sessionUser.picture,
        nickname: sessionUser.nickname,
        firstname: sessionUser.firstname,
        lastname: sessionUser.lastname,
        phone: sessionUser.phone,
        mail: sessionUser.email
      });
    }
  }, [userSelect]);

  console.log("profile", profileUser);

  return (
    <div>
      <Row type="flex" justify="space-around" align="middle">
        {sessionUser === null ? (
          <Loader />
        ) : (
          <FormEditUser
            profileUser={profileUser}
            setProfileUser={setProfileUser}
          />
        )}
      </Row>
    </div>
  );
};

export default ProfileSettingsUser;
