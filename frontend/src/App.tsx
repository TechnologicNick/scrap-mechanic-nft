import { createTheme, NextUIProvider } from "@nextui-org/react"
import useDarkMode from "use-dark-mode";
import Navbar from "./components/Navbar";

const lightTheme = createTheme({
	type: "light",
	theme: {
		colors: {

		},
	},
});
	
const darkTheme = createTheme({
	type: "dark",
	theme: {
		colors: {

		},
	},
});

const App = () => {
	const darkMode = useDarkMode(true);

	return (
		<NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
			<Navbar />
		</NextUIProvider>
	)
}

export default App;
