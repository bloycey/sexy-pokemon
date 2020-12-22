import { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "../components/Layout";
import LeaderboardHero from "../components/LeaderboardHero";
import Nav from "../components/Nav";
import SexiestWidget from "../components/SexiestWidget";
import { getAndSetRankings, refreshRankings } from "../utils/utils";

const WidgetsWrapper = styled.div`
	padding-top: 4rem;
	display: flex;
	flex-direction: column;
	gap: 3rem;
	flex: 1;

	@media(min-width: 767px){
		padding-top: 6rem;
		flex-direction: row;
		gap: 8rem;
	}
`;

const WidgetWrapper = styled.div`
	flex: 1;
	max-width: 90%;
`;

const CenterWidgetWrapper = styled.div`
	max-width: clamp(300px, 600px, 90%);
	margin-top: 3rem;

	@media(min-width: 767px){
		margin: 0 auto;
		margin-top: 6rem;
	}
`

const Rankings = () => {
	const [rankings, setRankings] = useState([]);	
	useEffect(() => getAndSetRankings(setRankings), []);
	const refresh = refreshRankings(setRankings);

	return (
		<div>
			<Nav />
			<LeaderboardHero />
			<Container>
				<WidgetsWrapper>
					<WidgetWrapper>
						<SexiestWidget rankings={rankings} refreshRankings={refresh} type="top" dark={true}/>
					</WidgetWrapper>
					<WidgetWrapper>
						<SexiestWidget rankings={rankings} refreshRankings={refresh} type="bottom" dark={true} />
					</WidgetWrapper>
				</WidgetsWrapper>
				<div>
					<CenterWidgetWrapper>
						<SexiestWidget rankings={rankings} refreshRankings={refresh} type="all" dark={true} />
					</CenterWidgetWrapper>
				</div>
			</Container>
		</div>
	);
};

export default Rankings;
