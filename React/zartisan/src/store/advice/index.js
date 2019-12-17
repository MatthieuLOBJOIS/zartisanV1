import { ALERT_SUCCESS } from "src/store/advice/actions";

const initialState = {
  report: {}
};

export default (state = initialState, action) => {
  // console.log('reducer >>', action);

  switch (action.type) {
    case ALERT_SUCCESS: {
      //console.log('store advice');
      console.log(action.response);
      return (state.report = action.response);
    }
    default: {
      return state;
    }
  }
};
