import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { AUTO_LOGIN } from "../../pages/api/user";

const useStore = () => {
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );
  const autoLogin = useSelector(
    (state: RootStateOrAny) => state.login.autoLogin
  );

  const dispatch = useDispatch();

  const autoLoginCheck = async () => {
    dispatch({ type: "AUTO_LOGIN_CHECK" });
  };
  const loginStateTrue = async () => {
    dispatch({ type: "LOGIN_STATE_TRUE" });
  };
  const loginStateFalse = async () => {
    dispatch({ type: "LOGIN_STATE_FALSE" });
  };

  return {
    autoLoginCheck,
    loginState,
    loginStateTrue,
    loginStateFalse,
    autoLogin,
  };
};

const index = ({ setRenderState }) => {
  const [autoLoginApiState, setAutoLoginApiState] = useState(false);

  const {
    autoLoginCheck,
    loginStateTrue,
    loginStateFalse,
    loginState,
    autoLogin,
  } = useStore();

  useEffect(() => {
    const requestAutoLogin = async () => {
      const autoLoginReq = {
        accountEmail: window.localStorage.getItem("accountEmail"),
        accountId: window.localStorage.getItem("accountId"),
      };
      const autoLoginConfig = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
        },
      };

      const result = await AUTO_LOGIN(autoLoginReq, autoLoginConfig);
      console.log(result);

      if (result.status === 200) {
        loginStateTrue();
        setRenderState(true);
      } else {
        loginStateFalse();
        setRenderState(true);
      }
    };

    if (!loginState) {
      autoLoginCheck();
      if (!autoLoginApiState) {
        if (autoLogin == 1) {
          requestAutoLogin();
          setAutoLoginApiState(true);
        } else if (autoLogin == 2) {
          setRenderState(true);
        }
      }
    }
  });

  return <div></div>;
};

export default index;
