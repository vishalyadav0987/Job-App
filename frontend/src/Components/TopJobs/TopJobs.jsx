import { Box, Flex, Grid, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import JobCard from '../JobCard/JobCard'
import { useLocation } from 'react-router-dom'

const TopJobs = ({ arrayOfTopJob }) => {
    const location = useLocation();

    return (
        <>
            <Box width={"100%"} py={4} mb={8}>
                <Box width={"85%"}
                    margin={"0 auto"}
                >
                    <Flex gap={2} alignItems={"center"} mb={12}>
                        <Heading color={"#48bb78"}>
                            Latest and Top
                        </Heading>
                        <Heading>
                            Job Openings
                        </Heading>
                    </Flex>
                    <Grid
                        templateColumns={
                            {
                                base: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(2, 1fr)',
                                lg: 'repeat(3, 1fr)'
                            }
                        }
                        gap={4}
                    >
                        {arrayOfTopJob && arrayOfTopJob.length > 0 ? (
                            arrayOfTopJob.map((job) => <JobCard
                                pathName={location.pathname}
                                key={job._id} job={job} />)
                        ) : (
                            <Flex>
                                <Heading size="md" >No jobs found.</Heading>
                            </Flex>
                        )}

                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default TopJobs
