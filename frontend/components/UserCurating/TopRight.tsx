import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import ProfileTagBox from "../ProfileTagBox";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../pages/api/profile";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

const TitleBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  align-items: center;
  font-size: 45px;
  @media only screen and (max-width: 768px) {
    font-size: 35px;
    margin-top: 0px;
    padding-top: 18px;
    margin-left: 80px;
    width: fit-content;
  }
`;

const UserTitle = styled.div`
  font-weight: bold;
`;

const EditBox = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  margin-left: 14px;
  margin-top: 16px;
  @media only screen and (max-width: 768px) {
    position: absolute;
    width: fit-content;
    right: 15px;
    top: 72px;
  }
`;

const FollowBox = styled.div`
  width: 50%;
  display: flex;
  margin-top: 15px;
  margin-bottom: 35px;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    margin-top: 20px;
    width: 60%;
    max-width: 285px;
    margin-bottom: 20px;
  }
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
  @media only screen and (max-width: 768px) {
    margin-bottom: 25px;
  }
`;

const UserText = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 100px;
  margin-left: 6px;
  @media only screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

const TagDiv = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

const useStore = () => {
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };

  return {
    loginState,
    toggle,
  };
};

const TopRight = ({
  accountId,
  accountNickname,
  accountBio,
  followingCnt,
  followerCnt,
  postsCnt,
  tagList,
  followState,
  setUserListState,
  toggleFollow,
}) => {
  const { loginState, toggle } = useStore();

  const [followBtnState, setFollowBtnState] = useState(followState);

  const addFollowOnClick = async () => {
    const followReq = { yourId: accountId };
    const followUserConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    };
    setFollowBtnState(true);
    const result = await FOLLOW_USER(followReq, followUserConfig);
    //replace_console_log(result);
  };

  const deleteFollowOnClick = async () => {
    const unfollowReq = accountId;
    const unfollowUserConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    };
    setFollowBtnState(false);
    const result = await UNFOLLOW_USER(unfollowReq, unfollowUserConfig);
    //replace_console_log(result);
  };

  return (
    <>
      <TitleBox>
        <UserTitle>{accountNickname}</UserTitle>
        <EditBox>
          <Button
            btnBgColor="transparent"
            btnWidth="125px"
            btnHeight="32px"
            btnText={followBtnState ? "팔로우 해제" : "팔로우 하기"}
            btnFontSize="15px"
            btnTextColor={color.black.default}
            btnBorderColor={color.black.default}
            btnHoverBgColor="transparent"
            btnUseIcon={true}
            btnIconSrc={
              followBtnState
                ? "/assets/icons/follow_check.png"
                : "/assets/icons/follow_plus.png"
            }
            btnIconHeight={"15px"}
            btnIconWidth={"15px"}
            btnIconMargin={"2px 0px 0px 12px"}
            btnUseOpacity={true}
            btnSetOpacity={"0.4"}
            btnOnClick={
              !loginState
                ? toggle
                : followBtnState
                ? deleteFollowOnClick
                : addFollowOnClick
            }
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
              />
            );
          })}
      </TagDiv>
    </>
  );
};

export default TopRight;
