import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleText = styled.div`
  display: flex;
  color: ${color.black.default};
  font-weight: bold;
  font-size: 16px;
`;

const ContentText = styled.div`
  display: flex;
  color: ${color.black.default};
  font-size: 12px;
`;

const PinTop = ({ pinTitle, apiCategory }) => {
  return (
    <Container>
      <TextBox>
        <TitleText>{pinTitle}</TitleText>
        <ContentText>{apiCategory}</ContentText>
      </TextBox>
    </Container>
  );
};

export default PinTop;
