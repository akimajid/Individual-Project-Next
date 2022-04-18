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

export const userRegister = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      const res = await api.post("auth/register", {
        username: values.username,
        email: values.email,
        full_name: values.full_name,
        password: values.password,
        repeat_password: values.repeat_password
      })

      const userResponse = res.data.result

      jsCookie.set("auth_token", userResponse.token)

      dispatch({
        type: auth_types.REGISTER_USER,
        payload: userResponse.user
      })
      setSubmitting(false)
    } catch (err) {
      console.log(err)
      dispatch({
        type: network_type.NETWORK_ERROR,
        payload: {
          title: "Register failed",
          description: err.message
        }
      })
    }
  }
}