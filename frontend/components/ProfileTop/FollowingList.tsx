import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import { useDispatch } from "react-redux";
import Image from "next/image";

const Container = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  position: absolute;
  z-index: 3;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.92);
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 35px;
  padding-right: 35px;
  border-radius: 10px;
  font-size: 15px;
`;

const Wrapper1 = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Xbutton = styled.div`
  width: 17px;
  height: 17px;
  background-color: "transparent";
  position: absolute;
  top: 22px;
  right: 22px;
  cursor: pointer;
`;

const FollowingTitle = styled.div`
  display: flex;
  font-weight: bold;
  position: absolute;
  top: 22px;
  left: 22px;
`;

const Wrapper2 = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const FollowingBox1 = styled.div`
  display: flex;
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 30px;
`;

const FollowingBox2 = styled.div`
  display: flex;
  /* margin-left: 5px; */
  /* width: 300px; */
  justify-content: space-between;
  padding-top: 7px;
  /* align-content: center; */
`;

const FollowingName = styled.div`
  display: flex;
  /* width: 100px; */
  margin-right: 10px;
`;

const FollowingNickname = styled.div`
  display: flex;
  /* width: 100px; */
  /* height: 20px; */
  /* margin-top: 15px;
  margin-bottom: 5px; */
  margin-right: 10px; 
`;

const FollowingPosts = styled.div`
  display: flex;
  /* width: 70px; */
  /* height: 20px; */
  margin-right: 10px;
`;

const useCounter = () => {
  const dispatch = useDispatch();
  const toggle = async () => {
    await dispatch({ type: "TOGGLE" });
  };
  return { toggle };
};

const FollowingList = ({setFollowingState, followingData}) => {
  const {
    followingImg,
    followingName,
    followingNickname,
    followingPosts,
  } = followingData;

  const { toggle } = useCounter();

  return (
    <Container>
      <Wrapper1>
        <FollowingTitle>profileName님의 팔로잉리스트</FollowingTitle>
        <Xbutton onClick={()=>{setFollowingState(false)}}>
          <Image
            src="/assets/icons/x_mark.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </Xbutton>
      </Wrapper1>
      <Wrapper2>
        <FollowingBox1>
          <Image
            className="next_border_image circle"
            src={followingImg}
            layout="fill"
            objectFit="cover"
          ></Image>
        </FollowingBox1>
        <FollowingBox2>
          <FollowingName>{followingName}</FollowingName>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
      </Wrapper2>
      <Wrapper2>
        <FollowingBox1>
          <Image
            className="next_border_image circle"
            src={followingImg}
            layout="fill"
            objectFit="cover"
          ></Image>
        </FollowingBox1>
        <FollowingBox2>
          <FollowingName>{followingName}</FollowingName>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
      </Wrapper2>
      <Wrapper2>
        <FollowingBox1>
          <Image
            className="next_border_image circle"
            src={followingImg}
            layout="fill"
            objectFit="cover"
          ></Image>
        </FollowingBox1>
        <FollowingBox2>
          <FollowingName>{followingName}</FollowingName>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
      </Wrapper2>
      <Wrapper2>
        <FollowingBox1>
          <Image
            className="next_border_image circle"
            src={followingImg}
            layout="fill"
            objectFit="cover"
          ></Image>
        </FollowingBox1>
        <FollowingBox2>
          <FollowingName>{followingName}</FollowingName>
          <FollowingNickname>{followingNickname}</FollowingNickname>
          <FollowingPosts>{followingPosts}</FollowingPosts>
        </FollowingBox2>
      </Wrapper2>
    </Container>
  );
};

export default FollowingList;
