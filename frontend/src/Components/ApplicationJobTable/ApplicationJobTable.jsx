import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorMode } from '@chakra-ui/react'
import React from 'react'

const ApplicationJobTable = ({ applications }) => {
    const { colorMode } = useColorMode();
    console.log(applications)
    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <TableCaption>A list of your applied jobs</TableCaption>
                    <Thead>
                        <Tr borderBottom="2px solid black">
                            <Th>Date</Th>
                            <Th>Job Role</Th>
                            <Th>Company</Th>
                            <Th textAlign={"center"}>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            applications && applications?.length > 0 &&
                            applications.map((application) => {
                                return (
                                    <Tr borderBottom="1px solid black" key={application?._id}>
                                        <Td>
                                            {
                                                applications &&
                                                application.createdAt.substring(0, 10)
                                                    .split("-")
                                                    .reverse()
                                                    .join("-")
                                            }
                                        </Td>
                                        <Td>{applications && application.jobId?.title}</Td>
                                        <Td>{applications && application.jobId?.comapanyId?.name}</Td>
                                        <Td textAlign={"center"}><Button bg={colorMode === "light"
                                            ? "#edf2f7" : "#3c3c3c"} color={
                                                application?.status === "pending" ? "#ff5733" : "#48bb78"
                                            }
                                            >
                                            {applications && application.status}
                                        </Button></Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

// {appliedJob.status.toUpperCase()}

export default ApplicationJobTable
