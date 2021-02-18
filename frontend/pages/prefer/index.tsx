import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "../../components/Button";
import color from "../../styles/theme";
import Image from "next/image";
import PreferTags from "../../components/PreferTags";
import { ADD_TAGS } from "../api/profile";
import { useRouter } from "next/router";
import { GET_FEED } from "../api/post";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 62px;
  width: 100%;
  min-height: 600px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 1000px;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 20px;
`;

const InnerBox1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const InnerBox2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 15px;
  justify-content: center;
  align-items: center;
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* justify-content: space-between; */
  height: 100%;
  overflow-y: scroll;
`;

const BottomBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 60px;
  margin-top: 20px;
`;

const index = () => {
  const router = useRouter();

  const [windowHeight, setWindowHeight] = useState<number>();
  const [windowNickname, setWindowNickname] = useState("");

  const [selectTags, setSelectTags] = useState([]);
  const [feedApiState, setFeedApiState] = useState(false);

  const [feedDataState, setFeedDataState] = useState(0);

  const requestAddTags = async () => {
    const addTagsReq = { tags: selectTags };
    const headerConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    };

    const result = await ADD_TAGS(addTagsReq, headerConfig);
    //replace_console_log(result);

    if (result.status === 200) {
      router.push("/feed");
    }
  };

  useEffect(() => {
    if (windowNickname === "") {
      setWindowNickname(window.localStorage.getItem("accountNickname"));
    }

    const RequestGetFeed = async () => {
      const getFeedConfig = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
        },
      };

      const result = await GET_FEED(getFeedConfig);
      //replace_console_log(result);

      if (result.status === 200) {
        if (result.data.length > 0) {
          setFeedDataState(1);
          router.push("/feed");
        } else {
          setFeedDataState(2);
        }
      }
    };

    if (!feedApiState) {
      RequestGetFeed();
      setFeedApiState(true);
    }

    const resizeHandler = () => {
      setWindowHeight(window.innerHeight);
    };

    resizeHandler();

    window.addEventListener("resize", resizeHandler);

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
    };

    return cleanup;
  });
  return (
    <Container style={{ height: windowHeight }}>
      {feedDataState === 2 && (
        <Wrapper>
          <TopBox>
            <InnerBox1>
              이런..! {windowNickname}님의 피드에 표시할 내용이 없어요.
            </InnerBox1>
            <InnerBox2>
              {windowNickname}님의 피드에 표시할 관심태그를 선택해주세요.
            </InnerBox2>
            <InnerBox2>
              또는 검색바에서 사용자를 검색 후 팔로잉 해주세요.
            </InnerBox2>
          </TopBox>
          <MiddleBox>
            <PreferTags
              setSelectTags={setSelectTags}
              selectTags={selectTags}
            ></PreferTags>
          </MiddleBox>
          <BottomBox>
            <Button
              btnBgColor={
                selectTags.length > 0 ? color.red.light : color.gray.default
              }
              btnWidth="150px"
              btnText={`관심태그 ${selectTags.length}개 선택`}
              btnTextColor={color.white.default}
              btnHeight="40px"
              btnFontSize="15px"
              btnFontWeight={700}
              btnBorderColor="transparent"
              btnHoverBorderColor="transparent"
              btnHoverBgColor={
                selectTags.length > 0 ? color.red.dark : color.gray.default
              }
              btnHoverTextColor={color.white.default}
              btnOnClick={requestAddTags}
            />
          </BottomBox>
        </Wrapper>
      )}
    </Container>
  );
};

export default index;
