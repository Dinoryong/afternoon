import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import { NextRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT } from "../../pages/api/user";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-left: 1px solid ${color.gray.default};
`;

type HeaderProps = {
  routerPath?: String;
  router?: NextRouter;
};

const useCounter = () => {
  const loginState = useSelector((state) => state.login.loginState);
  const dispatch = useDispatch();
  const toggle = async () => {
    await dispatch({ type: "TOGGLE" });
  };
  const loginStateFalse = async () => {
    await dispatch({ type: "LOGIN_STATE_FALSE" });
  };
  const autoLoginFalse = async () => {
    await dispatch({ type: "AUTO_LOGIN_FALSE" });
  };
  return { loginState, loginStateFalse, toggle, autoLoginFalse };
};

const HeaderRight = ({ router, routerPath }: HeaderProps) => {
  const { loginState, loginStateFalse, toggle, autoLoginFalse } = useCounter();

  const toggleLogin = (): void => {
    toggle();
  };

  const requestLogout = async () => {
    await autoLoginFalse();
    await LOG_OUT();
    await loginStateFalse();
    alert("로그아웃 되었습니다.");
    router.push("/");
  };

  const moveProfile = (): void => {
    router.push("/profile");
  };

  const moveSignup = (): void => {
    router.push("/signup");
  };

  return (
    <Container>
      {loginState && (
        <>
          <Button
            btnText={"로그아웃"}
            btnWidth="60px"
            btnHoverBorderColor="transparent"
            btnMarginLeft="0px"
            btnBorderColor="transparent"
            btnBgColor={routerPath === "/" ? "transparent" : null}
            btnOnClick={requestLogout}
            btnTextColor={routerPath === "/" ? "white" : color.black.default}
            btnUseOpacity={routerPath === "/" ? false : true}
            btnSetOpacity={"0.4"}
          />
          <Button
            btnText={"프로필"}
            btnWidth="80px"
            btnBorderColor={color.green.default}
            btnBgColor={color.green.default}
            btnTextColor={color.white.default}
            btnHoverBgColor={color.green.dark}
            btnHoverBorderColor={color.green.dark}
            btnHoverTextColor={color.white.default}
            btnMarginRight="0px"
            btnOnClick={moveProfile}
          />
        </>
      )}
      {!loginState && (
        <>
          <Button
            btnText={"로그인"}
            btnWidth="60px"
            btnHoverBorderColor="transparent"
            btnMarginLeft="0px"
            btnBorderColor="transparent"
            btnBgColor={routerPath === "/" ? "transparent" : null}
            btnTextColor={routerPath === "/" ? "white" : null}
            btnOnClick={toggleLogin}
          />
          <Button
            btnText={"회원가입"}
            btnWidth="80px"
            btnBorderColor={color.green.default}
            btnBgColor={color.green.default}
            btnTextColor={color.white.default}
            btnHoverBgColor={color.green.dark}
            btnHoverBorderColor={color.green.dark}
            btnHoverTextColor={color.white.default}
            btnMarginRight="0px"
            btnOnClick={moveSignup}
          />
        </>
      )}
    </Container>
  );
};

export default HeaderRight;
