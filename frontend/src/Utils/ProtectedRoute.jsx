import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';

const ProtectedRoute = () => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    

    if (loading) {
        return (
            <Flex height={"60vh"} w={"full"} justifyContent={"center"} alignItems={"center"}>
                <Spinner size={"lg"} />
            </Flex>
        );
    }

    if (isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    if (user) {
        if (user && user.role && user.role !== 'recruiter') {
            return <Navigate to="/" />;
        }
    }


    return <Outlet />;
};

export default ProtectedRoute;
