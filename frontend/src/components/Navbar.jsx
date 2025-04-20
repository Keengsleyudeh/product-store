import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { Link, useNavigate } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi"; // Added logout icon
import { useAuthStore } from "@/store/auth";

const Navbar = () => {
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const {logout } = useAuthStore(); // Destructure logout from auth store
	const user = JSON.parse(localStorage.getItem("user")) || {}; // Get user from local storage

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

	if (!user.username) return;

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{ base: "28", sm: "32" }} // Increased font size
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, #22D3EE, #3B82F6)"}
                    bgClip={"text"}
                    backgroundColor={"#3B82F6"}
                    letterSpacing={"wider"} // Added letter spacing
                >
                    {user.username && <Link to={"/"}>{user.firstName}'s Store 🛒</Link>}
                </Text>

                <HStack spacing={3} alignItems={"center"}> {/* Increased spacing */}
                    <Link to={"/create"}>
                        <Button
                            variant="ghost"
                            _hover={{
                                bg: colorMode === "light" ? "gray.200" : "gray.700"
                            }}
                        >
                            <FaSquarePlus fontSize={22} />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        onClick={toggleColorMode}
                        _hover={{
                            bg: colorMode === "light" ? "gray.200" : "gray.700"
                        }}
                    >
                        {colorMode === "light" ? <IoMoon size={22} /> : <LuSun size={22} />}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        _hover={{
                            bg: colorMode === "light" ? "gray.200" : "gray.700"
                        }}
                        title="Logout"
                    >
                        <FiLogOut size={22} />
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;