import React from 'react';
import JobCard from '../../Components/JobCard/JobCard';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import FilterCard from '../../Components/Filteration/Filteration';

const JobPage = () => {
    return (
        <>
            <Box px={12} mb={8}>
                <Heading my={8}>Filter Job</Heading>
                <Flex justifyContent={"space-between"}>
                    <FilterCard />
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
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                    </Grid>
                </Flex>
            </Box>
        </>
    );
}

export default JobPage;
