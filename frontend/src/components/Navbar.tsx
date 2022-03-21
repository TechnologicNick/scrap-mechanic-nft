import { Button, Container, styled, Text } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import useDarkMode from "use-dark-mode";

const NavContainer = styled("nav", {
    top: 0,
    display: "flex",
    alignItems: "center",
    height: "76px",
    position: "sticky",
    zIndex: "$max",
    background: "$headerBackground",
    backdropFilter: "saturate(180%) blur(10px)",
    boxShadow: "0px 5px 20px -5px rgba(2, 1, 1, 0.1)",
});

const ToggleDarkMode = () => {
    const darkMode = useDarkMode(false);
    
    return (
        <Button light auto onClick={() => darkMode.toggle()} icon={<FontAwesomeIcon icon={faMoon} size={"lg"}/>} />
    )
}

const Navbar = () => {
    return (
        <NavContainer>
            <Container display={"flex"} alignItems={"center"} justify={"space-between"}>
                <Text h1 size={30} weight={"bold"} css={{ m: 0 }}>
                    Scrap Mechanic NFTs
                </Text>
                <ToggleDarkMode />
            </Container>
        </NavContainer>
    )
}

export default Navbar;
