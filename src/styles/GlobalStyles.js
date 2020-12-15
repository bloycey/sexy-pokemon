import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	html, body {
		font-family: 'Rubik', sans-serif;
		font-size: 16px;
	}

  :root {
    --red: #F12E22;
	--black: #171C1D;
	--lightgrey: #F6F6F6;
  }
`

export default GlobalStyles;