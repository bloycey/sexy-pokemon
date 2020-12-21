import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Rankings from "./pages/Rankings";
import Layout from "./components/Layout";

const App = () => {
	return (
		<Layout>
		<Router>
				<Switch>
					<Route path="/leaderboard">
							<Rankings />
					</Route>
					<Route path="/">
							<Home />
					</Route>
				</Switch>
			</Router>
		</Layout>
	);
};

export default App;
