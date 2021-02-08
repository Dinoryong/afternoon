import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import TopLeft from "../../components/ProfileTop/TopLeft";
import TopRight from "../../components/ProfileTop/TopRight";
import MenuBar from "../../components/ProfileTop/MenuBar";

const Container1 = styled.div`
  display: flex;
  width: 100%;
  max-width: 930px;
  margin-bottom: 10px;
`;

const Container2 = styled.div`
  display: flex;
  width: 1280px;
  border-bottom: solid ${color.gray.default} 2px;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 640px;
  margin-right: auto;
  margin-left: 10px;
`;

const index = ({
  profileData,
  setEditState,
  followingData,
  setFollowingState,
  // setFollowerState,
  windowHeight,
  setTabState,
  tabState,
}) => {
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

  const {
    followingImg,
    followingName,
    followingNickname,
    followingPosts,
  } = followingData;

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
            setEditState={setEditState}
            followingImg={followingImg}
            followingName={followingName}
            followingNickname={followingNickname}
            followingPosts={followingPosts}
            setFollowingState={setFollowingState}
            // setFollowerState={setFollowerState}
            windowHeight={windowHeight}
          ></TopRight>
        </Wrapper2>
      </Container1>
      <Container2>
        <MenuBar
          profileMyposts={profileMyposts}
          profileLikes={profileLikes}
          profileCollections={profileCollections}
          setTabState={setTabState}
          tabState={tabState}
        ></MenuBar>
      </Container2>
    </>
  );
};

export default index;
