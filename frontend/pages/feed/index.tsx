import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import dynamic from "next/dynamic";
import { GET_FEED } from "../api/post";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  padding-top: 82px;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1280px;
  /* width: 100%; */
`;

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/Egjs"),
  {
    ssr: false,
  }
);

const index = () => {
  const router = useRouter();

  const [feedData, setFeedData] = useState([]);
  const [feedApiState, setFeedApiState] = useState(false);

  useEffect(function mount() {
    const getFeedRequest = async () => {
      const result = await GET_FEED();

      if (result.status === 200) {
        // data.data 로 날아오는거 체크해보기
        console.log(result.data);
        if (result.data.data.length > 0) {
          console.log("피드내용 있음");
          setFeedApiState(true);
          setFeedData(result.data.data);
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

  return (
    <Container>
      <Wrapper>
        {feedData && feedData.length > 0 && (
          <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR>
        )}
      </Wrapper>
    </Container>
  );
};

export default index;
