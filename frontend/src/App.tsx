import { createTheme, NextUIProvider } from "@nextui-org/react"
import useDarkMode from "use-dark-mode";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Collection from "./pages/Collection";

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
			<Hero />
			<Collection />
		</NextUIProvider>
	)
}

export default App;
