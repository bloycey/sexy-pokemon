import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	:root {
	--red: #F12E22;
	--darkred: #5B0B06;
	--black: #171C1D;
	--lightgrey: #F6F6F6;

	--MD: min-width(767px);
	}

	html, body {
		font-family: 'Rubik', sans-serif;
		font-size: 16px;
		overflow-x: hidden;
		box-sizing: border-box;
		background-color: var(--lightgrey);
	}

`

export default GlobalStyles;