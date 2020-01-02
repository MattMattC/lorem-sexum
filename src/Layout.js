import React from 'react';
import { Box } from '@chakra-ui/core';

const Layout = props => {
    return (
        <>
            <Box bg="white" w="100%" p={4} color="black" shadow="md">
                Lorem Sexum
            </Box>
            {props.children}
        </>
    );
};

export default Layout;
