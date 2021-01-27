import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Button from "../Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TopWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 700;
`;

const BottomWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-height: 60px;
  border-top: 1px solid ${color.gray.default};
`;

const WarningDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: ${color.red.default};
`;

const ButtonDiv = styled.div`
  z-index: 1;
  display: flex;
`;

const PhotoUpload = () => {
  return (
    <Container>
      <TopWrapper>사진 업로드 (1/2)</TopWrapper>
      <BottomWrapper>
        <WarningDiv>
          (!) 사진 제거 시 해당 사진에 작성된 핀 내용이 삭제됩니다.
        </WarningDiv>
        <ButtonDiv>
          <Button btnText={"취소"}></Button>
          <Button btnText={"다음"}></Button>
        </ButtonDiv>
      </BottomWrapper>
    </Container>
  );
};

export default PhotoUpload;
