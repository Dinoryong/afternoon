import React, { useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import TopLeft from "../../components/ProfileTop/TopLeft";
import TopRight from "../../components/ProfileTop/TopRight";
import MenuBar from "../../components/ProfileTop/MenuBar";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ProfileEdit from "../ProfileEdit";
import FollowList from "../FollowList";

const Container1 = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    max-width: 90%;
  }
  @media only screen and (min-width: 768px) {
    max-width: 740px;
  }
  @media only screen and (min-width: 1280px) {
    max-width: 930px;
  }
`;

const Container2 = styled.div`
  display: flex;
  border-bottom: solid ${color.gray.default} 2px;
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
  @media only screen and (min-width: 768px) {
    width: 95%;
  }
  @media only screen and (min-width: 1280px) {
    width: 1280px;
  }
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 640px;
  margin-right: auto;
  margin-left: 10px;
  @media only screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

const useStore = () => {
  const editShown = useSelector(
    (state: RootStateOrAny) => state.user.editShown
  );
  const followShown = useSelector(
    (state: RootStateOrAny) => state.user.followShown
  );

  const dispatch = useDispatch();

  const toggleEdit = async () => {
    dispatch({ type: "TOGGLE_EDIT" });
  };
  const toggleFollow = async () => {
    dispatch({ type: "TOGGLE_FOLLOW" });
  };

  return {
    toggleEdit,
    toggleFollow,
    editShown,
    followShown,
  };
};

const index = ({ profileData, setTabState, tabState }) => {
  const { toggleEdit, toggleFollow, editShown, followShown } = useStore();

  const [userListState, setUserListState] = useState(0);

  const {
    accountPhoto,
    accountName,
    accountNickname,
    accountBio,
    following,
    follower,
    accountFollowingCnt,
    accountFollowerCnt,
    writtenPostsCnt,
    likePostsCnt,
    tags,
    likesPostsCnt,
  } = profileData;

  return (
    <>
      {editShown && (
        <ProfileEdit
          toggleEdit={toggleEdit}
          accountPhoto={accountPhoto}
          accountName={accountName}
          accountNickname={accountNickname}
          accountBio={accountBio}
        ></ProfileEdit>
      )}
      {followShown && userListState !== 0 && (
        <FollowList
          toggleFollow={toggleFollow}
          userListState={userListState}
          userList={userListState === 1 ? following : follower}
        ></FollowList>
      )}
      <Container1>
        <TopLeft accountPhoto={accountPhoto}></TopLeft>
        <Wrapper2>
          <TopRight
            accountNickname={accountNickname}
            accountBio={accountBio}
            followingCnt={accountFollowingCnt}
            followerCnt={accountFollowerCnt}
            postsCnt={writtenPostsCnt}
            tagList={tags}
            toggleEdit={toggleEdit}
            toggleFollow={toggleFollow}
            setUserListState={setUserListState}
          ></TopRight>
        </Wrapper2>
      </Container1>
      <Container2>
        <MenuBar
          writtenPostsCnt={writtenPostsCnt}
          likesPostsCnt={likesPostsCnt}
          setTabState={setTabState}
          tabState={tabState}
        ></MenuBar>
      </Container2>
    </>
  );
};

export default index;
