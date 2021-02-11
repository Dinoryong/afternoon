import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  position: absolute;
  z-index: 10;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.92);
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 35px;
  padding-right: 35px;
  border-radius: 10px;
  font-size: 15px;
  top: 122px;
`;

const EditBox = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;

const Xbutton = styled.div`
  width: 17px;
  height: 17px;
  background-color: "transparent";
  position: absolute;
  top: 22px;
  right: 22px;
  cursor: pointer;
`;

const EditTitle = styled.div`
  display: flex;
  font-weight: bold;
  width: 100px;
  height: 20px;
  position: absolute;
  top: 22px;
  left: 22px;
`;

const ImgBox = styled.div`
  display: flex;
  position: relative;
  width: 140px;
  height: 140px;
  margin: 30px 0px 10px 0px;
`;

const NameTitle = styled.div`
  display: flex;
  width: 300px;
  height: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const InputName = styled.input`
  display: flex;
  width: 300px;
  height: 40px;
  margin: 5px 0px;
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  ::placeholder {
    font-size: 15px;
  }
  :focus {
    outline: none;
  }
`;

const NicknameTitle = styled.div`
  display: flex;
  width: 300px;
  height: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
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
  padding: 2px 10px;
  ::placeholder {
  }
  :focus {
    outline: none;
  }
`;

const BioTitle = styled.div`
  display: flex;
  width: 300px;
  height: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const InputBio = styled.textarea`
  display: flex;
  width: 300px;
  margin: 5px 0px;
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  ::placeholder {
  }
  :focus {
    outline: none;
  }
  margin-bottom: 10px;
`;

const EditButton = styled.div`
  display: flex;
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const index = ({
  toggleEdit,
  accountPhoto = "/assets/logos/pinset_logo_black.png",
  accountName,
  accountNickname,
  accountBio,
}) => {
  const [nameInput, setNameInput] = useState(accountName);
  const [nicknameInput, setNicknameInput] = useState(accountNickname);
  const [bioInput, setBioInput] = useState(accountBio);

  if (accountPhoto === "") accountPhoto = "/assets/logos/pinset_logo_black.png";

  return (
    <Container>
      <EditBox>
        <EditTitle>프로필 수정</EditTitle>
        <Xbutton onClick={toggleEdit}>
          <Image
            src="/assets/icons/x_mark.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </Xbutton>
      </EditBox>
      <ImgBox>
        <Image
          className="next_border_image circle"
          src={accountPhoto}
          layout="fill"
          objectFit="cover"
        ></Image>
      </ImgBox>
      <NameTitle>이름</NameTitle>
      <InputName
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      ></InputName>
      <NicknameTitle>닉네임</NicknameTitle>
      <InputNickname
        value={nicknameInput}
        onChange={(e) => setNicknameInput(e.target.value)}
      ></InputNickname>
      <BioTitle>소개글</BioTitle>
      <InputBio
        rows={5}
        value={bioInput}
        onChange={(e) => setBioInput(e.target.value)}
      ></InputBio>
      <EditButton>
        <Button
          btnBgColor={color.green.default}
          btnWidth="300px"
          btnText="프로필 업데이트"
          btnTextColor={color.white.default}
          btnHeight="40px"
          btnFontWeight={700}
          btnBorderColor="transparent"
          btnHoverBorderColor="transparent"
          btnHoverBgColor={color.red.dark}
          btnHoverTextColor={color.white.default}
        />
      </EditButton>
    </Container>
  );
};

export default index;
