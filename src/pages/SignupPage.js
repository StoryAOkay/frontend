import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Button,
  Spinner,
  Heading
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import BlackButton from "../components/black_button";
import { useMyBooks } from "../contexts/MyBooksContext";

function SignupPage(){
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { getUserProfile } = useAuth();
    const {getMyBooks} = useMyBooks();
    const base_url = process.env.REACT_APP_BASE_URL;
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const ageRef = useRef();
    const navigate = useNavigate();
  
    const toggleVisible = (e) => {
      e.preventDefault();
      setPasswordVisible((prevState) => !prevState);
    };
    const submit = (event) => {
      event.preventDefault();
      axios
        .post(`${base_url}/users`, {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          age: ageRef.current.value,
        })
        .then((res) => {
          if (res.data.token) {
            setIsLoading(true);
            sessionStorage.setItem("token", res.data.token);
          }
          getUserProfile();
          getMyBooks();
        })
        .catch((error) => {
          alert(error.message);
        });
      setTimeout(() => {
        navigate("/");
        nameRef.current.value = "";
        passwordRef.current.value = "";
        emailRef.current.value = "";
        ageRef.current.value ='';
        setIsLoading(false);
      }, 2000);
    };
    return (
        <Box>
           
            <Flex
          py="1rem"
          flexDirection={"column"}
          alignItems="center"
        >
            <Box  width={'240px'} textAlign={'left'}>
                <Heading as='h2' fontSize='54px'pb='1.5rem' fontFamily={'Mountains of Christmas'}>StoryAOkay</Heading>
            <Text>Name</Text>
            <Input
              type="text"
              pr="4.5rem"
              height="60px"
              borderRadius={"20px"}
              border="2px solid black"
              paddingLeft={"2rem"}
              maxWidth='240px'
              ref={nameRef}
            />
            <Text >Age</Text>
            <Input
              type="text"
              pr="4.5rem"
              height="60px"
              borderRadius={"20px"}
              border="2px solid black"
              paddingLeft={"2rem"}
              maxWidth='240px'
              ref={ageRef}
            />
            <Text >Email</Text>
            <Input
              type="email"
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
                  <Spinner /> SIGNUP
                </span>
              ) : (
                "SIGN UP"
              )}
            </BlackButton>
            <Text>
              Already have an account? <Link to="/login"><strong>LOGIN</strong></Link>
            </Text>
          </Box>

        </Flex>
        </Box>
    );
}
export default SignupPage