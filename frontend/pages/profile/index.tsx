import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ProfileTop from "../../components/ProfileTop";
import { GET_MY_INFO } from "../api/profile";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 122px;
  @media only screen and (max-width: 768px) {
    padding-top: 72px;
  }
  /* height: 800px; */
`;

const DynamicDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
  max-width: 1280px;
  @media only screen and (max-width: 768px) {
    margin-top: 20px;
  }
  @media only screen and (min-width: 768px) {
    margin-top: 40px;
  }
  @media only screen and (min-width: 1280px) {
    margin-top: 60px;
  }
`;

const NullPostDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;
  font-size: 18px;
`;

const useStore = () => {
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );

  return {
    loginState,
  };
};

const index = () => {
  const [infoState, setInfoState] = useState(0);

  const [tabState, setTabState] = useState(0);

  const [profileData, setProfileData] = useState({});
  const [postData, setPostData] = useState([]);
  const [likeData, setLikeData] = useState([]);
  const [getMyInfoApiState, setgetMyInfoApiState] = useState(false);

  const router = useRouter();
  const { loginState } = useStore();

  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(() => {
    if (!loginState) {
      router.push("/");
    }

    const requestGetMyInfo = async () => {
      const getMyInfoConfig = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
        },
      };

      const result = await GET_MY_INFO(getMyInfoConfig);
      //replace_console_log(result);

      if (result.status === 200) {
        setProfileData(result.data);
        setPostData(result.data.writtenPosts);
        setLikeData(result.data.likesPosts);
        setInfoState(2);
      } else {
        router.push("/");
      }
    };

    if (!getMyInfoApiState) {
      setgetMyInfoApiState(true);
      setInfoState(1);
      requestGetMyInfo();
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

  const DynamicComponentWithNoSSR = dynamic(
    () => import("../../components/Egjs"),
    {
      ssr: false,
    }
  );

  return (
    <Container style={{ height: windowHeight }}>
      {infoState !== 0 &&
        infoState === 2 &&
        profileData &&
        Object.keys(profileData).length > 0 && (
          <>
            <TopWrapper>
              <ProfileTop
                profileData={profileData}
                setTabState={setTabState}
                tabState={tabState}
              />
            </TopWrapper>
          </>
        )}
      {profileData && Object.keys(profileData).length > 0 && tabState === 0 && (
        <DynamicDiv>
          {postData && postData.length > 0 && (
            <DynamicComponentWithNoSSR
              postData={postData}
            ></DynamicComponentWithNoSSR>
          )}
          {postData && postData.length === 0 && (
            <NullPostDiv>작성하신 게시물이 없어요</NullPostDiv>
          )}
        </DynamicDiv>
      )}
      {profileData && Object.keys(profileData).length > 0 && tabState === 1 && (
        <DynamicDiv>
          {likeData && likeData.length > 0 && (
            <DynamicComponentWithNoSSR
              postData={likeData}
            ></DynamicComponentWithNoSSR>
          )}
          {likeData && likeData.length === 0 && (
            <NullPostDiv>좋아요한 게시물이 없어요</NullPostDiv>
          )}
        </DynamicDiv>
      )}
    </Container>
  );
};

export default index;
