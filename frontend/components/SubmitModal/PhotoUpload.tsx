import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Button from "../Button";
import UploadButtonBox from "./UploadButtonBox";
import UploadPreviewBox from "./UploadPreviewBox";
import firebase from "firebase";

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
  min-height: 60px;
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

const PhotoUpload = () => {
  const storage = firebase.storage();

  const [imageAsFile1, setImageAsFile1] = useState({
    image: null,
    url: "",
    progress: 0,
  });
  const [imageAsFile2, setImageAsFile2] = useState({
    image: null,
    url: "",
    progress: 0,
  });
  const [imageAsFile3, setImageAsFile3] = useState({
    image: null,
    url: "",
    progress: 0,
  });
  const [imageAsFile4, setImageAsFile4] = useState({
    image: null,
    url: "",
    progress: 0,
  });

  useEffect(() => {
    console.log("[image1]");
    console.log(imageAsFile1);
  }, [imageAsFile1]);
  useEffect(() => {
    console.log("[image2]");
    console.log(imageAsFile2);
  }, [imageAsFile2]);
  useEffect(() => {
    console.log("[image3]");
    console.log(imageAsFile3);
  }, [imageAsFile3]);
  useEffect(() => {
    console.log("[image4]");
    console.log(imageAsFile4);
  }, [imageAsFile4]);

  const uploadToFirebase = (imageAsFile, setImageAsFile): void => {
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

  const UploadAllToFirebase = async () => {
    if (imageAsFile1.image !== null)
      uploadToFirebase(imageAsFile1, setImageAsFile1);

    if (imageAsFile2.image !== null)
      uploadToFirebase(imageAsFile2, setImageAsFile2);

    if (imageAsFile3.image !== null)
      uploadToFirebase(imageAsFile3, setImageAsFile3);

    if (imageAsFile4.image !== null)
      uploadToFirebase(imageAsFile4, setImageAsFile4);
  };

  return (
    <Container>
      <TitleWrapper>사진 업로드 (1/2)</TitleWrapper>
      <TopWrapper>
        <TopWrapperRow>
          <UploadBtnDiv>
            {imageAsFile1 && imageAsFile1.image === null && (
              <UploadButtonBox
                imageAsFile={imageAsFile1}
                setImageAsFile={setImageAsFile1}
              />
            )}
            {/* {imageAsFile1 && imageAsFile1.image !== null && (
              <UploadPreviewBox
                imageAsFile={imageAsFile1}
                setImageAsFile={setImageAsFile1}
              />
            )} */}
          </UploadBtnDiv>
          <UploadBtnDiv>
            {imageAsFile1 &&
            imageAsFile2 &&
            imageAsFile1.image !== null &&
            imageAsFile2.image === null ? (
              <UploadButtonBox
                imageAsFile={imageAsFile2}
                setImageAsFile={setImageAsFile2}
              />
            ) : null}
          </UploadBtnDiv>
        </TopWrapperRow>
        <TopWrapperRow>
          <UploadBtnDiv>
            {imageAsFile2 &&
            imageAsFile3 &&
            imageAsFile2.image !== null &&
            imageAsFile3.image === null ? (
              <UploadButtonBox
                imageAsFile={imageAsFile3}
                setImageAsFile={setImageAsFile3}
              />
            ) : null}
          </UploadBtnDiv>
          <UploadBtnDiv>
            {imageAsFile3 &&
            imageAsFile4 &&
            imageAsFile3.image !== null &&
            imageAsFile4.image === null ? (
              <UploadButtonBox
                imageAsFile={imageAsFile4}
                setImageAsFile={setImageAsFile4}
              />
            ) : null}
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
          <Button btnText={"다음"} btnOnClick={UploadAllToFirebase}></Button>
        </ButtonDiv>
      </BottomWrapper>
    </Container>
  );
};

export default PhotoUpload;
