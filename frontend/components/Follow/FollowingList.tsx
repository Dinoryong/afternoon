import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import { useDispatch } from "react-redux";
import Image from "next/image";

const Container = styled.div`
  width: 300px;
  height: 320px;
  display: flex;
  position: absolute;
  z-index: 3;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 10px;
  font-size: 15px;
`;

const Wrapper1 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 15px;
`;

const Xbutton = styled.div`
  width: 17px;
  height: 17px;
  background-color: "transparent";
  position: relative;
  /* top: 22px;
  right: 22px; */
  cursor: pointer;
`;

const FollowingTitle = styled.div`
  display: flex;
  font-weight: bold;
  /* position: absolute; */
  /* top: 22px;
  left: 22px; */
`;

const Wrapper2 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 0px 20px;
  overflow-y: scroll;
  margin-bottom: 20px;
`;

// const FollowingBox1 = styled.div`
//   display: flex;
//   position: relative;
//   width: 30px;
//   height: 30px;
//   margin-right: 20px;
// `;

const FollowingBox2 = styled.div`
  display: flex;
  margin: 10px 0px;
  width: 220px;
  justify-content: space-between;
  /* margin-top: 20px; */
  /* margin-left: 10px; */
  /* scroll-behavior: */
  /* justify-content: flex-start; */
`;

// const FollowingName = styled.div`
//   display: flex;
//   /* width: 100px; */
//   margin-right: 10px;
// `;

const FollowingNickname = styled.div`
  display: flex;
  /* width: 130px; */
  /* margin-right: 20px; */
`;

const FollowingPosts = styled.div`
  display: flex;
  color: ${color.gray.dark}
  /* width: 70px; */
  /* width: 70px; */
  /* height: 20px; */
  /* margin-left: 20px; */
`;

const useCounter = () => {
  const dispatch = useDispatch();
  const toggle = async () => {
    await dispatch({ type: "TOGGLE" });
  };
  return { toggle };
};

const FollowingList = ({ setFollowingState, followingData }) => {
  const {
    /* followingImg, */
    // followingName,
    followingNickname,
    followingPosts,
  } = followingData;

  const { toggle } = useCounter();

  return (
    <Container>
      <Wrapper1>
        <FollowingTitle>팔로잉</FollowingTitle>
        <Xbutton
          onClick={() => {
            setFollowingState(false);
          }}
        >
          <Image
            src="/assets/icons/x_mark.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </Xbutton>
      </Wrapper1>
      <Wrapper2>
        <FollowingBox2>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
        <FollowingBox2>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
        <FollowingBox2>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
        <FollowingBox2>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
        <FollowingBox2>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
        <FollowingBox2>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
        <FollowingBox2>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
        <FollowingBox2>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
      </Wrapper2>
    </Container>
  );
};

export default FollowingList;
