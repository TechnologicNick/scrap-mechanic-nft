import useDarkMode from "use-dark-mode";

const Hero = () => {
    const darkMode = useDarkMode(true);
    console.log({darkMode});

    return (
        <img src={darkMode.value ? "hero_dark_1080.jpg" : "hero_light_1080.jpg"} alt="" style={{
            width: "100%",
            height: "25rem",
            objectFit: "cover",
        }} />
    )
}

export default Hero;
