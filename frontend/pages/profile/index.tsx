import React from 'react'
import styled from "@emotion/styled";
import ProfileTop from "../../components/ProfileTop"
import Button from "../../components/Button";
import color from "../../styles/theme";
import Image from "next/image";

const Container1 = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 800px;
`;

const Container2 = styled.div`
	display: flex;
	width: 100%;
	height: 800px;
`;

const index = () => {
    return (
			<>
				<Container1>
					<ProfileTop></ProfileTop>
				</Container1>
				<Container2>
					{/* <ProfileBottom></ProfileBottom> */}
				</Container2>
			</>
    );
};

export default index
