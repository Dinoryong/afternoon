import React from "react";
import styled from "@emotion/styled";
import HomeTop from "./HomeTop";
import HomeBottom from "./HomeBottom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const index = () => {
  return (
    <Container>
      <HomeTop></HomeTop>
      <HomeBottom></HomeBottom>
    </Container>
  );
};

export default index;
