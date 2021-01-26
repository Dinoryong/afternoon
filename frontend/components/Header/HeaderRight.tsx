import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import { NextRouter } from "next/router";

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

const HeaderRight = ({ router, routerPath }: HeaderProps) => {
  return (
    <Container>
      <Button
        btnText="로그인"
        btnWidth="60px"
        btnHoverBorderColor="transparent"
        btnMarginLeft="0px"
        btnBorderColor="transparent"
        btnBgColor={routerPath === "/" ? "transparent" : null}
        btnTextColor={routerPath === "/" ? "white" : null}
        btnOnClick={(): void => {
          console.log("login");
        }}
      />
      <Button
        btnText="회원가입"
        btnWidth="80px"
        btnBorderColor={color.green.default}
        btnBgColor={color.green.default}
        btnTextColor={color.white.default}
        btnHoverBgColor={color.green.dark}
        btnHoverBorderColor={color.green.dark}
        btnHoverTextColor={color.white.default}
        btnMarginRight="0px"
        btnOnClick={(): void => {
          router.push("/signup");
        }}
      />
    </Container>
  );
};

export default HeaderRight;
