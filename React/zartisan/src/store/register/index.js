//Local imports
import { CONNECT } from "src/store/register/actions";
import { CONNECT_FAIL } from "src/store/register/actions";
import { DECONNEXION } from "src/store/register/actions";
import { VALID_REGISTER } from "src/store/register/actions";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECT: {
      return (state = true);
    }
    case DECONNEXION: {
      localStorage.clear();
      return (state = false);
    }

    case CONNECT_FAIL: {
      return (state = "fail");
    }

    case VALID_REGISTER: {
      return (state = "register");
    }

    default: {
      return state;
    }
  }
};
