/* eslint-disable indent */
import ReactDOM from "react-dom";
import App from "./components/App";

fetch("/").then((response) => {
    response.status >= 400
        ? ReactDOM.render(<Welcome />, document.querySelector("main"))
        : ReactDOM.render(<App />, document.querySelector("main"));
});
