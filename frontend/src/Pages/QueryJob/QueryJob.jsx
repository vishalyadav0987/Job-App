import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllJobsForUser } from '../../redux/actions/jobActions';
import { Box, Button, Flex, Heading, Spinner } from '@chakra-ui/react';
import JobCard from '../../Components/JobCard/JobCard';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const QueryJob = () => {
    const { searchQueryuery } = useSelector(state => state.queryForSearch);
    const { jobs, error, loading } = useSelector(state => state.adminAllJobs);
    const [filteredJob, setFilteredJob] = useState([]);
    useEffect(() => {
        getAllJobsForUser();
    }, []);
    useEffect(() => {
        const filterJob = jobs && jobs?.length > 0 &&
            jobs.filter((job) => {
                return job?.title?.toLowerCase().includes(searchQueryuery.toLowerCase()) ||
                    job?.comapanyId?.name?.toLowerCase().includes(searchQueryuery.toLowerCase());
            });
        setFilteredJob(filterJob);
    }, [searchQueryuery, jobs])

    if (loading) {
        return (

            <Flex w={"100vw"} height={"60vh"} alignItems={"center"} justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>

        )
    }
    return (
        <>
            <Box px={16} py={10} minH={"55vh"}>
                <Heading mb={10} size={"md"}>Search Job ({filteredJob && filteredJob?.length || "0"})</Heading>
                {
                    (filteredJob && filteredJob?.length > 0) ?
                        filteredJob.map((job) => {
                            return (
                                <JobCard job={job} key={job?._id} />
                            )
                        }) : (

                            <>
                                <Heading mb={10} size={"md"}>
                                    Job not found!.
                                </Heading>
                                <Link to={'/'}>
                                    <Button display={"flex"} alignItems={"center"}>
                                        <FaArrowAltCircleLeft style={{marginRight:"8px"}}/> 
                                        Back To Home</Button>
                                </Link>
                            </>

                        )
                }
            </Box>
        </>
    )
}

export default QueryJob
