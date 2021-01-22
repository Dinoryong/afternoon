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
  flex-direction: column;
  width: 300px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  margin: 8px 0px;
`;

const InputEmail = styled.input`
  display: flex;
  width: 300px;
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
  margin-bottom: 20px;
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
  /* margin-top: 4px; */
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
  margin-top: 16px;
  margin-bottom: 1px;
`;

const LoginMiddle = () => {
  return (
    <Container>
      <InputBox>
        <InputEmail
          placeholder={"이메일을 입력해주세요 (example@site.com)"}
        ></InputEmail>
        <Text>로그인 요청하기 버튼을 누르시면</Text>
        <Text>이메일로 인증번호가 발송됩니다</Text>
        <LoginButton>
          <Button
            btnBgColor={color.gray.light}
            btnWidth="300px"
            btnText="로그인 요청하기"
            btnTextColor={color.white.default}
            btnHeight="40px"
            btnFontWeight={700}
            btnBorderColor="transparent"
            btnHoverBorderColor="transparent"
            btnHoverBgColor={color.gray.semidark}
            btnHoverTextColor={color.white.default}
          />
        </LoginButton>
      </InputBox>
    </Container>
  );
};

export default LoginMiddle;
