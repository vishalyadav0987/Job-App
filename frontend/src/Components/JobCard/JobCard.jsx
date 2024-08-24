import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Avatar,
    Box,
    Heading,
    IconButton,
    Button,
    Text,
    Stack
} from '@chakra-ui/react'
import { FaRegBookmark } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const JobCard = ({ pathName, job }) => {
    return (
        <>
            <Link to={`/job/detail/${job?._id}`}>
                <Card maxW='sm'
                    overflow="hidden"  // ensures content overflow is handled
                    maxH={"450px"}
                >
                    <CardHeader>
                        <Flex spacing='3'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                {
                                    !pathName &&
                                    <Avatar name='Segun Adebayo' src={job && job?.comapanyId?.logoImg} />

                                }
                                <Box>
                                    <Heading size='sm'>{job && job?.comapanyId?.name}</Heading>
                                    <Text color={"#c5c5c5"}>{job && job?.comapanyId?.location}</Text>
                                </Box>
                            </Flex>
                            {
                                !pathName &&
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'
                                    icon={<FaRegBookmark />}
                                />
                            }
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
                            <Heading size='sm'>{job && job?.title}</Heading>
                            {
                                !pathName && <Text size={"xs"} color={"#c5c5c5"}>2 days ago</Text>
                            }
                        </Flex>
                        <Text>
                            {job && job?.description}
                        </Text>
                    </CardBody>


                    <CardFooter display={"flex"} flexDirection={"column"} gap={0}>
                        <Flex flexWrap='wrap'
                            sx={{
                                '& > button': {
                                    minW: '50px',
                                },
                            }}
                        >
                            <Button flex='1'
                                fontSize={"14px"}
                                color={"#4ec7c2"} variant='ghost' leftIcon={<FaUserCheck />}>
                                {job && job?.position} Position
                            </Button>
                            <Button flex='1'
                                fontSize={"14px"}
                                color={"#48bb78"}
                                variant='ghost' leftIcon={<FaHourglassHalf />}>
                                {job && job?.jobType}
                            </Button>
                            <Button flex='1'
                                fontSize={"14px"}
                                variant='ghost' color={"#0596e8"} leftIcon={<FaMoneyCheckAlt />}>
                                {job && job?.salary} LPA
                            </Button>
                        </Flex>
                        {
                            !pathName && <Stack mt={8} direction={'row'} spacing={4}>
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    _focus={{
                                        bg: 'gray.200',
                                    }}>
                                    Details
                                </Button>
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    bg={'#48bb78'}
                                    color={'white'}
                                    boxShadow={
                                        '0px 1px 25px -5px #48bb7894, 0 10px 10px -15px #fff'
                                    }
                                    _hover={{
                                        bg: '#39b96f',
                                    }}
                                    _focus={{
                                        bg: '#39b96f',
                                    }}>
                                    Save For Later
                                </Button>
                            </Stack>
                        }
                    </CardFooter>
                </Card>
            </Link>

        </>
    )
}

export default JobCard;
