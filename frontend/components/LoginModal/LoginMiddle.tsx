import React from "react";
import Button from "../Button";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
`;

const InputNumber = styled.input`
  display: flex;
	width: 300px;
	height: 40px;
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  ::placeholder{
    font-size: 12px;
  }
  font-size: 12px;
  :focus {
    outline: none
  }
`;

const ConfirmButton = styled.div`
  display: flex;
	width: 300px;
	height: 45px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const LoginButton = styled.div`
  display: flex;
	width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const LoginMiddle = () => {
  return (
        <Container>
          <InputNumber placeholder={"이름을 입력해주세요. (영문, 한글 2글자 이상)"}></InputNumber>
          <ConfirmButton>
          </ConfirmButton>
          <LoginButton>
            <Button
              btnBgColor={color.gray.light}
              btnWidth="300px"
              btnText="로그인"
              btnTextColor={color.white.default}
              btnHeight="40px"
              btnFontWeight={700}
              btnBorderColor="transparent"
              btnHoverBorderColor="transparent"
              btnHoverBgColor={color.gray.semidark}
              btnHoverTextColor={color.white.default}
              >
            </Button>
          </LoginButton>
        </Container>
  );
};

export default LoginMiddle;
