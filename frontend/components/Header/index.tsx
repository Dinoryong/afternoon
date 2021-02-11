import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useRouter } from "next/router";
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";
import LoginModal from "../LoginModal";
import SubmitModal from "../SubmitModal";
import PostDetail from "../PostDetail";

const Container = styled.div`
  position: fixed;
  z-index: 10;
  justify-content: center;
  display: flex;
  height: 62px;
  width: 100%;
  font-size: 14px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(1, 0, 0, 0.1);
  transition: all 0.3s;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 1280px; */
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

const ModalFrame = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 3;
`;

const CloseBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: zoom-out;
`;

const useStore = () => {
  const isShown = useSelector((state: RootStateOrAny) => state.login.isShown);
  const postShown = useSelector(
    (state: RootStateOrAny) => state.post.postShown
  );
  const submitShown = useSelector(
    (state: RootStateOrAny) => state.submit.submitShown
  );
  const editShown = useSelector(
    (state: RootStateOrAny) => state.user.editShown
  );
  const followShown = useSelector(
    (state: RootStateOrAny) => state.user.followShown
  );

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };
  const togglePost = async () => {
    dispatch({ type: "TOGGLE_POST" });
  };
  const toggleSubmit = async () => {
    dispatch({ type: "TOGGLE_SUBMIT" });
  };
  const toggleEdit = async () => {
    dispatch({ type: "TOGGLE_EDIT" });
  };
  const toggleFollow = async () => {
    dispatch({ type: "TOGGLE_FOLLOW" });
  };

  return {
    toggleSubmit,
    toggleEdit,
    toggleFollow,
    submitShown,
    editShown,
    followShown,
    isShown,
    toggle,
    togglePost,
    postShown,
  };
};

const index = () => {
  const router = useRouter();
  const routerPath = router.pathname;
  const {
    toggleSubmit,
    toggleEdit,
    toggleFollow,
    submitShown,
    editShown,
    followShown,
    isShown,
    toggle,
    togglePost,
    postShown,
  } = useStore();

  const [inputFocus, setInputFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [windowWidth, setWindowWidth] = useState<number>();
  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", resizeHandler);

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
    };

    return cleanup;
  });

  useEffect(() => {
    document.body.style.overflow =
      isShown || submitShown || inputFocus || postShown ? "hidden" : "scroll";
  }, [isShown, submitShown, inputFocus, postShown]);

  const containerStyle = {
    display: routerPath === "/signup" ? "none" : "flex",
    boxShadow:
      (routerPath === "/" || routerPath === "/home") && !inputFocus
        ? "none"
        : "0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(1, 0, 0, 0.1)",
    backgroundColor:
      (routerPath === "/" || routerPath === "/home") && !inputFocus
        ? "rgba(255,255,255,0)"
        : "rgba(255,255,255,1)",
  };

  const onClickSubmitBg = () => {
    if (
      confirm(
        "PINSET : 사진 등록을 취소하시겠습니까?\n확인을 누르시면 현재까지 작업이 사라집니다."
      )
    ) {
      toggleSubmit();
    } else {
      return;
    }
  };

  return (
    <>
      {inputFocus && (
        <ModalFrame
          onClick={() => {
            setInputFocus(false);
          }}
          style={{ position: "fixed", height: windowHeight }}
        />
      )}
      <Container style={containerStyle}>
        {editShown && (
          <ModalFrame style={{ height: windowHeight }}>
            <CloseBg onClick={toggleEdit} />
          </ModalFrame>
        )}
        {followShown && (
          <ModalFrame style={{ height: windowHeight }}>
            <CloseBg onClick={toggleFollow} />
          </ModalFrame>
        )}
        {postShown && (
          <ModalFrame style={{ height: windowHeight }}>
            <CloseBg onClick={togglePost} />
            <PostDetail windowWidth={windowWidth} windowHeight={windowHeight} />
          </ModalFrame>
        )}
        {isShown && (
          <ModalFrame style={{ height: windowHeight }}>
            <CloseBg onClick={toggle} />
            <LoginModal />
          </ModalFrame>
        )}
        {submitShown && (
          <ModalFrame style={{ height: windowHeight }}>
            <CloseBg onClick={onClickSubmitBg} />
            <SubmitModal
              windowWidth={windowWidth}
              windowHeight={windowHeight}
            />
          </ModalFrame>
        )}
        <Wrapper>
          <HeaderLeft
            router={router}
            routerPath={routerPath}
            setInputFocus={setInputFocus}
            inputFocus={inputFocus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <HeaderCenter
            routerPath={routerPath}
            inputFocus={inputFocus}
            setInputFocus={setInputFocus}
          />
          <HeaderRight
            router={router}
            routerPath={routerPath}
            inputFocus={inputFocus}
            setInputFocus={setInputFocus}
          />
        </Wrapper>
      </Container>
    </>
  );
};

export default index;
