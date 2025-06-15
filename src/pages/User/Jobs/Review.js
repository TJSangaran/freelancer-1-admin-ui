import React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    Rating,
} from "@mui/material";
import { red } from "@mui/material/colors";

function Review({ job, user }) {
    const review = user.isErrand ? job.jobPosterReview : job.errandReview;
    const reviewer = user.isErrand ? job.jobPoster[0] : job.errand[0];
    return (
        <>
            {review && review.rating !== undefined && (
                <div style={{ width: "100%", marginTop: "15px" }}>
                    <Card
                        sx={{
                            width: "600px",
                            height: "100%",
                            textAlign: "left",
                            margin: "auto",
                        }}
                    >
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ bgcolor: red[500] }}
                                    aria-label="recipe"
                                >
                                    {reviewer.firstname
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </Avatar>
                            }
                            title={
                                <Typography
                                    variant="body"
                                    sx={{ textTransform: "capitalize" }}
                                    style={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                    }}
                                >{`${reviewer.firstname} ${reviewer.lastname}`}</Typography>
                            }
                            // subheader={moment(createdAt).format('MMMM DD, YYYY') || "September 14, 2016"}
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <Rating
                                name="read-only"
                                value={review.rating}
                                readOnly
                                size="large"
                            />
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                paragraph
                                gutterBottom
                            >
                                {review.reviewMessage}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}

export default Review;
