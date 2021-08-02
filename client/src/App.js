import logo from "./logo.svg";
import "./App.css";
import Home from "../src/pages/Home";
import SignUp from "./pages/SignUp";
import PasswordField from "./pages/passwordField";
import Nav from "../src/component/Nav";
import { BrowserRouter } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import VacationsInfo from "./component/vacationInfo";
import GraphComp from "./pages/graph";

import Redux from "../src/redux/Reducers";
import { createStore } from "redux";
import reducers from "./redux/Reducers";
import { Provider } from "react-redux";

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav></Nav>
        <div className="App bgPasPage">
          {/* <Route path="/" component={Home} /> */}
          <Route path="/vacations" component={VacationsInfo} />
          <Route path="/signsForms/logIn" exact component={PasswordField} />
          <Route path="/signsForms/signUp" component={SignUp} />
          <Route path="/followersGraph" component={GraphComp} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
