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

const index = () => {
  const router = useRouter();

  const [postData, setPostData] = useState([]);
  const [feedApiState, setFeedApiState] = useState(false);

  const DynamicComponentWithNoSSR = dynamic(
    () => import("../../components/Egjs"),
    {
      ssr: false,
    }
  );

  useEffect(() => {
    const RequestGetFeed = async () => {
      const getFeedConfig = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
        },
      };

      const result = await GET_FEED(getFeedConfig);
      //replace_console_log(result);

      if (result.status === 200) {
        if (result.data && result.data.length > 0) {
          setPostData(result.data);
        } else {
          router.push("/prefer");
        }
      }
    };

    if (!feedApiState) {
      RequestGetFeed();
      setFeedApiState(true);
    }
  });

  return (
    <Container>
      <Wrapper>
        {postData && postData.length > 0 && (
          <DynamicComponentWithNoSSR
            postData={postData}
          ></DynamicComponentWithNoSSR>
        )}
      </Wrapper>
    </Container>
  );
};

export default index;
