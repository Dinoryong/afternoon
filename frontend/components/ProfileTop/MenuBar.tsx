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

// const MyCollections = styled.div`
// `;

const MenuBar = () => {
  return (
    <>
      <MyPost>
        <Button
          btnWidth="190px"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText="게시글"
          btnTextColor="${color.gray.light}"
          btnFontSize="20px"
          btnBorderColor="transparent"
          btnHoverBorderColor="transparent"
          btnHoverTextColor="black"
          // btnHoverBorderColor={routerPath === "/" ? "transparent" : null}
          // btnBgColor={routerPath === "/" ? "transparent" : null}
          // btnTextColor={routerPath === "/" ? "white" : null}
          // btnBorderColor={routerPath === "/" ? "white" : null}
          // btnOnClick={toggleSubmit}
        />
      </MyPost>
      <MyLikes>
        <Button
          btnWidth="190px"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText="좋아요"
          btnTextColor="${color.gray.light}"
          btnFontSize="20px"
          btnBorderColor="transparent"
          btnHoverBorderColor="transparent"
          btnHoverTextColor="black"
          // btnHoverBorderColor={routerPath === "/" ? "transparent" : null}
          // btnBgColor={routerPath === "/" ? "transparent" : null}
          // btnTextColor={routerPath === "/" ? "white" : null}
          // btnBorderColor={routerPath === "/" ? "white" : null}
          // btnOnClick={toggleSubmit}
        />
      </MyLikes>
    </>
  );
};

export default MenuBar;
