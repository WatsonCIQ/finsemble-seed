import React from "react";
import { Action as ThemeBuilderActions } from "../stores/ThemeBuilderStore";

export default class ThemeBuilderComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidUpdate() { }
	componentWillMount() { }
	componentWillUnmount() { }
	componentWillReceiveProps(nextProps) { }
	render() {
		return (
			<div>
				<h1>
					ThemeBuilder using react
				</h1>
			</div>);
	}
}
