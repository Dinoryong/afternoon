import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Button from "../Button";
import color from "../../styles/theme";
import { SUBMIT_POST } from "../../pages/api/post";
import PinIcon from "../PinIcon";
import TagBox from "../TagBox";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ImageBox = styled("img")`
  z-index: 2;
  max-width: 100%;
  max-height: 100%;
`;

const InfoWrapper = styled.div`
  position: relative;
  min-width: 400px;
  height: 100%;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-left: 20px;
  font-size: 14px;
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

const BoxLine = styled.div`
  width: 100%;
  min-height: 1px;
  background-color: ${color.gray.default};
  margin: 10px 0px;
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
  font-size: 16px;
  margin-top: 10px;
  border: 0px;
  padding: 0px;
  color: ${color.black.default};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${color.gray.dark};
    font-weight: 300;
  }
  resize: none;
`;

const InputTitle = styled(CommonInput)`
  min-height: 48px;
`;

const InputContent = styled(CommonInput)`
  min-height: 120px;
`;

const PinGuide = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-weight: 700;
  color: ${color.gray.dark};
`;

const SelectPhotoBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const PhotoButton = styled.div`
  margin: 0px 8px;
  padding: 4px 16px;
  background-color: ${color.black.default};
  border-radius: 4px;
  color: ${color.white.default};
  cursor: pointer;
  opacity: 0.2;
  transition: all 0.3s;
`;

const PinControlDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EditPinDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 2px 2px 3px 0px ${color.gray.darker};
  border-radius: 4px;
  width: 90%;
  padding: 8px;
  margin-bottom: 12px;
`;

const PinNameBox = styled.div`
  display: flex;
  padding-bottom: 8px;
  align-items: center;
`;

const PinLinkBox = styled.div`
  display: flex;
  border-top: 1px solid ${color.gray.default};
  border-bottom: 1px solid ${color.gray.default};
  padding: 8px 0px;
  align-items: center;
`;

const PinLabel = styled.div`
  font-weight: 700;
  margin-right: 8px;
`;

const PinInput = styled("input")`
  border: 0px;
  color: ${color.black.default};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${color.gray.dark};
    font-weight: 300;
  }
`;

const PinNavBox = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PinTagBox = styled.div`
  display: flex;
  align-items: center;
`;

const PinTag = styled.div`
  font-weight: 700;
  margin-left: 4px;
`;

const PinButtonBox = styled.div`
  display: flex;
`;

const AddPinButton = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 2px 2px 3px 0px ${color.gray.darker};
  border-radius: 4px;
  width: 90%;
  cursor: pointer;
  margin: 8px 0px;
`;

const AddIconBox = styled.div`
  position: relative;
  margin: 8px 0px;
  width: 20px;
  height: 20px;
`;

const DisalbedFrame = styled.div`
  z-index: 1;
  position: absolute;
  background-color: ${color.black.default};
  width: 100%;
  height: 100%;
  opacity: 0.9;
  cursor: url("/_next/image?url=%2Fassets%2Ficons%2Fpin_white.png&w=32&q=75") 4
      4,
    zoom-out;
`;

const PinClickFrame = styled.div<StateProps>`
  z-index: 3;
  position: absolute;
  opacity: 1;
  background-color: ${(props) =>
    props.addState ? "rgba(255, 255, 255, 0.2)" : "rgba(255,255,255,0}"};
  cursor: url("/_next/image?url=%2Fassets%2Ficons%2Fpin_add.png&w=32&q=75") 4 4,
    crosshair;
`;

const NewPinIcon = styled.div`
  z-index: 5;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${color.white.default};
  /* border: 2px solid ${color.white.default}; */
  top: 50%;
  left: 50%;
`;

const NewPinMini = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${color.white.default};
`;

const AddTagDiv = styled.div`
  display: flex;
  margin-top: 12px;
`;

const AddTagBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  font-size: 14px;
  color: ${color.black.default};
  background-color: ${color.white.default};
  border: 1px dashed ${color.black.default};
  font-weight: 500;
  border-radius: 4px;
  width: 80px;
  margin: 0px 6px;
  cursor: pointer;
`;

