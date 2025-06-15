import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Chip,
    Stack,
} from "@mui/material";
import Review from "./Review";

const renderStatus = (status) => {
    return (
        <Chip
            label={status}
            variant="outlined"
            style={{
                width: status === "completeRequested" ? "150px" : "100px",
                border: "none",
                backgroundColor:
                    status === "initiated"
                        ? "orange"
                        : status === "accecpted"
                        ? "green"
                        : status === "denied" || status === "cancelled"
                        ? "red"
                        : status === "completeRequested"
                        ? "orange"
                        : "green",
                color: "#FFF",
                marginTop: "10px",
            }}
        />
    );
};

function JobView({ user, job }) {
    return (
        <div style={{ width: "100%" }}>
            <div
                style={{
                    width: "650px",
                    margin: "auto",
                    marginBottom: "25px",
                    padding: "25px",
                    borderRadius: "8px",
                    background: "#bfe1d8",
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        height: "100%",
                        textAlign: "left",
                        margin: "auto",
                    }}
                >
                    <CardHeader
                        title={
                            <Typography
                                variant="body"
                                sx={{ textTransform: "capitalize" }}
                                style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                            >
                                {job.title}
                            </Typography>
                        }
                    />
                    <CardContent sx={{ pt: 0 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                            gutterBottom
                        >
                            {job.body}
                        </Typography>
                        <Typography
                            variant="body"
                            sx={{ mt: 2 }}
                            style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                display: "block",
                            }}
                        >
                            {`${job.price} $`}
                        </Typography>
                        <Typography
                            variant="body"
                            style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                display: "block",
                            }}
                        >
                            {`${job.days} days`}
                        </Typography>
                        {renderStatus(job.status)}
                    </CardContent>
                </Card>
                <Review job={job} user={user} />
            </div>
        </div>
    );
}

export default JobView;
