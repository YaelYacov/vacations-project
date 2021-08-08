import "./App.css";
import SignUp from "./pages/SignUp";
import PasswordField from "./pages/passwordField";
import Nav from "../src/component/Nav";
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import VacationsInfo from "./component/vacationInfo";
import GraphComp from "./pages/graph";
import { createStore } from "redux";
import reducers from "./redux/Reducers";
import { Provider } from "react-redux";

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav></Nav>
        <div className="App">
          {/* <Route path="/" component={Home} /> */}
          <Route path="/vacations" component={VacationsInfo} />
          <Route path="/signsForms/logIn" exact component={PasswordField} />
          <Route path="/signsForms/signUp" component={SignUp} />
          <Route path="/followersGraph" component={GraphComp} />
          <Route path="">
            <Redirect to="/signsForms/logIn" />;
          </Route>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
