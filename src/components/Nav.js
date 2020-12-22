import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavWrapper = styled.nav`
	background-color: var(--red);

	ul {
		margin: 0;
		padding: 0.5rem 1rem 1rem 1rem;
	}
`;

const Li = styled.li`
	list-style: none;
	display: inline-flex;
	color: #ffffff;
	padding: 0.5rem;
	margin-right: 2rem;
	border-bottom: ${props => props.current ? '2px solid #ffffff' : 'none'};
	box-sizing: border-box;

	a {
		text-decoration: none;
		color: #ffffff;
		text-transform: uppercase;
		font-weight: 800;
	}
`;

const NavItems = [
	{
		title: "Battle",
		url: "/"
	},
	{
		title: "Leaderboard",
		url: "/leaderboard"
	}
]

const Nav = () => {
	const { pathname } = useLocation();
	return (
		<NavWrapper>
			<ul>
				{NavItems.map(({ title, url}) => (
					<Li current={pathname === url} key={title}>
						<Link to={url}>
							{title}
						</Link>
					</Li>
				))}
			</ul>
		</NavWrapper>
	)
}

export default Nav;