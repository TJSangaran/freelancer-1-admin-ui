import { Card, CardContent, Grid, Button, Chip } from "@mui/material";
import PersonalInfoItem from "./PersonalInfoItem";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const PersonalInfo = ({ user }) => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <PersonalInfoItem
                        field="First Name"
                        value={user.firstname}
                    />
                    <PersonalInfoItem field="Last Name" value={user.lastname} />
                    <PersonalInfoItem field="Email" value={user.email} />
                    <PersonalInfoItem field="Phone" value={user.phone} />
                    <PersonalInfoItem field="Phone" value={user.phone} />
                    <PersonalInfoItem field="Balance" value={user.balance} />
                    {user.address.street && (
                        <PersonalInfoItem
                            field="Street"
                            value={user.address.street}
                        />
                    )}
                    {user.address.town && (
                        <PersonalInfoItem
                            field="Town"
                            value={user.address.town}
                        />
                    )}
                    <PersonalInfoItem field="City" value={user.address.city} />
                    <PersonalInfoItem
                        field="Country"
                        value={user.address.country}
                    />
                    {user.dob && (
                        <PersonalInfoItem
                            field="Date of birth"
                            value={new Date(user.dob).toDateString()}
                        />
                    )}
                    {user.tags?.length && (
                        <PersonalInfoItem
                            field="Tags"
                            row={user.tags.length > 3}
                            value={user.tags.map((tag) => (
                                <Chip sx={{ m: 0.5 }} key={tag} label={tag} />
                            ))}
                        />
                    )}
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="right"
                    alignItems="right"
                >
                    <Grid item sx={{ mr: 3, mt: 3, mb: 1 }}>
                        <Link to={`/users/edit/${user._id}`}>
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                sx={{ borderRadius: 2 }}
                            >
                                Edit
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PersonalInfo;
