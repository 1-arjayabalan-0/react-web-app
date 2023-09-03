import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { AppLayout } from "./layouts/app-layout";
import Users from "./pages/Auth/Users";
import AppForm from "./components/app-form-fields";
import { Provider } from "react-redux";
import store from "./actions/store/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path={"/"} element={<Users />} />
              <Route path={"/form"} element={<AppForm />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
