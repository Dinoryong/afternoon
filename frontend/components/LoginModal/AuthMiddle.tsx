import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import color from "../../styles/theme";
import Button from "../Button";
import { CHECK_EMAIL, CONFIRM_LOGIN } from "../../pages/api/user";
import Swal from "sweetalert2";

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
  justify-content: space-between;
  width: 300px;
  color: ${color.black.default};
  font-size: 12px;
  font-weight: 400;
  margin: 20px 0px;
  cursor: pointer;
`;

const SendingText = styled.div`
  display: flex;
  width: 150px;
  justify-content: center;
  cursor: pointer;
`;

const LoginButton = styled.div`
  display: flex;
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const useStore = () => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };
  const loginStateTrue = () => {
    dispatch({ type: "LOGIN_STATE_TRUE" });
  };

  return { toggle, loginStateTrue };
};

const AuthMiddle = ({ currentEmail }) => {
  const router = useRouter();
  const { toggle, loginStateTrue } = useStore();

  const [authKey, setAuthKey] = useState("");
  const [checkState, setCheckState] = useState(false);

  const requestCheckEmail = async () => {
    const checkEmailReq = {
      act: "check-authKey-off",
      accountEmail: currentEmail,
      accountAuthKey: authKey,
    };

    const result = await CHECK_EMAIL(checkEmailReq);
    console.log(result);

    if (result.status === 200) {
      setCheckState(true);
      Swal.fire({ icon: "success", text: "이메일 인증 성공" });
    } else {
      Swal.fire({ icon: "error", text: "이메일 인증 실패" });
    }
  };

  const requestConfirmLogin = async () => {
    const confirmLoginReq = {
      act: "check-authKey-on",
      accountEmail: currentEmail,
      accountAuthKey: authKey,
    };

    const result = await CONFIRM_LOGIN(confirmLoginReq);
    console.log(result);

    if (result.status === 200) {
      window.localStorage.setItem("accountEmail", result.data.accountEmail);
      window.localStorage.setItem(
        "accountId",
        result.data.accountId.toString()
      );
      window.localStorage.setItem(
        "accountNickname",
        result.data.accountNickname
      );
      window.localStorage.setItem(
        "authToken",
        result.headers.authorization.slice(7)
      );
      loginStateTrue();
      toggle();
      Swal.fire({ icon: "success", text: "로그인 성공" });
      router.push("/feed");
    } else {
      Swal.fire({ icon: "success", text: "로그인 실패" });
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
        />
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
          btnBgColor={checkState ? color.red.light : color.gray.light}
          btnWidth="300px"
          btnText="로그인"
          btnTextColor={color.white.default}
          btnHeight="40px"
          btnFontWeight={700}
          btnBorderColor="transparent"
          btnHoverBorderColor="transparent"
          btnHoverBgColor={checkState ? color.red.dark : color.gray.light}
          btnHoverTextColor={color.white.default}
          btnOnClick={requestConfirmLogin}
        />
      </LoginButton>
    </Container>
  );
};

export default AuthMiddle;
