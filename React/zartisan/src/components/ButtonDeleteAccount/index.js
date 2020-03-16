import React from "react";
import { Button } from "antd";
import { deleteUser } from "src/store/user/actions";
import { useDispatch } from "react-redux";
import "./style.sass";

const ButtonDeleteAccount = ({ profileUser, profileArtisan, profileRole }) => {
  const dispatch = useDispatch();
  const handleDeleteAccount = () => {
    switch (profileRole) {
      case "artisan":
        console.log("delete artisan profile");
        break;
      case "user":
        dispatch(deleteUser(profileUser.mail));
        break;
    }
  };
  return (
    <div>
      <Button className="buttons button-delete" onClick={handleDeleteAccount}>
        Supprimer le compte
      </Button>
    </div>
  );
};

export default ButtonDeleteAccount;
