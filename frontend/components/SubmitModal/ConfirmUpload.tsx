import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Button from "../Button";
import color from "../../styles/theme";
import { SUBMIT_POST } from "../../pages/api/post";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const InfoWrapper = styled.div`
  position: relative;
  min-width: 360px;
  height: 100%;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-left: 20px;
  font-size: 16px;
`;

const InfoTop = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

const InfoBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 55px;
`;

const InfoButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const RightButtonBox = styled.div`
  display: flex;
`;

const BoxLabel = styled.div`
  font-weight: 400;
`;

const CommonInput = styled("textarea")`
  margin-top: 10px;
  border: 0px;
  color: ${color.black.default};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${color.gray.default};
  }
  resize: none;
`;

const TitleInput = styled(CommonInput)``;

const ContentInput = styled(CommonInput)``;

const BoxLine = styled.div`
  width: 100%;
  min-height: 1px;
  background-color: ${color.gray.default};
  margin: 10px 0px;
`;

const ConfirmUpload = ({
  imageAsFile1,
  imageAsFile2,
  imageAsFile3,
  imageAsFile4,
  setUploadState,
}) => {
  const [currentImg, setCurrentImg] = useState(0);

  const imageAsFile = [];

  imageAsFile.push(imageAsFile1.url);
  if (imageAsFile2.url !== "") imageAsFile.push(imageAsFile2.url);
  if (imageAsFile3.url !== "") imageAsFile.push(imageAsFile3.url);
  if (imageAsFile4.url !== "") imageAsFile.push(imageAsFile4.url);

  const submitPostRequest = {
    postsTitle: "프론트제목",
    postsContents: "프론트내용",
    postsTags: [{ tagTitle: "개발자" }, { tagTitle: "요리사" }],
  };

  return (
    <Container>
      <ImageDiv>
        {imageAsFile && imageAsFile.length > 0 && (
          <Image
            src={imageAsFile[currentImg]}
            layout="fill"
            objectFit="contain"
          ></Image>
        )}
      </ImageDiv>
      <InfoWrapper>
        <InfoDiv>
          <InfoTop>
            <BoxLabel style={{ fontWeight: 700 }}>태그 선택 (필수)</BoxLabel>
            <BoxLine />
            <BoxLabel>제목 작성 (선택)</BoxLabel>
            <TitleInput placeholder={"제목을 작성해주세요"}></TitleInput>
            <BoxLine />
            <BoxLabel>내용 작성 (선택)</BoxLabel>
            <ContentInput placeholder={"내용을 작성해주세요"}></ContentInput>
            <BoxLine />
            <BoxLabel>핀 추가 (선택)</BoxLabel>
          </InfoTop>
          <InfoBottom>
            <BoxLine />
            <InfoButtonBox>
              <Button
                btnOnClick={() => {
                  setUploadState(0);
                }}
                btnText={"이전"}
                btnMarginLeft="0"
                btnMarginRight="0"
                btnWidth="80px"
              />
              <RightButtonBox>
                <Button
                  btnOnClick={() => {
                    setCurrentImg(
                      currentImg === imageAsFile.length - 1 ? 0 : currentImg + 1
                    );
                  }}
                  btnText={"취소"}
                  btnHoverBgColor={color.red.default}
                  btnHoverBorderColor={color.red.default}
                  btnHoverTextColor={color.white.default}
                  btnMarginLeft="0"
                  btnMarginRight="0"
                  btnWidth="80px"
                />
                <Button
                  btnOnClick={() => {
                    // setUploadState(0);
                    const result = SUBMIT_POST(submitPostRequest);
                    console.log(result);
                  }}
                  btnBgColor={color.black.default}
                  btnBorderColor={color.black.default}
                  btnTextColor={color.white.default}
                  btnText={"업로드"}
                  btnMarginRight="0"
                  btnWidth="80px"
                />
              </RightButtonBox>
            </InfoButtonBox>
          </InfoBottom>
        </InfoDiv>
      </InfoWrapper>
    </Container>
  );
};

export default ConfirmUpload;
