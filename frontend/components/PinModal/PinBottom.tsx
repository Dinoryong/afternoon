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
  margin-top: 5px;
  cursor: pointer;
`;

const LinkBox = styled.div`
  display: flex;
  width: 100%;
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
  margin-top: 2px;
`;

const InlineBox2 = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  cursor: pointer;
`;

const ArrowBox = styled.div<ExpandProps>`
  display: flex;
  position: relative;
  width: 14px;
  height: 14px;
  margin-top: 8px;
  transform: rotateX(${(props) => (props.expand ? `3.142rad` : `0rad`)});
  transition: all 0.3s;
`;

const TransitionBox = styled.div`
  overflow-y: hidden;
  transition: all 0.3s;
`;

type ExpandProps = {
  expand: boolean;
};

const PinBottom = ({
  pinLink,
  pinWriter,
  apiLink,
  pinComments,
  expand,
  setExpand,
}) => {
  return (
    <Container>
      <InlineBox1
        onClick={() => {
          window.open(pinLink, "_blank");
        }}
      >
        <LinkBox>
          <LinkInput>{pinWriter}님's Pick</LinkInput>
        </LinkBox>
        <LinkImg>
          <Image
            src="/assets/icons/link.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </LinkImg>
      </InlineBox1>
      <TransitionBox
        style={
          expand
            ? pinComments
              ? {
                  height: `${(pinComments.length + 1) * 29}px`,
                }
              : { height: "29px" }
            : { height: 0 }
        }
      >
        <InlineBox1
          className="test"
          onClick={() => {
            window.open(apiLink, "_blank");
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
        {pinComments &&
          pinComments.map((com, index) => {
            return (
              <InlineBox1
                key={index}
                onClick={() => {
                  window.open(com.commentLink, "_blank");
                }}
              >
                <LinkBox>
                  <LinkInput>{com.commentWriter}님's Pick</LinkInput>
                </LinkBox>
                <LinkImg>
                  <Image
                    src="/assets/icons/link.png"
                    layout="fill"
                    objectFit="contain"
                  ></Image>
                </LinkImg>
              </InlineBox1>
            );
          })}
      </TransitionBox>
      <InlineBox2
        onClick={() => {
          setExpand(!expand);
          console.log(expand);
        }}
      >
        <ArrowBox expand={expand}>
          <Image
            src="/assets/icons/arrow_down.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </ArrowBox>
      </InlineBox2>
    </Container>
  );
};

export default PinBottom;
