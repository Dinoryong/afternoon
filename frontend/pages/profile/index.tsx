import React from "react";
import styled from "@emotion/styled";
import ProfileTop from "../../components/ProfileTop";
import Button from "../../components/Button";
import color from "../../styles/theme";
import Image from "next/image";

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
	justify-content: center;
  width: 100%;
  /* height: 800px; */
`;

const Container2 = styled.div`
  display: flex;
  width: 100%;
  height: 800px;
`;

const index = () => {
  const profileData = {
    profileImg:
      "https://images.unsplash.com/photo-1611759931890-db159d745102?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80",
    profileName: "Alex",
    profileBox:
      "보이는 가치를 사랑의 끓는다. 굳세게 산야에  품었기 이상의 속잎나고, 그리하였는가? 타오르고 못하다 가치를 귀는 없는 속에서 따뜻한 보이는 내는 쓸쓸하랴? 인간은 가슴에 새 그들에게 자신과 대한 길지 것이다. 날카로우나 얼마나 용감하고 별과 가는 따뜻한용기가 품었기 이상의 속잎나고, 그리하였는가? 타오르고 못하다 가치를 귀는 없는 속에서 따뜻한 보이는 내는 쓸쓸하랴? 인간은 가슴에 새 그들에게 자신과 대한 길지 것이다. 날카로우나 얼마나 용감하고 별과 가는 따뜻한 우리 말이다. 우리의 우리 발.",
    profileFollowing: "159",
    profileFollwer: "143534",
		profileMyposts: "376",
		profileLikes: "100",
		profileTags: "",
		profileCollections: "13",
  };

  return (
    <>
      <Container1>
        <ProfileTop profileData={profileData}></ProfileTop>
      </Container1>
      <Container2>{/* <ProfileBottom></ProfileBottom> */}</Container2>
    </>
  );
};

export default index;
