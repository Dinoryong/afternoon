import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PinTop from "./PinTop";
import PinBottom from "./PinBottom";

const Container = styled.div`
  z-index: 6;
  position: absolute;
  width: max-content;
  height: max-content;
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 0px 8px 0px gray;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  margin: 12px 16px 8px 16px;
`;

const index = ({ pinData, accountNickname }) => {
  const {
    pinName,
    pinApiLink,
    pinApiClass,
    pinLink,
    pinLocX,
    pinLocY,
  } = pinData;

  const calLocation = () => {
    if (pinLocY <= 50) {
      if (pinLocX >= 50) {
        return { top: "90%", right: "90%" };
      }
      return { top: "90%", left: "90%" };
    } else {
      if (pinLocX >= 50) {
        return { bottom: "90%", right: "90%" };
      }
      return { bottom: "90%", left: "90%" };
    }
  };

  return (
    <>
      <Container style={calLocation()}>
        <Wrapper>
          <PinTop pinName={pinName} pinApiClass={pinApiClass}></PinTop>
          <PinBottom
            pinLink={pinLink}
            pinWriter={accountNickname}
            pinApiLink={pinApiLink}
          ></PinBottom>
        </Wrapper>
      </Container>
    </>
  );
};

export default index;
