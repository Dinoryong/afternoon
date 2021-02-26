import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PinTop from "./PinTop";
import PinBottom from "./PinBottom";

const Container = styled.div`
  z-index: 11;
  position: absolute;
  height: max-content;
  display: flex;
  justify-content: flex-start;
  background-color: white;
  box-shadow: 0px 0px 8px 0px gray;
  width: max-content;
  @media only screen and (max-width: 768px) {
    max-width: 180px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 180px;
  }
  @media only screen and (min-width: 1280px) {
    max-width: 400px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  @media only screen and (max-width: 768px) {
    margin: 4px 12px 4px 8px;
  }
  @media only screen and (min-width: 768px) {
    margin: 4px 12px 4px 8px;
  }
  @media only screen and (min-width: 1280px) {
    margin: 12px 16px 8px 16px;
  }
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
