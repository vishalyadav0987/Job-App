import React, { useEffect, useState } from 'react';
import JobCard from '../../Components/JobCard/JobCard';
import { Box, Flex, Grid, Heading, Spinner } from '@chakra-ui/react';
import FilterCard from '../../Components/Filteration/Filteration';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, getAllJobsForUser } from '../../redux/actions/jobActions';
import toast from 'react-hot-toast';

const JobPage = () => {
    const { keyword } = useParams();
    const [salary, setSalary] = useState([10000000, 250000000]);
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const { error, loading, jobs } = useSelector(state => state.adminAllJobs);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        dispatch(getAllJobsForUser(keyword, salary, location, title));
        console.log(salary, title, location);
    }, [dispatch, keyword, salary, location, title]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return (
            <Flex w="100vw" h="60vh" alignItems="center" justifyContent="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <Box px={12} mb={8}>
            <Heading my={8}>Filter Job</Heading>
            <Flex direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                <FilterCard
                    salary={salary}
                    setSalary={setSalary}
                    location={location}
                    setLocation={setLocation}
                    title={title}
                    setTitle={setTitle}
                />
                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)'
                    }}
                    gap={4}
                    mt={{ base: 8, lg: 0 }}
                >
                    {jobs && jobs.length > 0 ? (
                        jobs.map((job) => <JobCard key={job._id} job={job} />)
                    ) : (
                        <Flex position={'absolute'} right={"45%"} top={"20%"}>
                            <Heading size="md" >No jobs found.</Heading>
                        </Flex>
                    )}
                </Grid>
            </Flex>
        </Box>
    );
};

export default JobPage;
