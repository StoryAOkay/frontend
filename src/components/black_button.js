import React from 'react';
import {
    Button,
  } from "@chakra-ui/react";
const BlackButton = ({ children, ...props }) => (
    <Button
      {...props}
      bg="black"
      color="white"
      _hover={{ bg: "gray.900" }}
    >
      {children}
    </Button>
  );
export default BlackButton;