import logo from "./logo.svg";
import "./App.css";
import Home from "../src/pages/Home";
import SignUp from "./pages/SignUp";
import PasswordField from "./pages/passwordField";
import Nav from "../src/component/Nav";
import { BrowserRouter } from "react-router-dom";
import { Route, Link } from "react-router-dom";

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
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/signsForms/logIn" component={PasswordField} />
          <Route path="/signsForms/signUp" component={SignUp} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
