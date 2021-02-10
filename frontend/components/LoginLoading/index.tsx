import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { AUTO_LOGIN } from "../../pages/api/user";

const useStore = () => {
  const isShown = useSelector((state: RootStateOrAny) => state.login.isShown);
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );
  const autoLogin = useSelector(
    (state: RootStateOrAny) => state.login.autoLogin
  );
  const postShown = useSelector(
    (state: RootStateOrAny) => state.post.postShown
  );
  const submitShown = useSelector(
    (state: RootStateOrAny) => state.submit.submitShown
  );

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };
  const togglePost = async () => {
    dispatch({ type: "TOGGLE_POST" });
  };
  const autoLoginCheck = async () => {
    dispatch({ type: "AUTO_LOGIN_CHECK" });
  };
  const loginStateTrue = async () => {
    dispatch({ type: "LOGIN_STATE_TRUE" });
  };
  const loginStateFalse = async () => {
    dispatch({ type: "LOGIN_STATE_FALSE" });
  };
  const toggleSubmit = async () => {
    dispatch({ type: "TOGGLE_SUBMIT" });
  };

  return {
    autoLoginCheck,
    toggleSubmit,
    submitShown,
    loginState,
    loginStateTrue,
    loginStateFalse,
    autoLogin,
    isShown,
    toggle,
    togglePost,
    postShown,
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
