import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ProfileTop from "../../components/ProfileTop";
import EditModal from "../../components/ProfileTop/EditModal";
import FollowingList from "../../components/ProfileTop/FollowingList";
import { GET_MY_INFO } from "../api/profile";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ModalFrame = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;
`;

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
  /* height: 800px; */
`;

const DynamicDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1280px;
  margin-top: 60px;
  /* width: 100%; */
`;

const useCounter = () => {
  const loginState = useSelector((state) => state.login.loginState);

  return { loginState };
};

const index = () => {
  const profileData = {
    profileImg:
      "https://images.unsplash.com/photo-1611759931890-db159d745102?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80",
    profileName: "구영지",
    profileBox:
      "보이는 가치를 사랑의 끓는다. 굳세게 산야에  품었기 이상의 속잎나고, 그리하였는가? 타오르고 못하다 가치를 귀는 없는 속에서 따뜻한 보이는 내는 쓸쓸하랴? 인간은 가슴에 새 그들에게 자신과 대한 길지 것이다. 날카로우나 얼마나 용감 그리하였는가? 타오르고 최대 3줄 적당",
    profileFollowing: "159",
    profileFollwer: "143534",
    profileMyposts: "376",
    profileLikes: "100",
    profileTags: [1, 2, 3, 4, 7, 8, 5, 9, 13, 23, 15, 17, 18],
    profileCollections: "13",
  };

  const followingData = {
    followingImg:
      "https://images.unsplash.com/photo-1612536295020-34428662e57d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    followingName: "이민트",
    followingNickname: "민트프라푸치노",
    followingPosts: "356",
  };
 
  const [editState, setEditState] = useState(false);
  const [infoState, setInfoState] = useState(false);

  const [followingState, setFollowingState] = useState(false);
  // const [followerState, setFollowerState] = useStae(false);
  
  const [tabState, setTabState] = useState(0);

  const [postData, setPostData] = useState([]);
  const [SearchApiState, setSearchApiState] = useState(false);

  const router = useRouter();
  const { loginState } = useCounter();

  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(() => {
    document.body.style.overflow = editState ? "hidden" : "scroll";
  }, [editState]);

  useEffect(function mount() {
    if (!loginState) {
      router.push("/");
    }

    const getSearchRequest = async () => {
      const result = await GET_MY_INFO();

      if (result.status === 200) {
        if (result.data.writtenPosts) {
          console.log(result.data);
          setSearchApiState(true);
          setPostData(result.data.writtenPosts);
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    };

    if (!SearchApiState) {
      getSearchRequest();
    }

    const getMyInfo = async () => {
      const result = await GET_MY_INFO();
      if (result.status === 200) {
        setInfoState(true);
      }
    };

    if (!infoState) {
      getMyInfo();
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
      {editState && (
        <ModalFrame
          onClick={() => {
            setEditState(false);
          }}
        >
          <EditModal setEditState={setEditState}></EditModal>
        </ModalFrame>
      )}
      {followingState && (
        <ModalFrame
          style={{ position: "fixed", height: windowHeight }}
          onClick={() => {
            setFollowingState(false);
          }}
        >
          <FollowingList
            setFollowingState={setFollowingState}
            followingData={followingData}
          ></FollowingList>
        </ModalFrame>
      )}
      {loginState && (
        <>
          <TopWrapper>
            <ProfileTop
              profileData={profileData}
              setEditState={setEditState}
              windowHeight={windowHeight}
              setTabState={setTabState}
              setFollowingState={setFollowingState}
              tabState={tabState}
            ></ProfileTop>
          </TopWrapper>
          <DynamicDiv>
            {postData && postData.length > 0 && (
              <DynamicComponentWithNoSSR
                postData={postData}
              ></DynamicComponentWithNoSSR>
            )}
          </DynamicDiv>
        </>
      )}
    </Container>
  );
};

export default index;
