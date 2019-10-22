import "react-devtools";
import React from "react";
import ReactDOM from "react-dom";
import ThemeBuilderComponent from "./components/ThemeBuilderComponent";

function App() {
	return <ThemeBuilderComponent></ThemeBuilderComponent>;
}
// render component when FSBL is ready.
const FSBLReady = () => {
	ReactDOM.render(
		<App />,
		document.getElementById("ThemeBuilder-component-wrapper")
	);
};

if (window.FSBL && FSBL.addEventListener) {
	FSBL.addEventListener("onReady", FSBLReady);
} else {
	window.addEventListener("FSBLReady", FSBLReady);
}
