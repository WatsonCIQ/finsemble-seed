const runDynamicColor = () => {
	FSBL.Clients.RouterClient.addListener("themeBuilder", (error, response) => {
		if (error) {
			console.log(`themeBuilder Error: ${JSON.stringify(error)}`);
		} else {
			console.log(`themeBuilder Response: ${JSON.stringify(response)}`);
			const { cssVariable = null, cssValue = null } = response.data;
			cssVariable && cssValue
				? document.documentElement.style.setProperty(cssVariable, cssValue)
				: console.error(
						`empty value for either: cssVariable - ${cssVariable} OR cssValue - ${cssValue}`
				  );
		}
	});
};

if (window.FSBL && FSBL.addEventListener) {
	FSBL.addEventListener("onReady", runDynamicColor);
} else {
	window.addEventListener("FSBLReady", runDynamicColor);
}
