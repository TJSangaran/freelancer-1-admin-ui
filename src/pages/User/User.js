import {
    Box,
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
    Stack,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import PersonalInfo from "./PersonalInfo";
import { useParams } from "react-router-dom";
import UserJobs from "./Jobs/UserJobs";

const User = () => {
    const { userId } = useParams();
    const [user, userLoading] = useFetch(`/user/${userId}`);
    if (userLoading) return "Loading...";
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mb: 2,
                                }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{
                                        width: "50%",
                                        height: "auto",
                                        aspectRatio: "1 / 1",
                                        fontSize: "5rem",
                                    }}
                                >
                                    {user.firstname[0]?.toUpperCase() +
                                        user.lastname[0]?.toUpperCase()}
                                </Avatar>
                            </Box>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                textAlign="center"
                            >
                                {user.firstname + " " + user.lastname}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                textAlign="center"
                            >
                                {user.isErrand ? "Errand" : "Job Poster"}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                textAlign="center"
                            >
                                {user.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={8} xs={12}>
                    <PersonalInfo user={user} />
                </Grid>
            </Grid>
            <UserJobs user={user} />
        </>
    );
};

export default User;
