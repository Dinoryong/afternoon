import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-left: 1px solid ${color.gray.default};
`;

const HeaderRight = () => {
  return (
    <Container>
      <Button
        btnText="로그인"
        btnWidth="60px"
        btnBorderColor="transparent"
        btnHoverBorderColor="transparent"
        btnMarginLeft="0px"
      ></Button>
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
      ></Button>
    </Container>
  );
};

export default HeaderRight;
