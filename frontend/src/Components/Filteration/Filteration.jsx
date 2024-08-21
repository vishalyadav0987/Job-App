import { Box, Flex, Heading, Radio, RadioGroup, Stack, Text, useColorMode } from '@chakra-ui/react';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const { colorMode } = useColorMode()
    return (
        <Box
            bg={colorMode === "dark" ? "#2d3748" : "#ffffff"}
            p={5} px={8} h={"fit-content"}
            boxShadow={"rgba(0, 0, 0, 0.1) 0px 1px 4px"}
            borderRadius={"8px"}
        >
            <Flex direction="column" gap={4}>
                {filterData.map((filter, index) => (
                    <Box key={index}>
                        <Heading size="md" mb={3}>{filter.filterType}</Heading>
                        <RadioGroup>
                            <Stack>
                                {filter.array.map((item, idx) => (
                                    <Radio key={idx} value={item}>{item}</Radio>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default FilterCard;
