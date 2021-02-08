import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import TagCurating from "../../components/TagCurating";
import UserCurating from "../../components/UserCurating";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { GET_SEARCH } from "../api/search";
import TagList from "../../data/TagList";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 62px;
  width: 100%;
  /* height: 1000px; */
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 1280px;
  margin-top: 60px;
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
  const router = useRouter();
  const routerQuery = router.query.term;

  const [postData, setPostData] = useState([]);
  const [isTag, setIsTag] = useState(0);
  const [isExist, setIsExist] = useState(false);
  const [SearchApiState, setSearchApiState] = useState(false);

  const { loginState } = useCounter();

  const isTagCheck = () => {
    if (TagList.findIndex((t) => t.tagTitle === routerQuery) >= 0) {
      setIsTag(1);
    } else {
      setIsTag(2);
    }
  };

  const DynamicComponentWithNoSSR = dynamic(
    () => import("../../components/Egjs"),
    {
      ssr: false,
    }
  );

  useEffect(() => {
    setPostData([]);
    setSearchApiState(false);
    setIsExist(false);
  }, [routerQuery]);

  useEffect(function mount() {
    isTagCheck();

    const getSearchResult = async () => {
      const result = await GET_SEARCH(routerQuery);

      if (result.status === 200) {
        // data.data 로 날아오는거 체크해보기
        // console.log(result.data);
        setIsExist(true);
        if (result.data.writtenPosts.length > 0) {
          console.log("검색어 게시글 있음");
          setSearchApiState(true);
          if (loginState) {
            setPostData(result.data.writtenPosts);
          } else {
            setPostData(result.data.writtenPosts.slice(0, 20));
          }
        } else {
          console.log("검색어 게시글 없음");
        }
      } else if (result.status === 204) {
        setIsExist(false);
        console.log("검색어 매칭 없음");
      }
    };

    if (!SearchApiState) {
      getSearchResult();
    }
  });

  const tagData = {
    tagTitle: "고양이방",
    tagText:
      "고양이 주인의 선택을 받은 집사들이 정성껏 마련한 고양이방을 공유합니다. 당신의 주인님이 좋아할만한 공간도 여기에서 찾을 수 있어요!",
    tagContributions: "15,600,000",
    tagUsers: "250,000",
    tagTopUser: "Frappu_dinoR",
    tagTopPost: "페이지 내의 링크 띄워주기",
    tagTopContributer: "lovegodsungbi",
  };

  const userData = {
    userImg:
      "https://images.unsplash.com/photo-1611759931890-db159d745102?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80",
    userName: "구영지",
    userBox:
      "보이는 가치를 사랑의 끓는다. 굳세게 산야에  품었기 이상의 속잎나고, 그리하였는가? 타오르고 못하다 가치를 귀는 없는 속에서 따뜻한 보이는 내는 쓸쓸하랴? 인간은 가슴에 새 그들에게 자신과 대한 길지 것이다. 날카로우나 얼마나 용감 그리하였는가? 타오르고 최대 3줄 적당",
    userFollowing: "159",
    userFollower: "143534",
    userPosts: "376",
    userLikes: "100",
    userTags: [1, 2, 3, 4, 7, 8, 5, 9, 13, 23, 15, 17, 18],
    userCollections: "13",
    accountsId: 24,
  };

  return (
    <Container>
      {isExist && (
        <Wrapper>
          {isTag && isTag == 1 && (
            <TagCurating
              tagData={tagData}
              routerQuery={routerQuery}
            ></TagCurating>
          )}
          {isTag && isTag == 2 && (
            <UserCurating
              userData={userData}
              routerQuery={routerQuery}
            ></UserCurating>
          )}
          <DynamicDiv>
            {postData && postData.length > 0 && (
              <DynamicComponentWithNoSSR
                postData={postData}
              ></DynamicComponentWithNoSSR>
            )}
          </DynamicDiv>
        </Wrapper>
      )}
    </Container>
  );
};

export default index;
