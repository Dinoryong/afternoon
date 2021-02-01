import React from 'react'
import styled from "@emotion/styled";
import Button from "../../components/Button";
import color from "../../styles/theme";
import Image from "next/image";

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
  display:flex;
  color: ${color.black.default};
  font-weight: bold;
  font-size: 16px;
`;

const ContentText = styled.div`
  display: flex;
  color: ${color.black.default};
  font-size: 12px;
`;

const PinTop = () => {
  return (
    <Container>
      <TextBox>
        <TitleText>잼통과 꿀통</TitleText>
        <ContentText>카테고리받아오기</ContentText>
      </TextBox>
    </Container>
  )
}

export default PinTop
