import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import Image from "next/image";

const TitleBox = styled.div`
  display: flex;
  width: 700px;
  height: 60px;
  align-items: center;
`;

const ProfileTitle = styled.div`
  font-size: 45px;
  font-weight: bold;
`;

const EditBox = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
`;

// const EditButton = styled.div`

// `;

const TextBox = styled.div`
  width: 700px;
  height: 50px;
  margin-bottom: 7px;
`;

const ProfileText = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: 100px;
`;

const FollowBox = styled.div`
  width: 700px;
  height: 90px;
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

const TagTitle = styled.div`
  width: 700px;
  height: 40px;
  font-size: 17px;
  font-weight: "600";
  margin: 2px 0px;
`;

const TagList = styled.div`
  display: flex;
  width: 700px;
  height: 40px;
  margin: 3px 0px;
`;

const TopRight = () => {
  return (
    <>
      <TitleBox>
        <ProfileTitle>Hally Berry</ProfileTitle>
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
          우리의 이것이야말로 얼음에 위하여서. 사람은 동산에는 같이, 것이다.
          희망의 가슴이 뜨거운지라, 얼마나 끓는 있으랴? 청춘 지혜는 스며들어
          싶이 작고 사막이다. 가치를 낙원을 방황하여도,
        </ProfileText>
      </TextBox>
      <FollowBox>
        <ProfileFollowing>팔로잉 0명</ProfileFollowing>
        <ProfileFollower>팔로워 1000명</ProfileFollower>
        <ProfilePost>나의 게시글 50개</ProfilePost>
      </FollowBox>
      <TagTitle>
        <TagTitle>나의 관심태그</TagTitle>
        <TagList>
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
      </TagTitle>
    </>
  );
};

export default TopRight;
