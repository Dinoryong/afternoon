import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  /* width: 300px; */
  justify-content: flex-start;
  background-color: white;
  font-size: 15px;
  padding: 4px;
`;

const Wrapper1 = styled.div`
  display: flex;
  justify-items: flex-end;
`;

const CommentImg = styled.div`
  display: flex;
  position: relative;
  /* justify-content: flex-start; */
  /* justify-items: start; */
  /* align-content: start; */
  /* align-items: start; */
  width: 30px;
  height: 30px;
  margin-top: 12px;
  margin-right: 10px;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Wrapper3 = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  /* height: 24px; */
  margin-bottom: 6px;
`;

const CommentName = styled.div`
  display: flex;
  font-weight: bold;
  margin-right: 15px;
`;

const CommentPin = styled.div`
  display: flex;
  margin-right: 15px;
`;

const LinkBox = styled.div`
  display: flex;
  opacity: 0.6;
`;

const CommentLink = styled.div`
  display: flex;
  width: 15px;
  height: 15px;
  position: relative;
  margin-top: 4px;
  margin-right: 5px;
`;

const Wrapper4 = styled.div`
  display: flex;
  width: 100%;
`;

const CommentContent = styled.div`
  display: flex;
  word-wrap: break-word;
`;

const index = ({ commentData }) => {
  return (
    <Container>
      <Wrapper1>
        <CommentImg>
          <Image
            className="next_border_image circle"
            src="/assets/logos/pinset_logo_black.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </CommentImg>
      </Wrapper1>
      <Wrapper2>
        <Wrapper3>
          <CommentName>영지</CommentName>
          <CommentPin>#핀A</CommentPin>
          <LinkBox>
            <CommentLink>
              <Image
                src="/assets/icons/pinlink.png"
                layout="fill"
                objectFit="contain"
              ></Image>
            </CommentLink>
            링크 바로가기
          </LinkBox>
        </Wrapper3>
        <Wrapper4>
          <CommentContent>
            이 링크에서는 쿠폰 할인 통신사 할인까지 적용할 수
            있어요.오와하라라라라더운지라 사라지지 뭇 아서는 쿠폰 할인 통신사
            할인까지 적용할 수 있어요.오와하라라라라더운지라 사라지지 뭇 아
          </CommentContent>
        </Wrapper4>
      </Wrapper2>
    </Container>
  );
};

export default index;
