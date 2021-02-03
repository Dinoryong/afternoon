import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import Image from "next/image";

const TitleBox = styled.div`
  display: flex;
  width: 100%;
  /* height: 60px; */
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileTitle = styled.div`
  font-size: 45px;
  font-weight: bold;
`;

const EditBox = styled.div`
  width: 30px;
  /* height: 30px; */
  position: absolute;
`;

const TextBox = styled.div`
  width: 100%;
  /* height: 50px; */
  margin-bottom: 30px;
`;

const ProfileText = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: 100px;
`;

const FollowBox = styled.div`
  width: 100%;
  /* height: 90px; */
  display: flex;
  margin-bottom: 30px;
`;

const ProfileFollower = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: 100px;
  color: ${color.gray.dark};
  margin-bottom: 4px;
`;

const ProfileFollowing = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: 100px;
  color: ${color.gray.dark};
  margin-bottom: 4px;
`;

const ProfilePost = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: 100px;
  color: ${color.gray.dark};
  margin-bottom: 4px;
`;

const TagBox = styled.div`
  width: 100%;
  margin-bottom: 100px;
`;

const TagTitle = styled.div`
  width: 100%;
  /* height: 40px; */
  font-size: 17px;
  font-weight: "600";
  margin-bottom: 10px;
`;

const TagList = styled.div`
  display: flex;
  width: 100%;
  /* height: 40px; */
  margin: 3px 0px;
`;

const TopRight = ({
  profileName,
  profileBox,
  profileFollowing,
  profileFollower,
  profileMyposts,
  profileTags,
}) => {
  return (
    <>
      <TitleBox>
        <ProfileTitle>{ profileName }</ProfileTitle>
        <EditBox>
          {/* <Image
            src="/assets/icons/edit_white.png"
            layout="fill"
            objectFit="cover"
          ></Image> */}
        </EditBox>
      </TitleBox>
      <TextBox>
        <ProfileText>
          { profileBox }
        </ProfileText>
      </TextBox>
      <FollowBox>
        <ProfileFollowing>팔로잉  { profileFollowing }</ProfileFollowing>
        <ProfileFollower>팔로워  { profileFollower }</ProfileFollower>
        <ProfilePost>게시물  { profileMyposts }</ProfilePost>
      </FollowBox>
      <TagBox>
        <TagTitle>관심태그</TagTitle>
        <TagList>
          { profileTags }
          <Button
            btnText="클라이밍"
            btnWidth="100px"
            btnMarginRight="5px"
            btnBgColor="${color.gray.light}"
            btnTextColor="${color.gray.semidark}"
            btnFontSize="20px"
            btnFontWeight={500}
            btnHoverTextColor="${color.gray.dark}"
          />
          <Button
            btnText="엔지니어"
            btnWidth="100px"
            btnMarginRight="5px"
            btnBgColor="${color.gray.light}"
            btnTextColor="${color.gray.semidark}"
            btnFontSize="20px"
            btnFontWeight={500}
            btnHoverTextColor="${color.gray.dark}"
          />
        </TagList>
      </TagBox>
    </>
  );
};

export default TopRight;
