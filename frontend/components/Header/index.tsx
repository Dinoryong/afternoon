import React from "react";
import styled from "@emotion/styled";
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";
import { useRouter } from "next/router";

const Container = styled.div`
  z-index: 10;
  position: fixed;
  justify-content: center;
  display: flex;
  height: 62px;
  width: 100%;
  font-size: 14px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(1, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

const index = () => {
  const router = useRouter();
  const routerPath = router.pathname;

  console.log(routerPath);

  const containerStyle = {
    display: routerPath === "/signup" ? "none" : "flex",
    boxShadow:
      routerPath === "/"
        ? "none"
        : "0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(1, 0, 0, 0.1)",
    backgroundColor: routerPath === "/" ? "transparent" : "white",
  };

  return (
    <Container style={containerStyle}>
      <Wrapper>
        <HeaderLeft routerPath={routerPath} />
        <HeaderCenter routerPath={routerPath} />
        <HeaderRight routerPath={routerPath} />
      </Wrapper>
    </Container>
  );
};

export default index;
