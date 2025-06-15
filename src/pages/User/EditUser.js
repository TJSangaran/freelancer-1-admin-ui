import React, { useState } from "react";
import {
    Typography,
    Box,
    Grid,
    Button,
    TextField,
    Card,
    CardHeader,
    Stack,
    Avatar,
    IconButton,
    Container,
    CssBaseline,
    FormControlLabel,
    Checkbox,
    Alert,
} from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { Outlet } from "react-router-dom";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as Yup from "yup";
import { FormikProvider, useFormik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import TagField from "../../components/input/tagField";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";

const EditUser = () => {
    const { customFetch } = useAuth();
    const { userId } = useParams();
    const [user, userLoading] = useFetch(`/user/${userId}`);
    const navigate = useNavigate();
    const [err, setErr] = useState("");

    const handleTagChange = (tags) => {
        setFieldValue("tags", tags);
    };

    const initialValues = {
        firstName: user.firstname,
        lastName: user.lastname,
        phone: user.phone,
        description: user.description,
        tags: user.tags || [],
        street: user.address?.street,
        town: user.address?.town,
        city: user.address?.city,
        country: user.address?.country,
        dob: new Date(user.dob)?.toJSON()?.split("T")?.[0] || "",
        // accountNumber: '',
        // accountName: '',
        // bankName: '',
        readyToWork: user.readyToWork,
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        phone: Yup.string().required("required"),
        city: Yup.string().required("Required"),
        // accountNumber: Yup.string().required('Required'),
        // accountName: Yup.string().required('Required'),
        // bankName: Yup.string().required('Required'),
        country: Yup.string().required("Required"),
        dob: Yup.date()
            .required("Date of birth is required")
            .test(
                "DOB",
                "Please choose a valid date of birth",
                (date) => moment().diff(moment(date), "years") >= 18
            ),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            const data = {
                address: {
                    city: values.city,
                    town: values.town,
                    street: values.street,
                    country: values.country,
                },
                readyToWork: values.readyToWork,
                firstname: values.firstName,
                lastname: values.lastName,
                phone: values.phone,
                description: values.description,
                tags: values.tags,
                dob: values.dob,
            };
            customFetch(`/user/update/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((res) => {
                    return res.json();
                })
                .then((resp) => {
                    if (resp.status) {
                        navigate(`/users/${user._id}`, { replace: true });
                    } else {
                        setErr("Some error occured");
                    }
                })
                .catch((error) => {
                    setErr("Some error occured");
                    setSubmitting(false);
                });
        },
    });
    const {
        errors,
        touched,
        values,
        isSubmitting,
        setSubmitting,
        handleChange,
        handleSubmit,
        setFieldValue,
        getFieldProps,
        resetForm,
        setFieldError,
    } = formik;

    return (
        <Container component="main" maxWidth="sm">
            {userLoading ? (
                <div>loadding...</div>
            ) : (
                <Card sx={{ p: 2, pt: 1, boxShadow: 2, mt: 1 }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            // marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <ModeEditOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit User Data
                        </Typography>
                        <FormikProvider value={formik}>
                            <Form onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <Grid container spacing={2}>
                                    {!!err && (
                                        <Alert color="error">{err}</Alert>
                                    )}
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            //name="firstName"
                                            size="small"
                                            fullWidth
                                            //id="firstName"
                                            label="First Name"
                                            variant="standard"
                                            {...getFieldProps("firstName")}
                                            error={Boolean(
                                                touched.firstName &&
                                                    errors.firstName
                                            )}
                                            helperText={
                                                touched.firstName &&
                                                errors.firstName
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            //id="lastName"
                                            label="Last Name"
                                            //name="lastName"
                                            variant="standard"
                                            {...getFieldProps("lastName")}
                                            error={Boolean(
                                                touched.lastName &&
                                                    errors.lastName
                                            )}
                                            helperText={
                                                touched.lastName &&
                                                errors.lastName
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            //id="phone"
                                            label="Phone Number"
                                            //name="phone"
                                            variant="standard"
                                            {...getFieldProps("phone")}
                                            error={Boolean(
                                                touched.phone && errors.phone
                                            )}
                                            helperText={
                                                touched.phone && errors.phone
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            label="Street"
                                            //name="street"
                                            variant="standard"
                                            {...getFieldProps("street")}
                                            error={Boolean(
                                                touched.street && errors.street
                                            )}
                                            helperText={
                                                touched.street && errors.street
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            label="Town"
                                            //name="town"
                                            variant="standard"
                                            {...getFieldProps("town")}
                                            error={Boolean(
                                                touched.town && errors.town
                                            )}
                                            helperText={
                                                touched.town && errors.town
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            label="City"
                                            //name="city"
                                            variant="standard"
                                            {...getFieldProps("city")}
                                            error={Boolean(
                                                touched.city && errors.city
                                            )}
                                            helperText={
                                                touched.city && errors.city
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            label="Country"
                                            //name="country"
                                            variant="standard"
                                            {...getFieldProps("country")}
                                            error={Boolean(
                                                touched.country &&
                                                    errors.country
                                            )}
                                            helperText={
                                                touched.country &&
                                                errors.country
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="date"
                                            label="DOB"
                                            //name="dob"
                                            variant="standard"
                                            {...getFieldProps("dob")}
                                            error={Boolean(
                                                touched.dob && errors.dob
                                            )}
                                            helperText={
                                                touched.dob && errors.dob
                                            }
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Account Name"
                                //name="accountName"
                                variant="standard"
                                {...getFieldProps("accountName")}
                                error={Boolean(touched.accountName && errors.accountName)}
                                helperText={touched.accountName && errors.accountName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Account Number"
                                //name="accountNumber"
                                variant="standard"
                                {...getFieldProps("accountNumber")}
                                error={Boolean(touched.accountNumber && errors.accountNumber)}
                                helperText={touched.accountNumber && errors.accountNumber}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Bank Name"
                                //name="bankName"
                                variant="standard"
                                {...getFieldProps("bankName")}
                                error={Boolean(touched.bankName && errors.bankName)}
                                helperText={touched.bankName && errors.bankName}
                            />
                        </Grid> */}
                                    <Grid item xs={12}>
                                        <TextField
                                            size="small"
                                            multiline
                                            rows={3}
                                            fullWidth
                                            //id="description"
                                            label="Description"
                                            //name="description"
                                            variant="standard"
                                            {...getFieldProps("description")}
                                            error={Boolean(
                                                touched.description &&
                                                    errors.description
                                            )}
                                            helperText={
                                                touched.description &&
                                                errors.description
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TagField
                                            onTagChange={handleTagChange}
                                            tags={values.tags}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : "Save"}
                                </Button>
                            </Form>
                        </FormikProvider>
                    </Box>
                </Card>
            )}
        </Container>
    );
};
export default EditUser;
