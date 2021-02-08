import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

const Container = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  position: absolute;
  z-index: 3;
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
`;

const EditBox = styled.div`
  display: flex;
  width: 300px;
  /* height: 30px; */
  /* margin-left: 14px;
  margin-top: 16px; */
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
  /* justify-content: center; */
  font-weight: bold;
  width: 100px;
  height: 20px;
  position: absolute;
  top: 22px;
  left: 22px;
  /* margin-top: 5px; */
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
    /* font-size: 12px; */
  }
  /* font-size: 12px; */
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
  /* height: 90px; */
  margin: 5px 0px;
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
    padding: 6px 10px;
  ::placeholder {
    /* font-size: 12px; */
  }
  /* font-size: 12px; */
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

const useCounter = () => {
  const dispatch = useDispatch();
  const toggle = async () => {
    await dispatch({ type: "TOGGLE" });
  };
  return { toggle };
};

const EditModal = ({setEditState}) => {
  const { toggle } = useCounter();

  return (
    <Container>
      <EditBox>
        <EditTitle>프로필 수정</EditTitle>
        <Xbutton onClick={()=>{setEditState(false)}}>
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
          src="/assets/images/sample_profile.png"
          layout="fill"
          objectFit="cover"
        ></Image>
      </ImgBox>
      <NameTitle>이름</NameTitle>
      <InputName></InputName>
      <NicknameTitle>닉네임</NicknameTitle>
      <InputNickname></InputNickname>
      <BioTitle>소개글</BioTitle>
      <InputBio rows={5} value="가지에 풀밭에 심장의 인간의 더운지라 있을 되려니와, 것이다. 있으며, 황금시대를 불어 바이며, 관현악이며, 뿐이다. 낙원을 보내는 생생하며, 봄날의 때에, 돋고, 위하여 구하지 힘차게 힘있다. 것이 소담스러운 투명하되 않는 철환하였는가? 실로 바이며, 인생의 속잎나고, 이 꽃이 우리 있으랴? 우리는 낙원을 용감하고 것은 꽃이 못할 평화스러운 몸이 너의 것이다. 뜨거운지라, 우리 바이며, 인간에 끓는 황금시대를 예수는 얼마나 것이다. 싶이 얼음 것이 인간의 이것이다. 얼마나 넣는 목숨을 산야에 꾸며 보이는 없으면, 불어 품고 부패뿐이다. 우리 피가 이상, 소담스러운 스며들어 오직 생의 길을 약동하다. 것이다.보라, 위하여서 인간에 우리 열매를 것이 만물은 바로 그리하였는가?"></InputBio>
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
          // btnOnClick={requestSignup}
        />
      </EditButton>
    </Container>
  );
};

export default EditModal;
