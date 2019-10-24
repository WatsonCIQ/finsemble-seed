import React, { useState } from "react";
import * as themeJSON from "../../theme.json";
import CSSEditor from "./CSSEditor";
import Export from "./Export";

const ThemeBuilderComponent = () => {
	const [theme, setTheme] = useState(themeJSON);

	const updateThemeValue = (category, cssVariable, newValue) => {
		const updatedTheme = { ...theme };
		updatedTheme[category][cssVariable] = newValue;
		setTheme(updatedTheme);
	};
	// could this be the top level state object?
	// could the CSS keep the state instead?

	const themeInfo = Object.entries(theme);
	console.log(`themeInfo ${themeInfo}`);
	return (
		<div>
			{themeInfo.map(([category, values]) => (
				<ul key={category}>
					{category}
					{Object.entries(values).map(([key, val]) => (
						<li key={key}>
							{key}:{val}
							<CSSEditor
								updateThemeValue={updateThemeValue}
								themeCategory={category}
								cssVariableKey={key}
								cssVariableValue={val.trim()}
							></CSSEditor>
						</li>
					))}
				</ul>
			))}
			<Export></Export>
		</div>
	);
};

export default ThemeBuilderComponent;
