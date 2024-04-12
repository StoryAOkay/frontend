import {
    Box,
    Text,
    Flex,
    Input,
    Button,
    InputRightElement,
    InputGroup,
    Heading,
    Spinner,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import BlackButton from "../components/black_button";

function LoginPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const base_url = 'http://localhost:5000/api'
    const { getUserProfile } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const toggleVisible = (e) => {
        e.preventDefault();
        setPasswordVisible((prevState) => !prevState);
    };
    const submit = (event) => {
        event.preventDefault();
       
        axios
            .post(`${base_url}/users/login`, {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            })
            .then((res) => {
                setIsLoading(true);
                if (res.data.token) {
                    sessionStorage.setItem("token", res.data.token);
                }
                getUserProfile();
            })
            .catch((error) => {
                alert(error.message);
            });
        setTimeout(() => {
            navigate("/");
            emailRef.current.value = "";
            passwordRef.current.value = "";
            setIsLoading(false);
        }, 2000);
    };
    return (
        <Box>

            <Flex
                py="4.5rem"
                flexDirection={"column"}
                alignItems="center"
            >
                <Box width={'240px'} textAlign={'left'}>
                    <Heading as='h2' fontSize='54px' pb='1.5rem' fontFamily={'Mountains of Christmas'}>StoryAOkay</Heading>                
                    
                    <Text >Email</Text>
                    <Input
                        type="email"
                        placeholder="Enter email"
                        pr="4.5rem"
                        height="60px"
                        borderRadius={"20px"}
                        border="2px solid black"
                        paddingLeft={"2rem"}
                        maxWidth='240px'
                        ref={emailRef}
                    />
                    <Text>Password</Text>
                    <InputGroup size="md" maxWidth='240px'  >
                        <Input
                            pr="4.5rem"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter password"
                            height="60px"
                            borderRadius={"20px"}
                            border="2px solid black"
                            paddingLeft={"2rem"}

                            ref={passwordRef}
                        />
                        <InputRightElement width="4.5rem">
                            <Button
                                as="span"
                                h="1.75rem"
                                size="sm"
                                onClick={toggleVisible}
                                margin="2 rem auto"
                            >
                                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <BlackButton
                        marginBottom="8px"
                        borderRadius="20px"
                        height="60px"
                        width="240px"
                        color="#fff"
                        background={"#3182CE"}
                        fontWeight={700}
                        fontSize="24px"
                        marginTop={"2rem"}
                        _hover={{ background: "#3182CE" }}
                        _active={{ background: "#3182CE" }}
                        onClick={submit}
                    >
                        {isLoading ? (
                            <span>
                                {" "}
                                <Spinner /> LOGIN
                            </span>
                        ) : (
                            "LOGIN"
                        )}
                    </BlackButton>
                    <Text>
                        Don't have an account? <Link to="/signup"><strong>SIGNUP</strong></Link>
                    </Text>
                </Box>

            </Flex>
        </Box>
    )
}
export default LoginPage