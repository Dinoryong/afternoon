import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  min-width: 65px;
  cursor: pointer;
  transition: all 0.3s;

  width: 65px;
  height: 32px;
  color: ${color.gray.darker};
  background-color: ${color.white.default};
  border-color: ${color.gray.dark};
  border-radius: 4px;
  margin-left: 8px;
  margin-right: 8px;
  font-size: 14px;
  font-weight: 400;
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
  btnFontSize?: string;
  btnHoverBorderColor?: string;
  btnHoverBgColor?: string;
  btnRouterPush?: string;
  btnOnClick?: Function;
  btnUseOpacity?: boolean;
  btnSetOpacity?: string;
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
  btnFontSize,
  btnFontWeight,
  btnHoverTextColor = color.black.default,
  btnHoverBorderColor = color.black.default,
  btnHoverBgColor,
  btnOnClick = () => {
    console.log("onClick : 기능없음");
  },
  btnUseOpacity,
  btnSetOpacity,
}: ButtonProps) => {
  const [bgColor, setBgColor] = useState<string>(btnBgColor);
  const [borderColor, setBorderColor] = useState<string>(btnBorderColor);
  const [textColor, setTextColor] = useState<string>(btnTextColor);
  const [opacity, setOpacity] = useState<string>(btnSetOpacity);

  useEffect(() => {
    setBgColor(btnBgColor);
    setBorderColor(btnBorderColor);
    setTextColor(btnTextColor);
  }, [btnBgColor, btnBorderColor, btnTextColor]);

  const onMouseOver = (): void => {
    if (!btnUseOpacity) {
      setBgColor(btnHoverBgColor);
      setBorderColor(btnHoverBorderColor);
      setTextColor(btnHoverTextColor);
    } else {
      setOpacity("1");
    }
  };

  const onMouseLeave = (): void => {
    if (!btnUseOpacity) {
      setBgColor(btnBgColor);
      setBorderColor(btnBorderColor);
      setTextColor(btnTextColor);
    } else {
      setOpacity(btnSetOpacity);
    }
  };

  const onClick = (): void => {
    btnOnClick();
  };

  return (
    <Container
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
        width: btnWidth,
        minWidth: btnWidth,
        height: btnHeight,
        borderRadius: btnBorderRadius,
        marginLeft: btnMarginLeft,
        marginRight: btnMarginRight,
        fontWeight: btnFontWeight,
        fontSize: btnFontSize,
        opacity: btnUseOpacity ? opacity : 1,
      }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {btnText}
    </Container>
  );
};

export default index;
