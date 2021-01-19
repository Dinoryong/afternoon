import React from "react";
import styled from "@emotion/styled";
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";

const Container = styled.div`
  position: fixed;
  justify-content: center;
  display: flex;
  height: 62px;
  width: 100%;
  font-size: 14px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(1, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  color: #767676;
`;

const index = () => {
  return (
    <Container>
      <Wrapper>
        <HeaderLeft />
        <HeaderCenter />
        <HeaderRight />
      </Wrapper>
    </Container>
  );
};

export default index;
