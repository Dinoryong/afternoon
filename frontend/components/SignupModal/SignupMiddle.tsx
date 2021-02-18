import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import color from "../../styles/theme";
import Button from "../Button";
import { SIGN_UP } from "../../pages/api/user";
import Swal from "sweetalert2";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
`;

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

const pattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

const SignupMiddle = () => {
  const router = useRouter();

  const [inputName, setInputName] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [signupValid, setSignupValid] = useState(false);

  useEffect(() => {
    setSignupValid(
      pattern.test(inputEmail) &&
        inputNickName.length > 1 &&
        inputName.length > 1
    );
  }, [inputEmail, inputNickName, inputName]);

  const requestSignup = async () => {
    const signupReq = {
      accountName: inputName,
      accountEmail: inputEmail,
      accountNickname: inputNickName,
    };

    const result = await SIGN_UP(signupReq);
    console.log(result);

    if (result.status === 201) {
      window.localStorage.setItem("accountEmail", result.data.accountEmail);
      Swal.fire({ icon: "success", text: "회원가입에 성공했습니다" });
      router.push("/");
    } else {
      Swal.fire({ icon: "error", text: "회원가입에 실패했습니다" });
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
      />
      <InputNickname
        placeholder={"닉네임을 입력해주세요. (영문, 한글 2글자 이상)"}
        value={inputNickName}
        onChange={(e) => {
          setInputNickName(e.target.value);
        }}
      />
      <InputEmail
        placeholder={"이메일을 입력해주세요. (example@site.com)"}
        value={inputEmail}
        onChange={(e) => {
          setInputEmail(e.target.value);
        }}
      />
      <SignupButton>
        <Button
          btnBgColor={!signupValid ? color.gray.semidark : color.red.default}
          btnWidth="300px"
          btnText="회원가입"
          btnTextColor={color.white.default}
          btnHeight="40px"
          btnFontWeight={700}
          btnBorderColor="transparent"
          btnHoverBorderColor="transparent"
          btnHoverBgColor={!signupValid ? color.gray.semidark : color.red.dark}
          btnHoverTextColor={color.white.default}
          btnOnClick={!signupValid ? () => {} : requestSignup}
        />
      </SignupButton>
    </Container>
  );
};

export default SignupMiddle;
