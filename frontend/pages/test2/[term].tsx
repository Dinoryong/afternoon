import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import UserCurating from "../../components/UserCurating"
import { useRouter } from "next/router";

const Container = styled.div`
  position: relative;
  height: 100%;
  /* background-color: gray; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const index = () => {

  const router = useRouter();
  const routerQuery = router.query.term;


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
  };

  const [editState, setEditState] = useState(false);

  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(() => {
    document.body.style.overflow = editState ? "hidden" : "scroll";
  }, [editState]);

  useEffect(function mount() {
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
    <>
      <Container>
        <UserCurating
          userData={userData}
          // setEditState={setEditState}
          routerQuery={routerQuery}
        ></UserCurating>
      </Container>
    </>
  );
};

export default index;
