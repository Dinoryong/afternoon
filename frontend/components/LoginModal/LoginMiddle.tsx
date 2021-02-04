import React, { useEffect, useState } from "react";
import Button from "../Button";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import { REQUEST_LOGIN } from "../../pages/api/user";

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

const pattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

const LoginMiddle = ({ setAuthState, setCurrentEmail }) => {
  const autoEmail = window.localStorage.getItem("accountEmail");
  const [inputEmail, setInputEmail] = useState(
    autoEmail !== undefined ? autoEmail : ""
  );
  const [emailValid, setEmailValid] = useState(false);

  useEffect(() => {
    setEmailValid(pattern.test(inputEmail));
  }, [inputEmail]);

  const requestLogin = async () => {
    if (pattern.test(inputEmail)) {
      const loginProps = {
        act: "login-request",
        accountEmail: inputEmail,
      };

      const result = await REQUEST_LOGIN(loginProps);

      if (result.status) {
        setAuthState(1);
        setCurrentEmail(inputEmail);
      } else {
        alert("로그인 요청 실패");
      }
    } else {
      alert("이메일 형식이 아닙니다.");
    }
  };

  return (
    <Container>
      <InputBox>
        <InputEmail
          placeholder={"이메일을 입력해주세요 (example@site.com)"}
          value={inputEmail}
          onChange={(e) => {
            setInputEmail(e.target.value);
          }}
        ></InputEmail>
        <Text>로그인 요청하기 버튼을 누르시면</Text>
        <Text>이메일로 인증번호가 발송됩니다</Text>
        <LoginButton>
          <Button
            btnBgColor={!emailValid ? color.gray.semidark : color.red.default}
            btnWidth="300px"
            btnText="로그인 요청하기"
            btnTextColor={color.white.default}
            btnHeight="40px"
            btnFontWeight={700}
            btnBorderColor="transparent"
            btnHoverBorderColor="transparent"
            btnHoverBgColor={!emailValid ? color.gray.semidark : color.red.dark}
            btnHoverTextColor={color.white.default}
            btnOnClick={!emailValid ? () => {} : requestLogin}
          />
        </LoginButton>
      </InputBox>
    </Container>
  );
};

export default LoginMiddle;
