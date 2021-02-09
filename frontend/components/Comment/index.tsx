import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  /* width: 300px; */
  justify-content: flex-start;
  background-color: gray;
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
  margin-top: 10px;
  margin-right: 20px;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Wrapper3 = styled.div`
  display: flex;
  font-size: 15px;
  width: 100%;
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

const CommentLink = styled.div`
  display: flex;
  width: 15px;
  height: 15px;
  position: relative;
  margin-top: 3px;
  margin-right: 15px;

`;

const Wrapper4 = styled.div`
  display: flex;
  width: 100%;
`;

const CommentContent = styled.div`
  display: flex;
  word-wrap: break-word;
`;

const index = () => {
  return (
    <Container>
      <Wrapper1>
        <CommentImg>
          <Image
            class="next_border_image circle"
            src="/assets/logos/pinset_logo_black.png"
            layout="fill"
            objectFit="contain"
            // onClick="cursor"
          ></Image>
        </CommentImg>
      </Wrapper1>
      <Wrapper2>
        <Wrapper3>
          <CommentName>ppu</CommentName>
          <CommentPin>#핀A</CommentPin>
          <CommentLink>
            <Image
              src="/assets/icons/pinlink.png"
              layout="fill"
              objectFit="contain"
            ></Image>
          </CommentLink>
        </Wrapper3>
        <Wrapper4>
          <CommentContent>
            이 링크에서는 쿠폰 할인 통신사 할인까지 적용할 수
            있어요.오와하라라라라더운지라 사라지지 뭇 아니한 끓는 청춘에서만
            있음으로써 이것이다. 생의 남는 이것은 용기가 꾸며 그리하였는가?
            뛰노는 인도하겠다는 고행을 황금시대를 몸이 뭇 것이다. 때까지 그들의
            있으며, 뭇 무엇을 주는 무한한 칼이다. 아니한 같이, 이상의 우리
            커다란 피고, 하였으며, 이는 트고, 있으랴? 이상은 청춘이 위하여,
            피고, 우리의 능히 피부가 부패를 뿐이다. 꽃 이 안고, 위하여서. 작고
            날카로우나 있음으로써 내는 따뜻한 되려니와, 피가 따뜻한 안고,
            사막이다. 되는 고동을 심장의 이성은 관현악이며, 뿐이다.
          </CommentContent>
        </Wrapper4>
      </Wrapper2>
    </Container>
  );
};

export default index;
