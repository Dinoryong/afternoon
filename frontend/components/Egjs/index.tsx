import React, { useState } from "react";
import styled from "@emotion/styled";
// import { GridLayout } from "@egjs/react-layout";
import { GridLayout } from "@egjs/react-infinitegrid";

const Item = styled.div`
  width: 355px;
  opacity: 1;
  transition: all 0.35s;
`;

const Thumbnail = styled.div`
  max-height: 1000px;
  overflow: hidden;
  border-radius: 8px;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const ItemEl = ({ src }) => (
  <Item>
    <Thumbnail>
      <Img src={src}></Img>
    </Thumbnail>
  </Item>
);

const index = () => {
  const [testList, setTestList] = useState<any>([]);

  return (
    <GridLayout
      tag="div"
      threshold={100}
      options={{ horizontal: false }}
      layoutOptions={{ margin: 20, align: "center" }}
      onAppend={({ startLoading }) => {
        startLoading();
        const itemList = [];
        for (var i = 0; i < 24; i++) {
          itemList.push(
            <ItemEl src={`/assets/images/home_bg_` + (i % 4) + `.jpg`} />
          );
        }
        setTestList((testList) => [...testList, itemList]);
        console.log(testList);
      }}
      onLayoutComplete={(e) => console.log("layoutComplete")}
      onImageError={(e) => console.log("imageError")}
    >
      {testList.map((tl) => {
        return tl;
      })}
    </GridLayout>
  );
};

export default index;
