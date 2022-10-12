import React from "react";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import * as Routes from "./routes";
import * as Pages from "./pages";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Todo App</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
      />

      <Router>
        <Switch>
          <Route path={Routes.Home} element={<Pages.Home />} />
          <Route path={Routes.LogIn} element={<Pages.LogIn />} />

          <Route path={Routes.NotFound} element={<Pages.NotFound />} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
