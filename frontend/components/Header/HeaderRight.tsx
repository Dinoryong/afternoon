import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import { NextRouter } from "next/router";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { LOG_OUT } from "../../pages/api/user";
import Swal from "sweetalert2";

const Container = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid ${color.gray.default};
  @media only screen and (min-width: 768px) {
    padding-left: 10px;
  }
  @media only screen and (min-width: 1280px) {
    padding-left: 15px;
  }
`;

type HeaderProps = {
  routerPath?: String;
  router?: NextRouter;
  inputFocus?: boolean;
  setInputFocus?: Dispatch<SetStateAction<boolean>>;
  windowWidth?: number;
};

const useStore = () => {
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );
  const dispatch = useDispatch();
  const toggle = async () => {
    dispatch({ type: "TOGGLE" });
  };
  const loginStateFalse = async () => {
    dispatch({ type: "LOGIN_STATE_FALSE" });
  };
  const autoLoginFalse = async () => {
    dispatch({ type: "AUTO_LOGIN_FALSE" });
  };
  return { loginState, loginStateFalse, toggle, autoLoginFalse };
};

const HeaderRight = ({
  router,
  routerPath,
  inputFocus,
  setInputFocus,
  windowWidth,
}: HeaderProps) => {
  const { loginState, loginStateFalse, toggle, autoLoginFalse } = useStore();

  const toggleLogin = (): void => {
    setInputFocus(false);
    toggle();
  };

  const requestLogout = async () => {
    await autoLoginFalse();
    await LOG_OUT();
    await loginStateFalse();
    Swal.fire({ icon: "success", text: "로그아웃 되었습니다." });
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
            btnMarginRight={windowWidth < 1280 ? "0px" : "8px"}
            btnBorderColor="transparent"
            btnBgColor={"transparent"}
            btnOnClick={requestLogout}
            btnTextColor={
              (routerPath === "/" || routerPath === "/home") && !inputFocus
                ? "white"
                : color.black.default
            }
            btnUseOpacity={
              (routerPath === "/" || routerPath === "/home") && !inputFocus
                ? false
                : true
            }
            btnSetOpacity={"0.4"}
          />
          <Button
            btnText={"프로필"}
            btnWidth={windowWidth < 1280 ? "70px" : "80px"}
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
            btnMarginRight={windowWidth < 1280 ? "0px" : "8px"}
            btnBorderColor="transparent"
            btnBgColor={"transparent"}
            btnTextColor={
              (routerPath === "/" || routerPath === "/home") && !inputFocus
                ? "white"
                : null
            }
            btnOnClick={toggleLogin}
          />
          <Button
            btnText={"회원가입"}
            btnWidth={windowWidth < 1280 ? "70px" : "80px"}
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
