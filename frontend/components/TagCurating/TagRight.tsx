import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Button from "../Button";

const Container = styled.div`
  display: flex;
  width: 450px;
  min-width: 350px;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 60px;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 15px;
  border: 1px solid lightgray;
  border-radius: 4px;
`;

const ContributionBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 30px 15px 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 8px;
`;

const InsideContributor1 = styled.div`
  display: flex;
`;

const InsideContributor2 = styled.div`
  display: flex;
`;

const UsersBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 30px 15px 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 8px;
`;

const InsideUsers1 = styled.div`
  display: flex;
`;

const InsideUsers2 = styled.div`
  display: flex;
`;

const TopuserBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 30px 15px 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 8px;
`;

const InsideTopuser1 = styled.div`
  display: flex;
`;

const InsideTopuser2 = styled.div`
  display: flex;
`;

// const ToppostBox = styled.div`
//   display: flex;
//   margin: 0px 20px 15px 20px;
//   border-bottom: 1px solid lightgray;
//   padding-bottom: 8px;
// `;

const TopcontributorBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 30px 20px 30px;
`;

const InsideTopcontributor1 = styled.div`
  display: flex;
`;

const InsideTopcontributor2 = styled.div`
  display: flex;
`;

const BottomBox = styled.div`
  display: flex;
  width: 100%;
  /* min-width: 450px; */
  flex-direction: column;
  /* background-color: green; */
`;

const LikeTag = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* min-width: 450px; */
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
        <ContributionBox>
          <InsideContributor1>게시물</InsideContributor1>
          <InsideContributor2>{tagContributions}</InsideContributor2>
        </ContributionBox>
        <UsersBox>
          <InsideUsers1>기여한</InsideUsers1>
          <InsideUsers2>{tagUsers}</InsideUsers2>
        </UsersBox>
        <TopuserBox>
          <InsideTopuser1>좋아요 만땅러</InsideTopuser1>
          <InsideTopuser2>{tagTopUser}</InsideTopuser2>
        </TopuserBox>
        {/* <ToppostBox>좋아요를 많이 받은 게시물 {tagTopPost}</ToppostBox> */}
        <TopcontributorBox>
          <InsideTopcontributor1>기여 만땅러</InsideTopcontributor1>
          <InsideTopcontributor2>{tagTopContributer}</InsideTopcontributor2>
        
        </TopcontributorBox>
      </TopBox>
      <BottomBox>
        <LikeTag>
          <Button
            btnBgColor={color.black.default}
            btnWidth="100%"
            btnMarginLeft="0px"
            btnMarginRight="0px"
            btnText="관심태그로 설정하기"
            btnFontSize="15px"
            btnTextColor={color.white.default}
            btnHeight="40px"
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
