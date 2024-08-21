import React from 'react';
import { Box, Heading, Text, Button, Center, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const { colorMode } = useColorMode();

    return (
        <Center h="90vh">
            <Box textAlign="center" p={6} borderRadius="md" bg={colorMode === 'light' ? 'white' : 'gray.900'} shadow="md">
                <Heading mb={4} size="xl">404</Heading>
                <Text mb={6} fontSize="lg" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
                    Sorry, the page you're looking for does not exist.
                </Text>
                <Button as={Link} to="/" bg={"#48bb78"} _hover={{bg:"#22543d"}} color={"white"}>
                    Go Home
                </Button>
            </Box>
        </Center>
    );
};

export default NotFound;
