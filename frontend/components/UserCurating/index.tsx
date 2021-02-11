import React, { useState } from "react";
import styled from "@emotion/styled";
import TopLeft from "../UserCurating/TopLeft";
import TopRight from "../UserCurating/TopRight";
import FollowList from "../FollowList";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 930px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 640px;
  margin-right: auto;
  margin-left: 10px;
`;
const useStore = () => {
  const followShown = useSelector(
    (state: RootStateOrAny) => state.user.followShown
  );

  const dispatch = useDispatch();

  const toggleFollow = async () => {
    dispatch({ type: "TOGGLE_FOLLOW" });
  };

  return {
    toggleFollow,
    followShown,
  };
};
const index = ({ searchData }) => {
  const {
    accountPhoto,
    accountId,
    accountNickname,
    accountBio,
    following,
    follower,
    accountFollowingCnt,
    accountFollowerCnt,
    writtenPostsCnt,
    tags,
    followState,
  } = searchData;
  const { toggleFollow, followShown } = useStore();

  const [userListState, setUserListState] = useState(0);

  return (
    <>
      {followShown && userListState !== 0 && (
        <FollowList
          toggleFollow={toggleFollow}
          userListState={userListState}
          userList={userListState === 1 ? following : follower}
        ></FollowList>
      )}
      <Container>
        <TopLeft accountPhoto={accountPhoto}></TopLeft>
        <Wrapper>
          <TopRight
            accountId={accountId}
            accountNickname={accountNickname}
            accountBio={accountBio}
            followingCnt={accountFollowingCnt}
            followerCnt={accountFollowerCnt}
            postsCnt={writtenPostsCnt}
            tagList={tags}
            followState={followState}
            setUserListState={setUserListState}
            toggleFollow={toggleFollow}
          ></TopRight>
        </Wrapper>
      </Container>
    </>
  );
};

export default index;
