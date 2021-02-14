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
  font-size: 18px;
`;

const ContentText = styled.div`
  display: flex;
  color: ${color.gray.dark};
  font-size: 14px;
`;

const PinTop = ({ pinName, pinApiClass }) => {
  return (
    <Container>
      <TextBox>
        <TitleText>{pinName}</TitleText>
        <ContentText>{pinApiClass}</ContentText>
      </TextBox>
    </Container>
  );
};

export default PinTop;
