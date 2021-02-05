import React, { useState } from "react";
import Button from "../Button";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import { SIGN_UP } from "../../pages/api/user";
import { useRouter } from "next/router";

// 가장 바깥 구획 나누기
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
`;

// 내부 컨텐츠 시작
const InputName = styled.input`
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
`;

const InputNickname = styled.input`
  display: flex;
  width: 300px;
  height: 40px;
  margin: 5px 0px;
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
  margin-bottom: 10px;
`;

const SignupButton = styled.div`
  display: flex;
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const SignupMiddle = () => {
  const router = useRouter();

  const [inputName, setInputName] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const requestSignup = async () => {
    const signupProps = {
      accountName: inputName,
      accountEmail: inputEmail,
      accountNickname: inputNickName,
    };

    const result = await SIGN_UP(signupProps);

    if (result.status === 201) {
      window.localStorage.setItem("accountEmail", result.data.accountEmail);
      alert("회원가입에 성공했습니다.");
      router.push("/");
    } else {
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <Container>
      <InputName
        placeholder={"이름을 입력해주세요. (영문, 한글 2글자 이상)"}
        value={inputName}
        onChange={(e) => {
          setInputName(e.target.value);
        }}
      ></InputName>
      <InputNickname
        placeholder={"닉네임을 입력해주세요. (영문, 한글 2글자 이상)"}
        value={inputNickName}
        onChange={(e) => {
          setInputNickName(e.target.value);
        }}
      ></InputNickname>
      <InputEmail
        placeholder={"이메일을 입력해주세요. (example@site.com)"}
        value={inputEmail}
        onChange={(e) => {
          setInputEmail(e.target.value);
        }}
      ></InputEmail>
      <SignupButton>
        <Button
          btnBgColor={color.red.default}
          btnWidth="300px"
          btnText="회원가입"
          btnTextColor={color.white.default}
          btnHeight="40px"
          btnFontWeight={700}
          btnBorderColor="transparent"
          btnHoverBorderColor="transparent"
          btnHoverBgColor={color.red.dark}
          btnHoverTextColor={color.white.default}
          btnOnClick={requestSignup}
        />
      </SignupButton>
    </Container>
  );
};

export default SignupMiddle;
