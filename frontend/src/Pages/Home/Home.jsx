import React, { useEffect } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import Hero from '../../Components/HeroSection/Hero';
import TopJobs from '../../Components/TopJobs/TopJobs';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getAllJobsForUser } from '../../redux/actions/jobActions';
import toast from 'react-hot-toast';

const Home = () => {
    const { loading: userLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { error, loading, jobs } = useSelector((state) => state.adminAllJobs);

    let arrayOfTopJob = [];
    if (jobs) {
        arrayOfTopJob = jobs
            .filter((job) => job.salary >= 600000)
            .slice(0, 6);
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        // Fetch jobs regardless of the user's authentication status
        dispatch(getAllJobsForUser());
    }, [dispatch, error]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading || userLoading) {
        return (
            <Flex w="100vw" h="80vh" alignItems="center" justifyContent="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <>
            <Hero />
            <TopJobs arrayOfTopJob={arrayOfTopJob} />
        </>
    );
};

export default Home;
