import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import dynamic from "next/dynamic";
import { GET_LOGIN_POST } from "../api/post";

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  padding-top: 82px;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1280px;
  /* width: 100%; */
`;

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/Egjs"),
  {
    ssr: false,
  }
);

const index = () => {
  useEffect(function mount() {
    console.log("피드진입");
    GET_LOGIN_POST();
  });

  return (
    <Container>
      <Wrapper>
        <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR>
      </Wrapper>
    </Container>
  );
};

export default index;
