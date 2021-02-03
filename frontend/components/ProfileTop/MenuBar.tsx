import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";

const MyPost = styled.div`
  width: 200px;
`;

const MyLikes = styled.div`
  width: 200px;
`;

const MyCollections = styled.div`
  width: 200px;
`;

const MenuBar = ({ profileMyposts, profileLikes, profileCollections }) => {
  const postString = "게시물 " + profileMyposts;
  const likesString = "좋아요 " + profileLikes;
  const collectionsString = "컬렉션 " + profileCollections;

  return (
    <>
      <MyPost>
        <Button
          btnWidth="190px"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText={postString}
          btnTextColor={color.gray.default}
          btnFontSize="20px"
          btnBorderColor="transparent"
          btnHoverBorderColor="transparent"
          btnHoverTextColor="black"
        />
      </MyPost>
      <MyLikes>
        <Button
          btnWidth="190px"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText={likesString}
          btnTextColor={color.gray.default}
          btnFontSize="20px"
          btnBorderColor="transparent"
          btnHoverBorderColor="transparent"
          btnHoverTextColor="black"
        />
      </MyLikes>
      <MyCollections>
        <Button
          btnWidth="190px"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText={collectionsString}
          btnTextColor={color.gray.default}
          btnFontSize="20px"
          btnBorderColor="transparent"
          btnHoverBorderColor="transparent"
          btnHoverTextColor="black"
        />
      </MyCollections>
    </>
  );
};

export default MenuBar;
