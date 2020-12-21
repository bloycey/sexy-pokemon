import styled from "styled-components";
import { Container } from "./Layout";

const HeroWrapper = styled.header`
	background-color: var(--red);
`;

const TitleWrapper = styled.div`
	padding: 2rem 0 4rem 0;

	@media(min-width: 767px){
		padding: 5rem 0 10rem 0;
	}
`

const Heading = styled.h1`
	margin: 0;
	color: #ffffff;
	font-size: 28px;
	text-shadow: 0px 1.46825px 0.367063px rgba(91, 11, 6, 0.87);

	@media(min-width: 767px){
		font-size: 4.5rem;
	}
`

const Subtitle = styled.h2`
	margin-top: 4px;
	font-weight: 500;
	color: var(--darkred);
	font-size: 18px;

	@media(min-width: 767px){
		font-size: 2rem;
	}
`

const Hero = () => {
	return (
		<HeroWrapper>
			<Container>
				<TitleWrapper>
					<Heading>Which pokemon is <span>sexier?</span></Heading>
					<Subtitle>Don't ask why. Just vote.</Subtitle>
				</TitleWrapper>
			</Container>
		</HeroWrapper>
	)
}

export default Hero;