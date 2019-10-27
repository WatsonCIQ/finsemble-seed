import React, { useState, useEffect } from "react";

const getCssTextFromStyleSheets = styleSheets =>
	Array.from(styleSheets)
		.filter(
			sheet =>
				// TODO: we need to be able to add more domains here so this needs to be modified, it will only take local domains so far
				sheet.href === null || sheet.href.startsWith(window.location.origin)
		)
		.reduce(
			// we want to loop through and get all the cssRules > cssText and if it includes "--" then add it to the list
			//  we can later run a split on this code and eliminate the ones that are not variables
			(accum, sheet) => {
				const cssText = Array.from(sheet.cssRules)
					.filter(rules => rules.cssText.includes(":root"))
					.map(rules => rules.cssText);
				return cssText.length ? [...accum, ...cssText] : accum;
			},
			[]
		);

const rootCssOutput = () => {
	// getCssTextFromStyleSheets is an array of cssText values

	const makeCssTextString = getCssTextFromStyleSheets(
		document.styleSheets
	).reduce((prev, cssString) => {
		let css;
		css = cssString.replace(/:root \{/gi, "");
		css = css.replace(/\}/g, " ");
		return prev + css;
	}, "");
	const removeDuplicateCssValues = new Set(makeCssTextString.split(";"));
	return `:root { ${Array.from(removeDuplicateCssValues).join(";")} }`;
};

const Export = () => {
	// need to wait for the document
	useEffect(() => {
		if (document) {
			// this updates the stylesheet to match the var color of yellow
			const updateStyleSheetValue = document.styleSheets[6].cssRules[0].styleMap.set(
				"--titleBar-background-inactive-color",
				"var(--plum)"
			);
			// returns a multidimensional array with all the css rules
			const getCssRulesAsArray = Array.from(
				document.styleSheets[6].cssRules[0].styleMap.entries()
			);

			// get the :root object with all the styles formatted as css - specify the stylesheet and where the rules are
			const rootCssAsString = document.styleSheets[6].cssRules[0].cssText;
		}
	});
	return (
		<div>
			<button onClick={() => console.log(rootCssOutput())}>export</button>
		</div>
	);
};

export default Export;
