import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import ProfileTagBox from "../../components/ProfileTagBox";

const TitleBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  align-items: center;
`;

const UserTitle = styled.div`
  font-size: 45px;
  font-weight: bold;
`;

const EditBox = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  margin-left: 14px;
  margin-top: 16px;
`;

const FollowBox = styled.div`
  width: 50%;
  display: flex;
  margin-top: 15px;
  margin-bottom: 35px;
  justify-content: space-between;
`;

const UserFollowing = styled.div`
  font-size: 15px;
  font-weight: 100px;
  color: ${color.black.default};
  cursor: pointer;
  padding: 4px;
`;

const UserFollower = styled.div`
  font-size: 15px;
  font-weight: 100px;
  color: ${color.black.default};
  cursor: pointer;
  padding: 4px;
`;

const UserPost = styled.div`
  font-size: 15px;
  font-weight: 100px;
  color: ${color.black.default};
  padding: 4px;
`;

const TextBox = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const UserText = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 100px;
  margin-left: 6px;
`;

const TagDiv = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
`;

const TopRight = ({
  accountNickname,
  accountBio,
  followingCnt,
  followerCnt,
  postsCnt,
  tagList,
  toggleEdit,
  setUserListState,
  toggleFollow,
}) => {
  return (
    <>
      <TitleBox>
        <UserTitle>{accountNickname}</UserTitle>
        <EditBox>
          <Button
            btnBgColor="transparent"
            btnWidth="120px"
            btnHeight="32px"
            btnText="프로필 수정"
            btnFontSize="15px"
            btnTextColor={color.black.default}
            btnBorderColor={color.black.default}
            btnHoverBgColor="transparent"
            btnUseIcon={true}
            btnIconSrc={"/assets/icons/edit.png"}
            btnIconHeight={"15px"}
            btnIconWidth={"15px"}
            btnIconMargin={"2px 0px 0px 12px"}
            btnUseOpacity={true}
            btnSetOpacity={"0.4"}
            btnOnClick={toggleEdit}
          />
        </EditBox>
      </TitleBox>
      <FollowBox>
        <UserFollowing
          onClick={() => {
            setUserListState(1);
            toggleFollow();
          }}
        >
          팔로잉 {followingCnt}
        </UserFollowing>
        <UserFollower
          onClick={() => {
            setUserListState(2);
            toggleFollow();
          }}
        >
          팔로워 {followerCnt}
        </UserFollower>
        <UserPost>게시물 {postsCnt}</UserPost>
      </FollowBox>
      <TextBox>
        <UserText>{accountBio}</UserText>
      </TextBox>
      <TagDiv>
        {tagList &&
          tagList.length > 0 &&
          tagList.map((t, index) => {
            return (
              <ProfileTagBox
                key={index}
                tagId={t.tagId}
                tagMargin="0px 8px 8px 0px"
                tagUseDelete={false}
              />
            );
          })}
      </TagDiv>
    </>
  );
};

export default TopRight;
