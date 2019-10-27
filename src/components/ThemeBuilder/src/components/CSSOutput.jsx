import React, { useState, useEffect } from "react";

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

const CSSOutput = () => {
	const [root, setRoot] = useState([]);
	useEffect(() => {
		if (document) {
			const cssVariablesAndValues = getAllRootVars(document.styleSheets).map(
				cssVar => [
					cssVar,
					getComputedStyle(document.documentElement)
						.getPropertyValue(cssVar)
						.trim()
				]
			);
			setRoot(cssVariablesAndValues);
		}
	}, []);
	return (
		<div>
			{root.map(([cssVar, val], index) => (
				<p key={cssVar + index}>
					{cssVar}: {val};
				</p>
			))}
		</div>
	);
};

export default CSSOutput;
