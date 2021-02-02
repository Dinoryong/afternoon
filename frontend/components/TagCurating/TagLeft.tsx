import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";

const Container = styled.div`
  display: flex;
  /* width: 450px; */
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 60px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleText = styled.div`
  display: flex;
  color: ${color.black.default};
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 30px;
`;

const ContentText = styled.div`
  display: flex;
  color: ${color.black.default};
  font-size: 16px;
`;

const TagLeft = ({ tagTitle, tagText }) => {
  return (
    <Container>
      <TextBox>
        <TitleText>{ tagTitle }</TitleText>
        <ContentText>{ tagText }</ContentText>
      </TextBox>
    </Container>
  );
};

export default TagLeft;