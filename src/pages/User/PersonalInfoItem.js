import { Card, CardContent, Grid, Typography } from "@mui/material";

const PersonalInfoItem = ({ field, value, row = false }) => {
    return (
        <Grid row={row} item md={row ? 12 : 6} xs={12}>
            <Typography variant="body" color="text.secondary">
                <b>{field} </b>
                {value}
            </Typography>
        </Grid>
    );
};

export default PersonalInfoItem;
