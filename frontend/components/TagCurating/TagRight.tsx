import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Button from "../Button";

const Container = styled.div`
  display: flex;
  /* width: 450px; */
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 60px;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
`;

const ContributionBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const UsersBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TopuserBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const ToppostBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TopcontributerBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: green; */
`;

const LikeTag = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* background-color: white; */
`;

const TagRight = ({
  tagContributions,
  tagUsers,
  tagTopUser,
  tagTopPost,
  tagTopContributer,
}) => {
  return (
    <Container>
      <TopBox>
        <ContributionBox>총 게시글 수 : {tagContributions}</ContributionBox>
        <UsersBox>총 기여한 회원 수 : {tagUsers}</UsersBox>
        <TopuserBox>좋아요를 가장 많이 받은 회원님 : {tagTopUser}</TopuserBox>
        <ToppostBox>좋아요를 많이 받은 게시물 : {tagTopPost}</ToppostBox>
        <TopcontributerBox>가장 많이 기여한 회원님 : {tagTopContributer}</TopcontributerBox>
      </TopBox>
      <BottomBox>
        <LikeTag>
          <Button
            btnBgColor={color.white.default}
            btnWidth="400px"
            btnText="이 태그 좋아요"
            btnTextColor={color.black.default}
            btnHeight="30px"
            btnFontWeight={700}
            btnBorderColor={color.black.default}
            btnHoverBorderColor="transparent"
            btnHoverBgColor={color.gray.dark}
            btnHoverTextColor={color.white.default}
            // btnOnClick={requestSignup}
          />
        </LikeTag>
      </BottomBox>
    </Container>
  );
};

export default TagRight;
