import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Button from "../Button";
import UploadButtonBox from "./UploadButtonBox";
import UploadPreviewBox from "./UploadPreviewBox";
import firebase from "firebase";
import { keyframes } from "@emotion/react";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  min-height: 30px;
  font-weight: 700;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* border: 2px dashed ${color.gray.default}; */
  padding: 10px;
`;

const TopWrapperRow = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  margin: 10px 0px;
`;

const UploadBtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
`;

const BottomWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-height: 40px;
  /* border-top: 1px solid ${color.gray.default}; */
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

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translateY(0px);
    height: 96px;
    width: 110px;
  }

  40%, 43% {
    transform: translateY(-30px);
    height: 111px;
    width: 81px;
  }

  70% {
    transform: translateY(-15px);
    height: 104px;
    width: 88px;
  }

  90% {
    transform: translateY(-4px);
    height: 98px;
    width: 94px;
  }
`;

const ProgressContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${color.gray.default};
  background-color: ${color.white.default};
  cursor: pointer;
`;

const ProgressBox = styled.div`
  font-weight: 700;
  color: ${color.black.default};
  border-radius: 50%;
  background-color: ${color.blue.default};
  color: ${color.white.default};
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${bounce} 1s ease infinite;
`;

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const useCounter = () => {
  const submitShown = useSelector((state) => state.submit.submitShown);

  return {
    submitShown,
  };
};

const PhotoUpload = ({
  imageAsFile1,
  setImageAsFile1,
  imageAsFile2,
  setImageAsFile2,
  imageAsFile3,
  setImageAsFile3,
  imageAsFile4,
  setImageAsFile4,
  setUploadState,
  uploadState,
}) => {
  const storage = firebase.storage();

  const { submitShown } = useCounter();
  const [blockNext, setBlockNext] = useState(
    imageAsFile1.url === "" ? true : false
  );

  useEffect(() => {
    if (imageAsFile1.image !== null && imageAsFile1.url === "")
      uploadToFirebase(imageAsFile1, setImageAsFile1);
  }, [imageAsFile1.image]);

  useEffect(() => {
    if (imageAsFile2.image !== null && imageAsFile2.url === "")
      uploadToFirebase(imageAsFile2, setImageAsFile2);
  }, [imageAsFile2.image]);

  useEffect(() => {
    if (imageAsFile3.image !== null && imageAsFile3.url === "")
      uploadToFirebase(imageAsFile3, setImageAsFile3);
  }, [imageAsFile3.image]);

  useEffect(() => {
    if (imageAsFile4.image !== null && imageAsFile4.url === "")
      uploadToFirebase(imageAsFile4, setImageAsFile4);
  }, [imageAsFile4.image]);

  useEffect(() => {
    if (
      imageAsFile1.url !== "" &&
      (imageAsFile1.progress === 0 || imageAsFile1.progress === 100) &&
      (imageAsFile2.progress === 0 || imageAsFile2.progress === 100) &&
      (imageAsFile3.progress === 0 || imageAsFile3.progress === 100) &&
      (imageAsFile4.progress === 0 || imageAsFile4.progress === 100)
    ) {
      setBlockNext(false);
    } else {
      setBlockNext(true);
    }
  }, [
    imageAsFile1.url,
    imageAsFile1.progress,
    imageAsFile2.progress,
    imageAsFile3.progress,
    imageAsFile4.progress,
  ]);

  const uploadToFirebase = (imageAsFile, setImageAsFile) => {
    console.log("start of upload");
    // async magic goes here...
    const { image } = imageAsFile;
    const imageId = makeid(16);

    if (image === null) {
      console.error(`not an image, the image file is a ${typeof image}`);
    }
    const uploadTask = storage.ref(`/images/${imageId}`).put(image);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        setImageAsFile({
          ...imageAsFile,
          progress: Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          ),
        });
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(imageId)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsFile({ ...imageAsFile, url: fireBaseUrl, progress: 100 });
          });
      }
    );
  };

  return (
    <Container style={uploadState != 0 ? { display: "none" } : {}}>
      <TitleWrapper>사진 업로드</TitleWrapper>
      <TopWrapper>
        <TopWrapperRow>
          <UploadBtnDiv>
            {submitShown && imageAsFile1 && (
              <ProgressContainer>
                <ProgressBox>{imageAsFile1.progress} %</ProgressBox>
              </ProgressContainer>
            )}
            {submitShown && imageAsFile1 && imageAsFile1.image === null ? (
              <UploadButtonBox setImageAsFile={setImageAsFile1} />
            ) : null}
            {submitShown &&
              imageAsFile1 &&
              imageAsFile1.image !== null &&
              imageAsFile1.url !== "" && (
                <UploadPreviewBox imageAsFile={imageAsFile1} />
              )}
          </UploadBtnDiv>
          <UploadBtnDiv>
            {submitShown &&
              imageAsFile1 &&
              imageAsFile1.image !== null &&
              imageAsFile2 && (
                <ProgressContainer>
                  <ProgressBox>{imageAsFile2.progress} %</ProgressBox>
                </ProgressContainer>
              )}
            {submitShown &&
            imageAsFile1 &&
            imageAsFile2 &&
            imageAsFile1.image !== null &&
            imageAsFile2.image === null ? (
              <UploadButtonBox setImageAsFile={setImageAsFile2} />
            ) : null}
            {submitShown &&
              imageAsFile2 &&
              imageAsFile2.image !== null &&
              imageAsFile2.url !== "" && (
                <UploadPreviewBox imageAsFile={imageAsFile2} />
              )}
          </UploadBtnDiv>
        </TopWrapperRow>
        <TopWrapperRow>
          <UploadBtnDiv>
            {submitShown &&
              imageAsFile2 &&
              imageAsFile2.image !== null &&
              imageAsFile3 && (
                <ProgressContainer>
                  <ProgressBox>{imageAsFile3.progress} %</ProgressBox>
                </ProgressContainer>
              )}
            {submitShown &&
            imageAsFile2 &&
            imageAsFile3 &&
            imageAsFile2.image !== null &&
            imageAsFile3.image === null ? (
              <UploadButtonBox setImageAsFile={setImageAsFile3} />
            ) : null}
            {submitShown &&
              imageAsFile3 &&
              imageAsFile3.image !== null &&
              imageAsFile3.url !== "" && (
                <UploadPreviewBox imageAsFile={imageAsFile3} />
              )}
          </UploadBtnDiv>
          <UploadBtnDiv>
            {submitShown &&
              imageAsFile3 &&
              imageAsFile3.image !== null &&
              imageAsFile4 && (
                <ProgressContainer>
                  <ProgressBox>{imageAsFile4.progress} %</ProgressBox>
                </ProgressContainer>
              )}
            {submitShown &&
            imageAsFile3 &&
            imageAsFile4 &&
            imageAsFile3.image !== null &&
            imageAsFile4.image === null ? (
              <UploadButtonBox setImageAsFile={setImageAsFile4} />
            ) : null}
            {submitShown &&
              imageAsFile4 &&
              imageAsFile4.image !== null &&
              imageAsFile4.url !== "" && (
                <UploadPreviewBox imageAsFile={imageAsFile4} />
              )}
          </UploadBtnDiv>
        </TopWrapperRow>
      </TopWrapper>
      <BottomWrapper>
        <WarningDiv>
          (!) 사진 제거 시 해당 사진에 작성된 핀 내용이 삭제됩니다.
        </WarningDiv>
        <ButtonDiv>
          <Button
            btnText={"취소"}
            btnOnClick={(): void => {
              console.log(imageAsFile1);
              console.log(imageAsFile2);
              console.log(imageAsFile3);
              console.log(imageAsFile4);
            }}
          ></Button>
          <Button
            btnText={"다음"}
            btnOnClick={() => {
              if (!blockNext) setUploadState(1);
            }}
          ></Button>
        </ButtonDiv>
      </BottomWrapper>
    </Container>
  );
};

export default PhotoUpload;
