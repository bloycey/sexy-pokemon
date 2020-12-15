import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Rankings from "./pages/Rankings";
import GlobalStyles from "./styles/GlobalStyles";

const App = () => {
	return (
		<>
		<GlobalStyles />
		<Router>
				<Switch>
					<Route path="/rankings">
							<Rankings />
					</Route>
					<Route path="/">
							<Home />
					</Route>
				</Switch>
			</Router>
		</>
	);
};

export default App;
