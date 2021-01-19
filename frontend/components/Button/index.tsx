import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";

type HoverProps = {
  btnHoverBorderColor?: string;
  btnHoverTextColor?: string;
  btnHoverBgColor?: string;
};

const Container = styled.div<HoverProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  min-width: 65px;
  cursor: pointer;
  transition: all 0.2s;

  width: 65px;
  height: 32px;
  color: ${color.gray.dark};
  background-color: ${color.white.default};
  border-color: ${color.gray.default};
  border-radius: 4px;
  margin-left: 8px;
  margin-right: 8px;
  font-weight: 300;

  :hover {
    border-color: ${(props: HoverProps) => props.btnHoverBorderColor};
    background-color: ${(props: HoverProps) => props.btnHoverBgColor};
    color: ${(props: HoverProps) => props.btnHoverTextColor};
  }
`;

type ButtonProps = {
  btnText?: string;
  btnBgColor?: string;
  btnBorderColor?: string;
  btnTextColor?: string;
  btnWidth?: string;
  btnHeight?: string;
  btnMarginLeft?: string;
  btnMarginRight?: string;
  btnBorderRadius?: string;
  btnFontWeight?: number;
  btnHoverTextColor?: string;
  btnHoverBorderColor?: string;
  btnHoverBgColor?: string;
};

const index = ({
  btnText = "버튼",
  btnBgColor,
  btnTextColor,
  btnBorderColor,
  btnWidth,
  btnHeight,
  btnBorderRadius,
  btnMarginLeft,
  btnMarginRight,
  btnFontWeight,
  btnHoverTextColor = color.black.default,
  btnHoverBorderColor = color.black.default,
  btnHoverBgColor,
}: ButtonProps) => {
  const props = {
    btnHoverTextColor,
    btnHoverBorderColor,
    btnHoverBgColor,
  };

  return (
    <Container
      style={{
        backgroundColor: btnBgColor,
        color: btnTextColor,
        borderColor: btnBorderColor,
        width: btnWidth,
        height: btnHeight,
        borderRadius: btnBorderRadius,
        marginLeft: btnMarginLeft,
        marginRight: btnMarginRight,
        fontWeight: btnFontWeight,
      }}
      {...props}
    >
      {btnText}
    </Container>
  );
};

export default index;
