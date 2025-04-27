import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        {/* exact를 반드시 줘야 "/" 만 정확히 매칭 */}
        <Route path="/" exact>
          <Home />
        </Route>

        {/* 상세 페이지들은 별도로 매칭 */}
        <Route path="/movies/:movieId">
          <Home />
        </Route>

        <Route path="/tv" exact>
          <Tv />
        </Route>
        <Route path="/tv/:tvId">
          <Tv />
        </Route>

        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/search/:id">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
