import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 300px;
  height: 320px;
  display: flex;
  position: absolute;
  z-index: 10;
  flex-direction: column;
  align-items: center;
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
  cursor: pointer;
`;

const FollowingTitle = styled.div`
  display: flex;
  font-weight: bold;
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

const FollowingBox2 = styled.div`
  display: flex;
  margin: 10px 0px;
  width: 220px;
  justify-content: space-between;
  cursor: pointer;
`;

const FollowingNickname = styled.div`
  display: flex;
  /* width: 130px; */
  /* margin-right: 20px; */
`;

const FollowingPosts = styled.div`
  display: flex;
  color: ${color.gray.dark};
`;

const index = ({ toggleFollow, userListState, userList }) => {
  const router = useRouter();

  return (
    <Container>
      <Wrapper1>
        <FollowingTitle>
          {userListState === 1 && "팔로잉"}
          {userListState === 2 && "팔로워"}
        </FollowingTitle>
        <Xbutton onClick={toggleFollow}>
          <Image
            src="/assets/icons/x_mark.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </Xbutton>
      </Wrapper1>
      <Wrapper2>
        {userList &&
          userList.map((ul, index) => (
            <FollowingBox2
              key={index}
              onClick={() => {
                router.push(`/search/${ul.nickname}`);
                toggleFollow();
              }}
            >
              <FollowingNickname>{ul.nickname}</FollowingNickname>
              <FollowingPosts>0</FollowingPosts>
            </FollowingBox2>
          ))}
      </Wrapper2>
    </Container>
  );
};

export default index;
