import { useEffect, useState } from 'react';
import styled from "styled-components";
import sync from "../img/sync.svg";
import DotLoader from "react-spinners/DotLoader";

const importAll = (r) => r.keys().map(r);

const images = importAll(
	require.context("../data/images", false, /\.(png|jpe?g|svg)$/)
);

const SexyCardHeading = styled.h4`
	color: var(--black);
	font-size: 1.5rem;
	margin: 0 0 0.5rem 0;
	display: flex;
	justify-content: space-between;

	@media(min-width: 1200px){
		color: ${props => props.dark ? 'var(--black)' : '#ffffff'};
	}

	img {
		margin-right: 2.5rem;
		cursor: pointer;
		filter: invert(100%);

		@media(min-width: 1200px){
			filter: ${props => props.dark ? 'invert(100%)' : 'invert(0%)'};
			margin-right: 3.5rem;
		}
		
	}
`

const SexyCard = styled.ol`
	background-color: #ffffff;
	box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.24);
	border-radius: 10px;
	padding: 2.5rem 2rem 2rem;
	margin-top: 0;
	font-size: 1.25rem;
	position: relative;

	li {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 6px;
	}

	h2 {
		margin-top: 0;
		margin-bottom: 0;
		font-size: 1.5rem;
	}
`;

const Ranking = styled.span`
	font-size: 1rem;
	opacity: 0.7;
`;

const SexiestImage = styled.div`
	background-color: #ffffff;
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 50%;
	border: 4px solid var(--black);
	width: 75px;
	height: 75px;
	overflow: visible;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: translate(60%, -60%);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	@media(min-width: 1200px){
		width: 115px;
		height: 115px;
	}

	img {
		width: 90%;
	}
`;

const LoadingWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 350px;
`

const SexiestWidget = ({ rankings, refreshRankings, type, dark=false, showRefresh=false  }) => {
	const isLoading = rankings.length === 0;
	const getRankings = type => {
		const sortedRankings = rankings.sort((a, b) => b.ranking - a.ranking);
		switch(type){
			case 'top':
				return sortedRankings.slice(0, 10);
			case 'bottom':
				return sortedRankings.slice(sortedRankings.length - 10, sortedRankings.length).reverse();
			default:
				return sortedRankings
		};
	};

	const headingText = {
		top: "Sexiest Pokemon",
		bottom: "Least Sexy Pokemon",
		all: "All Pokemon"
	}
	const rankingsToUse = getRankings(type);

	return (
		<div>
			<SexyCardHeading dark={dark}>{headingText[type]} {!isLoading && showRefresh && <img src={sync} alt="Refresh Rankings" onClick={refreshRankings}/>}</SexyCardHeading>
			<SexyCard>
			{isLoading && (
				<LoadingWrapper>
					<DotLoader
						size={75}
						color={"var(--red)"}
						loading={true}
					/>
				</LoadingWrapper>
			)}
				{!isLoading && (
					<>
						<SexiestImage><img src={images[rankingsToUse[0].id - 1].default} alt={rankingsToUse[0].name} /></SexiestImage>
						{rankingsToUse.map(({ name, ranking }, index) => {
							if(index === 0){
								return (
								<li key={name}>
									<h2>{index + 1}. {name}</h2><Ranking>{ranking}pts</Ranking>
								</li>
								)
							}
							return (
								<li key={name}>
									<span>{index + 1}. {name}</span><Ranking>{ranking}pts</Ranking>
								</li>
							)
						})}
					</>
				)}
			</SexyCard>
		</div>
	)
}

export default SexiestWidget;