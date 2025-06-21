import React from "react";
import useFetch from "../../../hooks/useFetch";
import {
    Box,
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
    Stack,
} from "@mui/material";
import JobView from "./JobView";

function UserJobs({ user }) {
    const [jobs, jobsLoading] = useFetch(
        `/jobs/${user.isErrand ? "errand" : "jobPoster"}/${user._id}`
    );
    return (
        <>
            {jobsLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {jobs.length ? (
                        <>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                                sx={{ m: 3, mt: 5, mb: 2 }}
                            >
                                Jobs
                            </Typography>
                            <Stack spacing={2}>
                                {jobs.map((job, id) => (
                                    <JobView key={job._id} user={user} job={job} />
                                ))}
                            </Stack>
                        </>
                    ) : (
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ m: 2 }}
                        >
                            No Jobs
                        </Typography>
                    )}
                </>
            )}
        </>
    );
}

export default UserJobs;
