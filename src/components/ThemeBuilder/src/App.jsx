import React from "react";
import ReactDOM from "react-dom";
import { Store as ThemeBuilderStore } from "./stores/ThemeBuilderStore";
import ThemeBuilderComponent from "./components/ThemeBuilderComponent";

class ThemeBuilder extends React.Component {
	getInitialState() {
		return {};
	}
	componentDidUpdate() { }
	componentDidMount() { }
	componentWillUnmount() { }

	render() {
		return (<div>
			<ThemeBuilderComponent />
		</div>)
	}
};
//for debugging.
window.ThemeBuilderStore = ThemeBuilderStore;

// render component when FSBL is ready.
const FSBLReady = () => {
	ReactDOM.render(
		<ThemeBuilder />
		, document.getElementById("ThemeBuilder-component-wrapper"));
}

if (window.FSBL && FSBL.addEventListener) {
	FSBL.addEventListener("onReady", FSBLReady);
} else {
	window.addEventListener("FSBLReady", FSBLReady);
}