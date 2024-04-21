import React from 'react';
import {
    Button,
  } from "@chakra-ui/react";
const BlackButton = ({ children, ...props }) => (
    <Button
      {...props}
      bg="#662e9b"
      color="white"
      _hover={{ bg: "gray.900" }}
    >
      {children}
    </Button>
  );
export default BlackButton;