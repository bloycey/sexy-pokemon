import styled from "styled-components";
import 'normalize.css';

import GlobalStyles from "../styles/GlobalStyles";

export const Container = styled.div`
	padding-right: 16px;
	padding-left: 16px;
	margin-right: auto;
	margin-left: auto;

	@media (min-width: 576px) {
		max-width: 540px;
	}

	@media (min-width: 768px) {
		max-width: 720px;
	}

	@media (min-width: 992px) {
		max-width: 960px;
	}

	@media (min-width: 1200px) {
		max-width: 1140px;
	}

	@media (min-width: 1200px) {
		max-width: 1140px;
	}

	@media (min-width: 1600px) {
		max-width: 1400px;
	}
`;

const Layout = ({ children }) => {
	return (
		<>
			<GlobalStyles />
			{children}
		</>
	)
};

export default Layout;