import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import Image from "next/image";
import TopLeft from "../../components/ProfileTop/TopLeft";
import TopRight from "../../components/ProfileTop/TopRight";
import MenuBar from "../../components/ProfileTop/MenuBar";

const Container1 = styled.div`
  display: flex;
  width: 100%;
  max-width: 930px;
  /* height: 430px; */
  margin-top: 152px;
  margin-bottom: 10px;
`;

const Container2 = styled.div`
  display: flex;
  width: 1280px;
  /* height: 72px; */
  border-bottom: solid ${color.gray.default} 2px;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  /* height: 350px; */
  margin-right: auto;
  margin-left: 10px;
`;

const index = ({ profileData }) => {
  const {
    profileImg,
    profileName,
    profileBox,
    profileFollowing,
    profileFollwer,
    profileMyposts,
    profileLikes,
    profileTags,
    profileCollections,
  } = profileData;
  return (
    <>
      <Container1>
        <TopLeft profileImg={profileImg}></TopLeft>
        <Wrapper2>
          <TopRight
            profileName={profileName}
            profileBox={profileBox}
            profileFollowing={profileFollowing}
            profileFollower={profileFollwer}
            profileMyposts={profileMyposts}
            profileTags={profileTags}
          ></TopRight>
        </Wrapper2>
      </Container1>
      <Container2>
        <MenuBar
          profileMyposts={profileMyposts}
          profileLikes={profileLikes}
          profileCollections={profileCollections}
        ></MenuBar>
      </Container2>
    </>
  );
};

export default index;