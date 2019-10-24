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

const getCssText = Array.from(styleSheets)
	.filter(
		sheet =>
			// TODO: we need to be able to add more domains here so this needs to be modified, it will only take local domains so far
			sheet.href === null || sheet.href.startsWith(window.location.origin)
	)
	.reduce(
		// we want to loop through and get all the cssRules > cssText and if it includes "--" then add it to the list
		//  we can later run a split on this code and eliminate the ones that are not variables
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

const Export = () => {
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

export default Export;
