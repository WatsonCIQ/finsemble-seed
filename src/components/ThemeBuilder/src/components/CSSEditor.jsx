import React, { useState, useEffect } from "react";

const validateCssColor = cssVal => {
	const regEx = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/gi;

	return regEx.test(cssVal);
};

const getCssVariableValue = cssVar =>
	getComputedStyle(document.documentElement).getPropertyValue(cssVar);

const updateCssVariableValue = (
	cssVariable,
	cssValue,
	updateThemeValue,
	themeCategory
) => {
	updateThemeValue(themeCategory, cssVariable, cssValue);
	FSBL.Clients.RouterClient.transmit("themeBuilder", {
		cssVariable,
		cssValue
	});
};

const CSSEditor = ({
	cssVariableKey,
	cssVariableValue,
	updateThemeValue,
	themeCategory
}) => {
	// needs a checker to see if this is a color value or
	const [cssValue, setCssValue] = useState(cssVariableValue.trim());
	const [inputType, setInputType] = useState("color");

	useEffect(() => {
		if (cssValue.includes("var(")) {
			setCssValue(getCssVariableValue(cssVariableKey).trim());
		}
	}, [cssVariableValue, cssVariableKey, cssValue]);

	useEffect(() => {
		if (validateCssColor(cssValue)) {
			setInputType("color");
		} else {
			setInputType("text");
		}
	}, [cssValue]);

	return (
		<div>
			<input
				type={inputType}
				name="cssval"
				onChange={el => setCssValue(el.target.value)}
				onBlur={() =>
					updateCssVariableValue(
						cssVariableKey,
						cssValue,
						updateThemeValue,
						themeCategory
					)
				}
				value={cssValue}
			></input>
			{/* <img src="/assets/" /> */}
		</div>
	);
};

export default CSSEditor;
