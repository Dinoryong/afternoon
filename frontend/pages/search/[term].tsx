import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import TagsCurating from "../../components/TagCurating";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { GET_FEED } from "../api/post";

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

const index = () => {
  const router = useRouter();
  const routerQuery = router.query.term;

  const [postData, setPostData] = useState([]);
  const [feedApiState, setFeedApiState] = useState(false);

  const DynamicComponentWithNoSSR = dynamic(
    () => import("../../components/Egjs"),
    {
      ssr: false,
    }
  );

  useEffect(function mount() {
    const getFeedRequest = async () => {
      const result = await GET_FEED();

      if (result.status === 200) {
        // data.data 로 날아오는거 체크해보기
        // console.log(result.data);
        if (result.data.data.length > 0) {
          console.log("피드내용 있음");
          setFeedApiState(true);
          setPostData(result.data.data);
        } else {
          router.push("/prefer");
          console.log("피드내용 없음");
        }
      }
    };

    if (!feedApiState) {
      getFeedRequest();
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

  return (
    <Container>
      {/* <div>{routerQuery}</div> */}
      <Wrapper>
        <TagsCurating tagData={tagData}></TagsCurating>
        <DynamicDiv>
          {postData && postData.length > 0 && (
            <DynamicComponentWithNoSSR
              postData={postData}
            ></DynamicComponentWithNoSSR>
          )}
        </DynamicDiv>
      </Wrapper>
    </Container>
  );
};

export default index;
