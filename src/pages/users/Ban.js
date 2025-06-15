import React, { useState } from "react";
import { FormControlLabel, Switch, Chip } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

function Ban({ row }) {
    const [banned, setBanned] = useState(row.banned);
    const [loading, setLoading] = useState(false);
    const { customFetch } = useAuth();

    const updateUserBan = async (value) => {
        setLoading(true);
        const headers = {
            "Content-Type": "application/json",
        };
        const body = JSON.stringify({ banned: value });
        const response = await (
            await customFetch(`/users/ban/${row._id}`, {
                method: "PUT",
                headers,
                body,
            })
        ).json();
        if (response.status) {
            setBanned(value);
        }
        setLoading(false);
    };

    return (
        <FormControlLabel
            value="vaa"
            control={
                <Switch
                    checked={!banned}
                    onChange={(e) => updateUserBan(!e.target.checked)}
                    color="primary"
                    disabled={loading}
                />
            }
            label={
                <Chip
                    label={banned ? "Banned" : "Not Banned"}
                    variant="outlined"
                    style={{
                        width: "100%",
                        border: "none",
                        backgroundColor: banned ? "red" : "green",
                        color: "#FFF",
                    }}
                />
            }
            labelPlacement="end"
        />
    );
}

export default Ban;
