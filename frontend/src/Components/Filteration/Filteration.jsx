import { Box, Flex, Heading, Radio, RadioGroup, Stack, useColorMode } from '@chakra-ui/react';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
        state: "location",
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
        state: "industry",
    },
    {
        filterType: "Salary",
        array: ["100000L-1000000L", "1000000L-1200000L", "1200000L-1400000L"],
        state: "salary",
    },
];

const FilterCard = ({ salary, setSalary, location, setLocation, title: industry, setTitle: setIndustry }) => {
    const { colorMode } = useColorMode();

    const handleRadioChange = (value, state) => {
        switch (state) {
            case "location":
                setLocation(value);
                break;
            case "industry":
                setIndustry(value);
                break;
            case "salary":
                setSalary(value);
                break;
            default:
                break;
        }
    };

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
                        <RadioGroup
                            value={
                                filter.state === "location" ? location :
                                    filter.state === "industry" ? industry :
                                        filter.state === "salary" ? salary :
                                            ""
                            }
                            onChange={(value) => handleRadioChange(value, filter.state)}
                        >
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
