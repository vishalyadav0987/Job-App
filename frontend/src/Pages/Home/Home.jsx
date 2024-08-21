import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Flex, Spinner } from '@chakra-ui/react';
import Hero from '../../Components/HeroSection/Hero';
import TopJobs from '../../Components/TopJobs/TopJobs';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const { loading } = useSelector((state) => state.user);
    if (loading) {
        return <Flex alignItems={"center"} justifyContent={"center"} w={"100vw"} h={"100vh"}>
            <Spinner size={"lg"} />
        </Flex>
    }
    return (
        <>
            <Hero />
            <TopJobs />
        </>
    )
}

export default Home
