import * as React from "react";
import * as ReactDOM from "react-dom";
import UserPage from "../pages/UsersPage/UserPage";

const App = () => {
  return <UserPage />
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  ReactDOM.render(<App/>, rootEl);
});