import React, { useState } from "react";
import styled from "@emotion/styled";
// import { GridLayout } from "@egjs/react-layout";
import { GridLayout } from "@egjs/react-infinitegrid";
import { start } from "repl";

const Item = styled.div`
  width: 355px;
  opacity: 1;
  transition: all 0.35s;
  cursor: zoom-in;
`;

const Thumbnail = styled.div`
  max-height: 1000px;
  overflow: hidden;
  border-radius: 8px;
  height: max-content;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 8px;
  -webkit-user-drag: none;
`;

const ItemEl = ({ id, src }) => (
  <Item
    onClick={() => {
      console.log(id);
    }}
  >
    <Thumbnail>
      <Img src={src}></Img>
    </Thumbnail>
  </Item>
);

const index = ({ postData }) => {
  const [appendList, setAppendList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [appendAble, setAppendAble] = useState(true);

  const DIVIDE_COUNT = 20;

  return (
    <GridLayout
      tag="div"
      threshold={100}
      options={{ horizontal: false, transitionDuration: 0.3 }}
      layoutOptions={{ margin: 20, align: "center" }}
      onAppend={({ startLoading }) => {
        startLoading();
        if (!isEnd && appendList.length <= postData.length) {
          if (startIndex + DIVIDE_COUNT < postData.length) {
            const cur = postData.slice(startIndex, startIndex + DIVIDE_COUNT);
            setAppendList(appendList.concat(cur));
            setStartIndex(startIndex + DIVIDE_COUNT);
          } else {
            setIsEnd(true);
            const cur = postData.slice(startIndex);
            setAppendList(appendList.concat(cur));
          }
          console.log(appendList);
        } else {
          if (appendAble) {
            setAppendAble(false);
          }
        }
      }}
      // onLayoutComplete={(e) => console.log("layoutComplete")}
      // onImageError={(e) => console.log("imageError")}
    >
      {appendList &&
        appendList.map((f, index) => {
          return <ItemEl key={index} id={f.postId} src={f.postsPhotos[0]} />;
        })}
    </GridLayout>
  );
};

export default index;
