import React, { useState, useEffect, useContext } from "react";
import * as theme from "../../theme.json";
import CSSEditor from "./CSSEditor";

const getAllRootVars = styleSheets =>
	// I cannot take credit for this! Searches for all the css variables in the :root object
	Array.from(styleSheets)
		.filter(
			sheet =>
				sheet.href === null || sheet.href.startsWith(window.location.origin)
		)
		.reduce(
			(acc, sheet) =>
				(acc = [
					...acc,
					...Array.from(sheet.cssRules).reduce(
						(def, rule) =>
							(def =
								rule.selectorText === ":root"
									? [
											...def,
											...Array.from(rule.style).filter(name =>
												name.startsWith("--")
											)
									  ]
									: def),
						[]
					)
				]),
			[]
		);

const ThemeBuilderComponent = () => {
	const [theme, setTheme] = useState(theme);
	useEffect(() => {
		if (document) {
			// console.log(getAllRootVars(document.styleSheets));
		}
	});
	const updateThemeValue = (category, cssVariable, newValue) => {
		const updatedTheme = { ...theme };
		updatedTheme[category][cssVariable] = newValue;
		setTheme(updatedTheme);
	};
	// could this be the top level state object?
	// could the CSS keep the state instead?

	const themeInfo = Object.entries(theme);
	console.log(themeInfo);
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
		</div>
	);
};

export default ThemeBuilderComponent;
