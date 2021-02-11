import React, { useState } from "react";
import styled from "@emotion/styled";
import { GridLayout } from "@egjs/react-infinitegrid";
import color from "../../styles/theme";
import { useSelector, useDispatch } from "react-redux";

const Item = styled.div`
  width: 355px;
  cursor: zoom-in;
  background-color: transparent;
`;

const Thumbnail = styled.div`
  position: relative;
  display: flex;
  max-height: 1000px;
  background-color: transparent;
  overflow: hidden;
  border-radius: 8px;
  align-items: flex-end;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 8px;
  background-color: transparent;
  -webkit-user-drag: none;
`;

const OpacityFrame = styled.div`
  position: absolute;
  display: flex;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  border-radius: 8px;
  opacity: 0;
  :hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }
  color: white;
  align-items: flex-end;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`;

const Title = styled.div`
  color: ${color.gray.default};
  font-size: 15px;
  font-weight: 300;
`;

const Writer = styled.div`
  color: ${color.gray.light};
  font-size: 18px;
  font-weight: 500;
`;

const ItemEl = ({ id, src, writer, title, togglePost }) => (
  <Item
    onClick={() => {
      togglePost(id);
    }}
  >
    <Thumbnail>
      <OpacityFrame>
        <Info>
          <Writer>{writer}</Writer>
          {title && title !== "" && <Title>{title}</Title>}
        </Info>
      </OpacityFrame>
      <Img src={src}></Img>
    </Thumbnail>
  </Item>
);

const useCounter = () => {
  const loginState = useSelector((state) => state.login.loginState);

  const dispatch = useDispatch();

  const toggle = async () => {
    await dispatch({ type: "TOGGLE" });
  };

  const togglePost = async (toggleId) => {
    await dispatch({ type: "TOGGLE_POST", toggleId });
  };

  return { loginState, toggle, togglePost };
};

const index = ({ postData }) => {
  const [appendList, setAppendList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [appendAble, setAppendAble] = useState(true);

  const { loginState, toggle, togglePost } = useCounter();

  const DIVIDE_COUNT = 10;

  return (
    <>
      <GridLayout
        tag="div"
        threshold={100}
        options={{
          horizontal: false,
        }}
        layoutOptions={{ margin: 20, align: "center" }}
        onAppend={() => {
          if (!isEnd && appendAble && appendList.length <= postData.length) {
            if (startIndex + DIVIDE_COUNT < postData.length) {
              const cur = postData.slice(startIndex, startIndex + DIVIDE_COUNT);
              setAppendList(appendList.concat(cur));
              setStartIndex(startIndex + DIVIDE_COUNT);
            } else {
              setIsEnd(true);
              const cur = postData.slice(startIndex);
              setAppendList(appendList.concat(cur));
            }
          } else {
            if (appendAble) {
              setAppendAble(false);
            }
          }
        }}
        onLayoutComplete={(e) => {
          if (!loginState && isEnd) {
            toggle();
          }
        }}
      >
        {appendList &&
          appendList.map((al, index) => {
            return (
              <ItemEl
                key={index}
                id={al.postsId}
                src={al.postsPhoto}
                writer={al.postsWriter}
                title={al.postsTitle}
                togglePost={togglePost}
              />
            );
          })}
      </GridLayout>
    </>
  );
};

export default index;
