import React from 'react';
import { createTheme, NextUIProvider } from "@nextui-org/react"
import useDarkMode from 'use-dark-mode';

const lightTheme = createTheme({
	type: 'light',
	theme: {
		colors: {

		},
	},
});
	
const darkTheme = createTheme({
	type: 'dark',
	theme: {
		colors: {

		},
	},
});

const App = () => {
	const darkMode = useDarkMode(true);

	return (
		<NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>

		</NextUIProvider>
	)
}

export default App;
