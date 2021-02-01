import React from "react";
import styled from "@emotion/styled";
import Button from "../../components/Button";
import color from "../../styles/theme";
import Image from "next/image";
import PinTop from "./PinTop";
import PinBottom from "./PinBottom";

const Container = styled.div`
  width: max-content;
  display: flex;
  justify-content: center;
  background-color: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  margin: 12px 16px 8px 16px;
`;

const index = () => {
  return (
    <Container>
      <Wrapper>
        <PinTop></PinTop>
        <PinBottom></PinBottom>
      </Wrapper>
    </Container>
  );
};

export default index;
