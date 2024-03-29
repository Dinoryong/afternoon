import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Button from "../Button";
import { EMAIL_LOGIN } from "../../pages/api/user";
import Swal from "sweetalert2";

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

const LoginMiddle = ({ toggle, setAuthState, setCurrentEmail }) => {
  let autoEmail = "";
  if (window.localStorage.getItem("accountEmail") !== null)
    autoEmail = window.localStorage.getItem("accountEmail");

  const [emailValid, setEmailValid] = useState(false);
  const [inputEmail, setInputEmail] = useState(
    autoEmail !== undefined ? autoEmail : ""
  );

  useEffect(() => {
    setEmailValid(pattern.test(inputEmail));
  }, [inputEmail]);

  const requestEmailLogin = async () => {
    Swal.fire({
      icon: "success",
      title: "인증번호 발송 완료",
      text: `서비스 상황에 따라 3~10초 정도 소요됩니다`,
    });
    setCurrentEmail(inputEmail);
    setAuthState(1);
    if (pattern.test(inputEmail)) {
      const emailLoginReq = {
        act: "login-request",
        accountEmail: inputEmail,
      };

      const result = await EMAIL_LOGIN(emailLoginReq);
      //replace_console_log(result);

      if (result.status === 200) {
      } else {
        toggle();
        Swal.fire({ icon: "error", text: "로그인 요청에 실패했습니다" });
      }
    } else {
      Swal.fire({ icon: "info", text: "이메일 형식으로 입력해주세요" });
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
        />
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
            btnOnClick={!emailValid ? () => {} : requestEmailLogin}
          />
        </LoginButton>
      </InputBox>
    </Container>
  );
};

export default LoginMiddle;
