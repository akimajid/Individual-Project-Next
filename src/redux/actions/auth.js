import jsCookie from "js-cookie";
import api from "../../lib/api";
import { auth_types, network_type } from "../types";

export const userLogin = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/login", {
        username: values.username,
        password: values.password,
      });

      const userResponse = res.data.result;

      jsCookie.set("auth_token", userResponse.token);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: userResponse.user,
      });
      setSubmitting(false);
    } catch (err) {
      console.log(err);
      alert("Username or password wrong")
      dispatch({
        type: network_type.NETWORK_ERROR,
        payload: {
          title: "Login failed",
          description: err.message,
        },
      });
      setSubmitting(false);
    }
  };
};

export const fetchUserData = () => {
  return async (dispatch, getState) => {
    try {
      const res = await api.get("/users", {
        params: {
          userId: getState().user.id,
        },
      });

      dispatch({
        type: auth_types.KEEP_LOGIN,
        payload: res.data.result,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
