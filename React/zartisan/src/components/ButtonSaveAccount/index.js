import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import "./style.sass";
import cookies from "js-cookie";

const ButtonSaveAccount = ({
  profileRole,
  profileArtisan,
  artisanEdit,
  artisanData,
  profileUser,
  editUser,
  userSingle
}) => {
  const dispatch = useDispatch();

  let token = cookies.get("TOKEN");
  let parseJwt = token => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  let tokenEmail = "";
  if (token != null) {
    tokenEmail = parseJwt(token).username;
  }

  const handleSaveClick = () => {
    console.log(profileRole, "test");
    switch (profileRole) {
      case "artisan":
        dispatch(
          artisanEdit(
            profileArtisan.email,
            profileArtisan.description,
            profileArtisan.pictureAvatar,
            profileArtisan.pictureGalery,
            profileArtisan.phone
          )
        );
        dispatch(artisanData(1, tokenEmail));
        break;

      case "user":
        dispatch(editUser(profileUser));
        dispatch(userSingle(tokenEmail));
        break;
    }
  };

  return (
    <div>
      <Button
        className="buttons button-save"
        onClick={handleSaveClick}
        htmlType="submit"
      >
        Sauvegarder
      </Button>
    </div>
  );
};

export default ButtonSaveAccount;