type StateProps = {
  addState?: boolean;
};

const useStore = () => {
  const dispatch = useDispatch();

  const toggleSubmit = async () => {
    await dispatch({ type: "TOGGLE_SUBMIT" });
  };

  return {
    toggleSubmit,
  };
};

const ConfirmUpload = ({
  imageAsFile1,
  imageAsFile2,
  imageAsFile3,
  imageAsFile4,
  setUploadState,
  uploadState,
}) => {
  const router = useRouter();
  const { toggleSubmit } = useStore();

  const [currentImg, setCurrentImg] = useState(0);
  const [addState, setAddState] = useState(false);
  const [imgDim, setImgDim] = useState({ offsetWidth: 0, offsetHeight: 0 });

  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [selectTagList, setSelectTagList] = useState([]);

  const [img1HasPin, setImg1HasPin] = useState([]);
  const [img2HasPin, setImg2HasPin] = useState([]);
  const [img3HasPin, setImg3HasPin] = useState([]);
  const [img4HasPin, setImg4HasPin] = useState([]);

  const [inputPinName, setInputPinName] = useState([]);
  const [inputPinLink, setInputPinLink] = useState([]);
  const [inputPinPosX, setInputPinPosX] = useState([]);
  const [inputPinPosY, setInputPinPosY] = useState([]);

  const imageAsFile = [];

  imageAsFile.push(imageAsFile1.url);
  if (imageAsFile2.url !== "") imageAsFile.push(imageAsFile2.url);
  if (imageAsFile3.url !== "") imageAsFile.push(imageAsFile3.url);
  if (imageAsFile4.url !== "") imageAsFile.push(imageAsFile4.url);

  const onClickAddPin = () => {
    let pinImage = document.getElementById(`pinImage${currentImg}`);
    setAddState(true);
    let { offsetWidth, offsetHeight } = pinImage;
    setImgDim({ offsetWidth, offsetHeight });
  };

  useEffect(function mount() {
    const resizeHandler = () => {
      let pinImage = document.getElementById(`pinImage${currentImg}`);
      let { offsetWidth, offsetHeight } = pinImage;
      setImgDim({ offsetWidth, offsetHeight });
    };

    window.addEventListener("resize", resizeHandler);

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
    };

    return cleanup;
  });

  const setPostRequest = () => {
    let reqTagList = [];
    let reqPinList = [];

    selectTagList.map((t) => {
      reqTagList.push({ tagId: parseInt(t) });
    });

    img1HasPin.map((i) => {
      reqPinList.push({
        pinName: inputPinName[i],
        pinLink: inputPinLink[i],
        pinNum: 1,
        pinLocX: inputPinPosX[i],
        pinLocY: inputPinPosY[i],
      });
    });

    img2HasPin.map((i) => {
      reqPinList.push({
        pinName: inputPinName[i],
        pinLink: inputPinLink[i],
        pinNum: 2,
        pinLocX: inputPinPosX[i],
        pinLocY: inputPinPosY[i],
      });
    });

    img3HasPin.map((i) => {
      reqPinList.push({
        pinName: inputPinName[i],
        pinLink: inputPinLink[i],
        pinNum: 3,
        pinLocX: inputPinPosX[i],
        pinLocY: inputPinPosY[i],
      });
    });

    img4HasPin.map((i) => {
      reqPinList.push({
        pinName: inputPinName[i],
        pinLink: inputPinLink[i],
        pinNum: 4,
        pinLocX: inputPinPosX[i],
        pinLocY: inputPinPosY[i],
      });
    });

    const postRequest = {
      postsTitle: inputTitle,
      postsContents: inputContent,
      postsPhotos: imageAsFile,
      postsTags: reqTagList,
      postsPins: reqPinList,
    };

    return postRequest;
  };

  const requestSubmitPost = async () => {
    const submitPostReq = setPostRequest();
    const submitPostConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    };

    const result = await SUBMIT_POST(submitPostReq, submitPostConfig);
    console.log(result);

    if (result.status === 201) {
      alert("게시물 등록 성공");
      toggleSubmit();
      router.push("/submit");
    } else {
      alert("게시물 등록 실패");
    }
  };

  useEffect(() => {
    let pinImage = document.getElementById(`pinImage${currentImg}`);
    let { offsetWidth, offsetHeight } = pinImage;
    setImgDim({ offsetWidth, offsetHeight });
  }, [currentImg]);

  const onClickPinFrame = (e) => {
    if (addState) {
      setInputPinPosX([
        ...inputPinPosX,
        (e.nativeEvent.offsetX / imgDim.offsetWidth) * 100,
      ]);
      setInputPinPosY([
        ...inputPinPosY,
        (e.nativeEvent.offsetY / imgDim.offsetHeight) * 100,
      ]);
      setInputPinName([...inputPinName, ""]);
      setInputPinLink([...inputPinLink, ""]);
      if (currentImg === 0) setImg1HasPin([...img1HasPin, inputPinPosX.length]);
      else if (currentImg === 1)
        setImg2HasPin([...img2HasPin, inputPinPosX.length]);
      else if (currentImg === 2)
        setImg3HasPin([...img3HasPin, inputPinPosX.length]);
      else if (currentImg === 3)
        setImg4HasPin([...img4HasPin, inputPinPosX.length]);
    }
    setAddState(false);
  };

  const props = {
    addState,
  };

  const onClickMoveBefore = () => {
    setUploadState(0);
  };

  const onClickAddTag = () => {
    let tagId = window.prompt("태그ID 입럭", "");
    if (tagId === null || tagId === "") {
      return;
    } else if (parseInt(tagId) > 23 || parseInt(tagId) < 1) {
      window.alert("1 ~ 23 사이의 숫자를 입력해주세요.");
      onClickAddTag();
    } else {
      setSelectTagList([...selectTagList, tagId]);
    }
  };

  return (
    <Container style={uploadState != 1 ? { display: "none" } : {}}>
      {addState && (
        <DisalbedFrame onClick={() => setAddState(false)}>
          <Image
            src={"/assets/icons/pin_white.png"}
            width={0}
            height={0}
          ></Image>
        </DisalbedFrame>
      )}
      <ImageDiv>
        <PinClickFrame
          style={{ width: imgDim.offsetWidth, height: imgDim.offsetHeight }}
          onClick={onClickPinFrame}
          {...props}
        >
          <Image src={"/assets/icons/pin_add.png"} width={0} height={0}></Image>
          {currentImg === 0 &&
            img1HasPin &&
            img1HasPin.map((p, index) => {
              return (
                <NewPinIcon
                  style={{
                    top: `${inputPinPosY[p] - 2000 / imgDim.offsetHeight}%`,
                    left: `${inputPinPosX[p] - 2000 / imgDim.offsetWidth}%`,
                  }}
                  key={index}
                >
                  <Image
                    src={"/assets/icons/eye_close.png"}
                    width={36}
                    height={36}
                    objectFit="contain"
                  ></Image>
                </NewPinIcon>
              );
            })}
          {currentImg === 1 &&
            img2HasPin &&
            img2HasPin.map((p, index) => {
              return (
                <NewPinIcon
                  style={{
                    top: `${inputPinPosY[p] - 2000 / imgDim.offsetHeight}%`,
                    left: `${inputPinPosX[p] - 2000 / imgDim.offsetWidth}%`,
                  }}
                  key={index}
                >
                  <Image
                    src={"/assets/icons/eye_close.png"}
                    width={36}
                    height={36}
                    objectFit="contain"
                  ></Image>
                </NewPinIcon>
              );
            })}
          {currentImg === 2 &&
            img3HasPin &&
            img3HasPin.map((p, index) => {
              return (
                <NewPinIcon
                  style={{
                    top: `${inputPinPosY[p] - 2000 / imgDim.offsetHeight}%`,
                    left: `${inputPinPosX[p] - 2000 / imgDim.offsetWidth}%`,
                  }}
                  key={index}
                >
                  <Image
                    src={"/assets/icons/eye_close.png"}
                    width={36}
                    height={36}
                    objectFit="contain"
                  ></Image>
                </NewPinIcon>
              );
            })}
          {currentImg === 3 &&
            img4HasPin &&
            img4HasPin.map((p, index) => {
              return (
                <NewPinIcon
                  style={{
                    top: `${inputPinPosY[p] - 2000 / imgDim.offsetHeight}%`,
                    left: `${inputPinPosX[p] - 2000 / imgDim.offsetWidth}%`,
                  }}
                  key={index}
                >
                  <Image
                    src={"/assets/icons/eye_close.png"}
                    width={36}
                    height={36}
                    objectFit="contain"
                  ></Image>
                </NewPinIcon>
              );
            })}
        </PinClickFrame>
        {imageAsFile &&
          imageAsFile.length > 0 &&
          imageAsFile.map((img, index) => (
            <ImageBox
              key={index}
              style={currentImg === index ? {} : { display: "none" }}
              id={`pinImage${index}`}
              src={img}
            ></ImageBox>
          ))}
      </ImageDiv>
      <InfoWrapper>
        <InfoDiv>
          <InfoTop>
            <BoxLabel style={{ fontWeight: 700 }}>태그 선택 (필수)</BoxLabel>
            <AddTagDiv>
              {selectTagList &&
                selectTagList.map((t, index) => (
                  <TagBox
                    key={index}
                    tagId={t}
                    tagMargin={"0px 6px"}
                    tagOnClick={() => {
                      setSelectTagList(selectTagList.filter((tl) => tl != t));
                    }}
                  ></TagBox>
                ))}
              {selectTagList && selectTagList.length < 4 && (
                <AddTagBox onClick={onClickAddTag}>+</AddTagBox>
              )}
            </AddTagDiv>
            <BoxLine />
            <BoxLabel>제목 작성 (선택)</BoxLabel>
            <InputTitle
              value={inputTitle}
              maxLength={80}
              placeholder={"제목을 작성해주세요"}
              rows={2}
              onChange={(e) => {
                setInputTitle(e.target.value);
              }}
            ></InputTitle>
            <BoxLine />
            <BoxLabel>내용 작성 (선택)</BoxLabel>
            <InputContent
              value={inputContent}
              maxLength={240}
              placeholder={"내용을 작성해주세요"}
              rows={5}
              onChange={(e) => {
                setInputContent(e.target.value);
              }}
            ></InputContent>
            <BoxLine />
            <BoxLabel>핀 추가 (선택)</BoxLabel>
            <PinGuide>
              사진을 선택하시고 + 버튼을 눌러 핀 위치를 지정해주세요
            </PinGuide>
            <SelectPhotoBox>
              <PhotoButton
                style={currentImg === 0 ? { opacity: 1 } : { opacity: 0.2 }}
                onClick={() => {
                  setCurrentImg(0);
                }}
              >
                사진 1
              </PhotoButton>
              {imageAsFile && imageAsFile.length > 1 && (
                <PhotoButton
                  style={currentImg === 1 ? { opacity: 1 } : { opacity: 0.2 }}
                  onClick={() => {
                    setCurrentImg(1);
                  }}
                >
                  사진 2
                </PhotoButton>
              )}
              {imageAsFile && imageAsFile.length > 2 && (
                <PhotoButton
                  style={currentImg === 2 ? { opacity: 1 } : { opacity: 0.2 }}
                  onClick={() => {
                    setCurrentImg(2);
                  }}
                >
                  사진 3
                </PhotoButton>
              )}
              {imageAsFile && imageAsFile.length > 3 && (
                <PhotoButton
                  style={currentImg === 3 ? { opacity: 1 } : { opacity: 0.2 }}
                  onClick={() => {
                    setCurrentImg(3);
                  }}
                >
                  사진 4
                </PhotoButton>
              )}
            </SelectPhotoBox>
            <PinControlDiv>
              {currentImg === 0 &&
                img1HasPin &&
                img1HasPin.map((p, index) => {
                  return (
                    <EditPinDiv key={index}>
                      <PinNameBox>
                        <PinLabel>핀 이름</PinLabel>
                        <PinInput
                          placeholder={"핀 이름을 입력해주세요"}
                          value={inputPinName[p]}
                          onChange={(event) =>
                            setInputPinName(
                              inputPinName.map((name, nameIndex) =>
                                nameIndex === p ? event.target.value : name
                              )
                            )
                          }
                        ></PinInput>
                      </PinNameBox>
                      <PinLinkBox>
                        <PinLabel>핀 링크</PinLabel>
                        <PinInput
                          placeholder={"핀 링크를 입력해주세요"}
                          value={inputPinLink[p]}
                          onChange={(event) =>
                            setInputPinLink(
                              inputPinLink.map((link, linkIndex) =>
                                linkIndex === p ? event.target.value : link
                              )
                            )
                          }
                        ></PinInput>
                      </PinLinkBox>
                      <PinNavBox>
                        <PinTagBox>
                          <PinIcon />
                          <PinTag>핀 {String.fromCharCode(65 + index)}</PinTag>
                        </PinTagBox>
                        <PinButtonBox>
                          <Button btnText={"위치변경"} btnHeight="28px" />
                          <Button
                            btnText={"핀 삭제"}
                            btnHeight="28px"
                            btnBgColor={color.red.dark}
                            btnTextColor={color.white.default}
                            btnBorderColor={color.red.dark}
                            btnMarginLeft={"0px"}
                            btnMarginRight={"0px"}
                            btnOnClick={() => {
                              setInputPinPosX(
                                inputPinPosX.map((e, index) =>
                                  index === p ? -1 : e
                                )
                              );
                              setInputPinPosY(
                                inputPinPosY.map((e, index) =>
                                  index === p ? -1 : e
                                )
                              );
                              setInputPinName(
                                inputPinName.map((e, index) =>
                                  index === p ? "" : e
                                )
                              );
                              setInputPinLink(
                                inputPinLink.map((e, index) =>
                                  index === p ? "" : e
                                )
                              );
                              setImg1HasPin(img1HasPin.filter((e) => e !== p));
                            }}
                          />
                        </PinButtonBox>
                      </PinNavBox>
                    </EditPinDiv>
                  );
                })}
              {currentImg === 1 &&
                img2HasPin &&
                img2HasPin.map((p, index) => {
                  return (
                    <EditPinDiv key={index}>
                      <PinNameBox>
                        <PinLabel>핀 이름</PinLabel>
                        <PinInput
                          placeholder={"핀 이름을 입력해주세요"}
                          value={inputPinName[p]}
                          onChange={(event) =>
                            setInputPinName(
                              inputPinName.map((name, nameIndex) =>
                                nameIndex === p ? event.target.value : name
                              )
                            )
                          }
                        ></PinInput>
                      </PinNameBox>
                      <PinLinkBox>
                        <PinLabel>핀 링크</PinLabel>
                        <PinInput
                          placeholder={"핀 링크를 입력해주세요"}
                          value={inputPinLink[p]}
                          onChange={(event) =>
                            setInputPinLink(
                              inputPinLink.map((link, linkIndex) =>
                                linkIndex === p ? event.target.value : link
                              )
                            )
                          }
                        ></PinInput>
                      </PinLinkBox>
                      <PinNavBox>
                        <PinTagBox>
                          <PinIcon />
                          <PinTag>핀 {String.fromCharCode(65 + index)}</PinTag>
                        </PinTagBox>
                        <PinButtonBox>
                          <Button btnText={"위치변경"} btnHeight="28px" />
                          <Button
                            btnText={"핀 삭제"}
                            btnHeight="28px"
                            btnBgColor={color.red.dark}
                            btnTextColor={color.white.default}
                            btnBorderColor={color.red.dark}
                            btnMarginLeft={"0px"}
                            btnMarginRight={"0px"}
                            btnOnClick={() => {
                              setInputPinPosX(
                                inputPinPosX.map((e, index) =>
                                  index === p ? -1 : e
                                )
                              );
                              setInputPinPosY(
                                inputPinPosY.map((e, index) =>
                                  index === p ? -1 : e
                                )
                              );
                              setInputPinName(
                                inputPinName.map((e, index) =>
                                  index === p ? "" : e
                                )
                              );
                              setInputPinLink(
                                inputPinLink.map((e, index) =>
                                  index === p ? "" : e
                                )
                              );
                              setImg2HasPin(img2HasPin.filter((e) => e !== p));
                            }}
                          />
                        </PinButtonBox>
                      </PinNavBox>
                    </EditPinDiv>
                  );
                })}
              {currentImg === 2 &&
                img3HasPin &&
                img3HasPin.map((p, index) => {
                  return (
                    <EditPinDiv key={index}>
                      <PinNameBox>
                        <PinLabel>핀 이름</PinLabel>
                        <PinInput
                          placeholder={"핀 이름을 입력해주세요"}
                          value={inputPinName[p]}
                          onChange={(event) =>
                            setInputPinName(
                              inputPinName.map((name, nameIndex) =>
                                nameIndex === p ? event.target.value : name
                              )
                            )
                          }
                        ></PinInput>
                      </PinNameBox>
                      <PinLinkBox>
                        <PinLabel>핀 링크</PinLabel>
                        <PinInput
                          placeholder={"핀 링크를 입력해주세요"}
                          value={inputPinLink[p]}
                          onChange={(event) =>
                            setInputPinLink(
                              inputPinLink.map((link, linkIndex) =>
                                linkIndex === p ? event.target.value : link
                              )
                            )
                          }
                        ></PinInput>
                      </PinLinkBox>
                      <PinNavBox>
                        <PinTagBox>
                          <PinIcon />
                          <PinTag>핀 {String.fromCharCode(65 + index)}</PinTag>
                        </PinTagBox>
                        <PinButtonBox>
                          <Button btnText={"위치변경"} btnHeight="28px" />
                          <Button
                            btnText={"핀 삭제"}
                            btnHeight="28px"
                            btnBgColor={color.red.dark}
                            btnTextColor={color.white.default}
                            btnBorderColor={color.red.dark}
                            btnMarginLeft={"0px"}
                            btnMarginRight={"0px"}
                            btnOnClick={() => {
                              setInputPinPosX(
                                inputPinPosX.map((e, index) =>
                                  index === p ? -1 : e
                                )
                              );
                              setInputPinPosY(
                                inputPinPosY.map((e, index) =>
                                  index === p ? -1 : e
                                )
                              );
                              setInputPinName(
                                inputPinName.map((e, index) =>
                                  index === p ? "" : e
                                )
                              );
                              setInputPinLink(
                                inputPinLink.map((e, index) =>
                                  index === p ? "" : e
                                )
                              );
                              setImg3HasPin(img3HasPin.filter((e) => e !== p));
                            }}
                          />
                        </PinButtonBox>
                      </PinNavBox>
                    </EditPinDiv>
                  );
                })}
              {currentImg === 3 &&
                img4HasPin &&
                img4HasPin.map((p, index) => {
                  return (
                    <EditPinDiv key={index}>
                      <PinNameBox>
                        <PinLabel>핀 이름</PinLabel>
                        <PinInput
                          placeholder={"핀 이름을 입력해주세요"}
                          value={inputPinName[p]}
                          onChange={(event) =>
                            setInputPinName(
                              inputPinName.map((name, nameIndex) =>
                                nameIndex === p ? event.target.value : name
                              )
                            )
                          }
                        ></PinInput>
                      </PinNameBox>
                      <PinLinkBox>
                        <PinLabel>핀 링크</PinLabel>
                        <PinInput
                          placeholder={"핀 링크를 입력해주세요"}
                          value={inputPinLink[p]}
                          onChange={(event) =>
                            setInputPinLink(
                              inputPinLink.map((link, linkIndex) =>
                                linkIndex === p ? event.target.value : link
                              )
                            )
                          }
                        ></PinInput>
                      </PinLinkBox>
                      <PinNavBox>
                        <PinTagBox>
                          <PinIcon />
                          <PinTag>핀 {String.fromCharCode(65 + index)}</PinTag>
                        </PinTagBox>
                        <PinButtonBox>
                          <Button btnText={"위치변경"} btnHeight="28px" />
                          <Button
                            btnText={"핀 삭제"}
                            btnHeight="28px"
                            btnBgColor={color.red.dark}
                            btnTextColor={color.white.default}
                            btnBorderColor={color.red.dark}
                            btnMarginLeft={"0px"}
                            btnMarginRight={"0px"}
                            btnOnClick={() => {
                              setInputPinPosX(
                                inputPinPosX.map((e, index) =>
                                  index === p ? -1 : e
                                )
                              );
                              setInputPinPosY(
                                inputPinPosY.map((e, index) =>
                                  index === p ? -1 : e
                                )
                              );
                              setInputPinName(
                                inputPinName.map((e, index) =>
                                  index === p ? "" : e
                                )
                              );
                              setInputPinLink(
                                inputPinLink.map((e, index) =>
                                  index === p ? "" : e
                                )
                              );
                              setImg4HasPin(img4HasPin.filter((e) => e !== p));
                            }}
                          />
                        </PinButtonBox>
                      </PinNavBox>
                    </EditPinDiv>
                  );
                })}
              {currentImg === 0 && img1HasPin && img1HasPin.length < 10 && (
                <AddPinButton onClick={onClickAddPin}>
                  <AddIconBox>
                    <Image src={"/assets/icons/plus_blue.png"} layout="fill" />
                  </AddIconBox>
                </AddPinButton>
              )}
              {currentImg === 1 && img2HasPin && img2HasPin.length < 10 && (
                <AddPinButton onClick={onClickAddPin}>
                  <AddIconBox>
                    <Image src={"/assets/icons/plus_blue.png"} layout="fill" />
                  </AddIconBox>
                </AddPinButton>
              )}
              {currentImg === 2 && img3HasPin && img3HasPin.length < 10 && (
                <AddPinButton onClick={onClickAddPin}>
                  <AddIconBox>
                    <Image src={"/assets/icons/plus_blue.png"} layout="fill" />
                  </AddIconBox>
                </AddPinButton>
              )}
              {currentImg === 3 && img4HasPin && img4HasPin.length < 10 && (
                <AddPinButton onClick={onClickAddPin}>
                  <AddIconBox>
                    <Image src={"/assets/icons/plus_blue.png"} layout="fill" />
                  </AddIconBox>
                </AddPinButton>
              )}
            </PinControlDiv>
          </InfoTop>
          <InfoBottom>
            <BoxLine />
            <InfoButtonBox>
              <Button
                btnOnClick={onClickMoveBefore}
                btnText={"이전"}
                btnMarginLeft="0"
                btnMarginRight="0"
                btnWidth="80px"
              />
              <RightButtonBox>
                <Button
                  btnText={"취소"}
                  btnHoverBgColor={color.red.default}
                  btnHoverBorderColor={color.red.default}
                  btnHoverTextColor={color.white.default}
                  btnMarginLeft="0"
                  btnMarginRight="0"
                  btnWidth="80px"
                  btnOnClick={() => {
                    if (
                      confirm(
                        "PINSET : 사진 등록을 취소하시겠습니까?\n확인을 누르시면 현재까지 작업이 사라집니다."
                      )
                    ) {
                      toggleSubmit();
                    } else {
                      return;
                    }
                  }}
                />
                <Button
                  btnOnClick={requestSubmitPost}
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
