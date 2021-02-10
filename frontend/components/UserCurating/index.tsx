import React from "react";
import styled from "@emotion/styled";
import TopLeft from "../UserCurating/TopLeft";
import TopRight from "../UserCurating/TopRight";

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

  return (
    <Container>
      <TopLeft accountPhoto={accountPhoto}></TopLeft>
      <Wrapper>
        <TopRight
          accountId={accountId}
          accountNickname={accountNickname}
          accountBio={accountBio}
          followingList={following}
          followerList={follower}
          followingCnt={accountFollowingCnt}
          followerCnt={accountFollowerCnt}
          postsCnt={writtenPostsCnt}
          tagList={tags}
          followState={followState}
        ></TopRight>
      </Wrapper>
    </Container>
  );
};

export default index;
