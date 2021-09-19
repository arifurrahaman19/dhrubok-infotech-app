import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// - redux store
import store from "./redux/store";

// - Layout
import Layout from "./components/layout";

// - Pages
import Counter from "./pages/Counter";
import Home from "./pages/Home";
import Form from "./pages/Form";
import List from "./pages/List";

// Sass Style Sheet
import "./sass/main.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/counter">
                <Counter />
              </Route>

              <Route path="/form">
                <Form />
              </Route>

              <Route path="/list">
                <List />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
