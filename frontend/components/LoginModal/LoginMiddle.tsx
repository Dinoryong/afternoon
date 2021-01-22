import React from "react";
import Button from "../Button";
import styled from "@emotion/styled";
import color from "../../styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
`;

const InputBox = styled.div`
  display: flex;
  width: 300px;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  margin: 8px 0px;
`;

const InputNumber = styled.input`
  display: flex;
  width: 200px;
  height: 40px;
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  ::placeholder {
    font-size: 12px;
  }
  font-size: 12px;
  :focus {
    outline: none;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  display: flex;
  width: 300px;
  margin-top: 4px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  color: ${color.black.default};
`;

const LoginButton = styled.div`
  display: flex;
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const LoginMiddle = () => {
  return (
    <Container>
      <InputBox>
        <InputNumber placeholder={"인증번호를 입력해주세요"}></InputNumber>
        <ButtonBox>
          <Button
            btnBgColor={color.red.light}
            btnWidth="100px"
            btnText="인증번호 확인"
            btnTextColor={color.white.default}
            btnHeight="42px"
            btnFontWeight={700}
            btnBorderColor="transparent"
            btnHoverBorderColor="transparent"
            btnHoverBgColor={color.red.dark}
            btnHoverTextColor={color.white.default}
          />
        </ButtonBox>
      </InputBox>
      <InputBox>
        <ButtonBox>
          <Button
            btnBgColor="transparent"
            btnWidth="100px"
            btnText="메일함으로 이동"
            btnTextColor={color.gray.dark}
            btnHeight="42px"
            btnFontSize="10"
            btnFontWeight={300}
            btnBorderColor="transparent"
            btnHoverBorderColor="transparent"
            btnHoverBgColor="transparent"
            btnHoverTextColor={color.black.default}
          />
        </ButtonBox>
        <ButtonBox>
          <Button
            btnBgColor="transparent"
            btnWidth="100px"
            btnText="인증번호 재발송"
            btnTextColor={color.gray.dark}
            btnHeight="42px"
            btnFontSize="10"
            btnFontWeight={300}
            btnBorderColor="transparent"
            btnHoverBorderColor="transparent"
            btnHoverBgColor="transparent"
            btnHoverTextColor={color.black.default}
          />
        </ButtonBox>
      </InputBox>
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
        />
      </LoginButton>
    </Container>
  );
};

export default LoginMiddle;
