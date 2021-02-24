import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 4px 0px;
`;

const InlineBox1 = styled.div`
  display: flex;
  align-content: space-between;
  cursor: pointer;
  margin-top: 8px;
`;

const LinkBox = styled.div`
  display: flex;
  width: 100%;
  /* opacity: 0.9; */
`;

const LinkInput = styled.div`
  display: flex;
`;

const LinkImg = styled.div`
  display: flex;
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  /* opacity: 0.9; */
`;

const PinBottom = ({ pinLink, pinWriter, pinApiLink }) => {
  return (
    <Container>
      <InlineBox1
        onClick={() => {
          window.open(pinLink, "_blank");
        }}
      >
        <LinkBox>
          <LinkInput>{pinWriter}님의 구매정보</LinkInput>
        </LinkBox>
        <LinkImg>
          <Image
            src="/assets/icons/link.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </LinkImg>
      </InlineBox1>
      <InlineBox1
        onClick={() => {
          window.open(pinApiLink, "_blank");
        }}
      >
        <LinkBox>
          <LinkInput>네이버 최저가</LinkInput>
        </LinkBox>
        <LinkImg>
          <Image
            src="/assets/icons/link.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </LinkImg>
      </InlineBox1>
    </Container>
  );
};

export default PinBottom;
