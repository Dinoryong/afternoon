import React from 'react';
import styled from "@emotion/styled";
import color from "../../styles/theme";

const tags = ['designer space', 'engineer space', 'chef space', 'bathroom', 'den', 'terrace', 'ski', 'camping', 'scuber diving'];

const TagBox = styled.div`
	background-color: gray;
	width: 190px;
	height: 80px;
	/* cursor: */
`;

const PreferTags = () => {
    return (
			{tags.map((element, index) => {
				<div key={index}>{element}</div>
			})};
			<TagBox></TagBox>
    );
};

export default PreferTags;