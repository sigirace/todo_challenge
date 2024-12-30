import { Switch, Route, HashRouter } from "react-router-dom";
import Home from "./routes/Home";

const Router = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
