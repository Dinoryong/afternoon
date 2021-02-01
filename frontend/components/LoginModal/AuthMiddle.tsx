import React, { useState } from "react";
import Button from "../Button";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import { CHECK_EMAIL, CONFIRM_LOGIN } from "../../pages/api/user";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

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

const ConfirmButton = styled.div`
  display: flex;
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
`;

const SendingBox = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  width: 300px;
  color: ${color.black.default};
  font-size: 12px;
  font-weight: 400;
  margin: 20px 0px;
`;

const SendingText = styled.div`
  display: flex;
  width: 150px;
  justify-content: center;
`;

const LoginButton = styled.div`
  display: flex;
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const useCounter = () => {
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
  return { toggle, autoLoginCheck, loginStateTrue };
};

const AuthMiddle = ({ currentEmail }) => {
  const [authKey, setAuthKey] = useState("");

  const router = useRouter();

  const { toggle, autoLoginCheck, loginStateTrue } = useCounter();

  const requestCheckEmail = async () => {
    const checkProps = {
      act: "check-authKey-off",
      accountEmail: currentEmail,
      accountAuthKey: authKey,
    };

    const result = await CHECK_EMAIL(checkProps);

    if (result.status === 200) {
      alert("이메일 인증 성공");
    } else {
      alert("이메일 인증 실패");
    }
  };

  const requestConfirmLogin = async () => {
    const checkProps = {
      act: "check-authKey-on",
      accountEmail: currentEmail,
      accountAuthKey: authKey,
    };

    const result = await CONFIRM_LOGIN(checkProps);
    console.log(result);

    if (result.status === 200) {
      alert("로그인 성공");

      const authToken = result.headers.authorization.slice(7);

      window.localStorage.setItem("accountEmail", result.data.accountEmail);
      window.localStorage.setItem("accountId", result.data.accountId);
      window.localStorage.setItem("authToken", authToken);
      loginStateTrue();
      toggle();
      router.push("/feed");
    } else {
      alert("로그인 실패 : " + result.status);
    }
  };

  return (
    <Container>
      <InputBox>
        <InputNumber
          placeholder={"인증번호를 입력해주세요"}
          value={authKey}
          onChange={(e) => {
            setAuthKey(e.target.value);
          }}
        ></InputNumber>
        <ConfirmButton>
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
            btnOnClick={requestCheckEmail}
          />
        </ConfirmButton>
      </InputBox>
      <SendingBox>
        <SendingText>메일함으로 이동</SendingText>
        <SendingText>인증번호 재발송</SendingText>
      </SendingBox>
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
          btnOnClick={requestConfirmLogin}
        />
      </LoginButton>
    </Container>
  );
};

export default AuthMiddle;
