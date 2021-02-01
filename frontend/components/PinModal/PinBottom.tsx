import React from "react";
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
`;

const ArrowBox = styled.div`
  display: flex;
  position: relative;
  width: 14px;
  height: 14px;
  margin-top: 8px;
`;

const PinBottom = () => {
  return (
    <Container>
      <InlineBox1>
        <LinkBox>
          <LinkInput>프라푸룡의's Pick</LinkInput>
        </LinkBox>
        <LinkImg>
          <Image
            src="/assets/icons/link.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </LinkImg>
      </InlineBox1>
      <InlineBox2>
        <ArrowBox>
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
