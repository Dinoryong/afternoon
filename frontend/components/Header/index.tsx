import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "../LoginModal";
import SubmitModal from "../SubmitModal";
import { AUTO_LOGIN } from "../../pages/api/user";

const Container = styled.div`
  position: fixed;
  z-index: 10;
  justify-content: center;
  display: flex;
  height: 62px;
  width: 100%;
  font-size: 14px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(1, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 1280px; */
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

const ModalFrame = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const CloseBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: zoom-out;
`;

const useCounter = () => {
  const isShown = useSelector((state) => state.login.isShown);
  const loginState = useSelector((state) => state.login.loginState);
  const autoLogin = useSelector((state) => state.login.autoLogin);
  const submitShown = useSelector((state) => state.submit.submitShown);

  const dispatch = useDispatch();
  const toggle = async () => {
    await dispatch({ type: "TOGGLE" });
  };
  const autoLoginCheck = async () => {
    await dispatch({ type: "AUTO_LOGIN_CHECK" });
  };
  const loginStateTrue = async () => {
    await dispatch({ type: "LOGIN_STATE_TRUE" });
  };
  const loginStateFalse = async () => {
    await dispatch({ type: "LOGIN_STATE_FALSE" });
  };
  const toggleSubmit = async () => {
    await dispatch({ type: "TOGGLE_SUBMIT" });
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
  };
};

const index = () => {
  const router = useRouter();
  const routerPath = router.pathname;

  const {
    autoLoginCheck,
    toggleSubmit,
    submitShown,
    loginStateTrue,
    loginStateFalse,
    loginState,
    isShown,
    autoLogin,
    toggle,
  } = useCounter();

  const [windowWidth, setWindowWidth] = useState<number>();
  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(() => {
    autoLoginCheck();

    const doAutoLogin = async () => {
      const result = await AUTO_LOGIN();
      if (result.status === 200) {
        loginStateTrue();
      } else {
        loginStateFalse();
      }
    };

    if (autoLogin) {
      if (loginState) {
        doAutoLogin();
      }
    }

    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", resizeHandler);

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
    };

    return cleanup;
  });

  useEffect(() => {
    document.body.style.overflow = isShown ? "hidden" : "scroll";
  }, [isShown]);

  const containerStyle = {
    display: routerPath === "/signup" ? "none" : "flex",
    boxShadow:
      routerPath === "/"
        ? "none"
        : "0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(1, 0, 0, 0.1)",
    backgroundColor: routerPath === "/" ? "transparent" : "white",
  };

  return (
    <Container style={containerStyle}>
      {isShown && (
        <>
          <ModalFrame style={{ height: windowHeight }}>
            <CloseBg onClick={toggle}></CloseBg>
            <LoginModal></LoginModal>
          </ModalFrame>
        </>
      )}
      {submitShown && (
        <>
          <ModalFrame style={{ height: windowHeight }}>
            <CloseBg onClick={toggleSubmit}></CloseBg>
            <SubmitModal
              windowWidth={windowWidth}
              windowHeight={windowHeight}
            ></SubmitModal>
          </ModalFrame>
        </>
      )}
      <Wrapper>
        <HeaderLeft router={router} routerPath={routerPath} />
        <HeaderCenter routerPath={routerPath} />
        <HeaderRight router={router} routerPath={routerPath} />
      </Wrapper>
    </Container>
  );
};

export default index;
