import React from "react";
import DataTable from "../../components/DataTable";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import PreviewIcon from "@mui/icons-material/Preview";
import EditIcon from "@mui/icons-material/Edit";
import Ban from "./Ban";
import { IconButton, Tooltip } from "@mui/material";

const columns = [
    {
        name: "firstname",
        label: "Full Name",
        render: (row, id) => `${row.firstname} ${row.lastname}`,
    },
    {
        name: "email",
        label: "Email",
    },
    {
        name: "isErrand",
        label: "Errand/ Job Poster",
        render: (row, id) => (row.isErrand ? "Errand" : "Job Poster"),
    },
    {
        name: "banned",
        label: "Activity",
        render: (row, id) => <Ban row={row} />,
    },
    {
        name: "",
        label: "Actions",
        render: (row, id) => {
            return (
                <>
                    <IconButton
                        aria-label="add to favorites"
                        component={Link}
                        to={`/users/${row._id}`}
                    >
                        <Tooltip title="View User" placement="top-start" arrow>
                            <PreviewIcon style={{ color: "blue" }} />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        aria-label="add to favorites"
                        component={Link}
                        to={`/users/edit/${row._id}`}
                    >
                        <Tooltip title="Edit User" placement="top-start" arrow>
                            <EditIcon style={{ color: "blue" }} />
                        </Tooltip>
                    </IconButton>
                </>
            );
        },
    },
];

const Users = () => {
    const [users, usersLoading] = useFetch(`/users`);

    if (usersLoading) return "Loading...";
    return (
        <DataTable
            rows={users}
            columns={columns}
            tableHeading="Users"
            searchLabel="Search title..."
        />
    );
};
export default Users;
