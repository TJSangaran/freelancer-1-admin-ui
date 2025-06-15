import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    Stack,
    Avatar,
    IconButton,
    Typography,
    Container,
    CssBaseline,
    Box,
    Grid,
    Button,
    TextField,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import { red } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'


import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from "formik";
import { useNavigate } from "react-router-dom";


import {
    InputAdornment
} from "@mui/material";

import { useAuth } from "../../context/AuthContext";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const SignIn = () => {
    const navigate = useNavigate()

    const { login } = useAuth()
    const [err, setErr] = useState('')

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            login(values.email, values.password, values.rememberMe)
                .then(() => {
                    navigate('/', { replace: true });
                })
                .catch(error => {
                    setErr('invalid credentials')
                    setSubmitting(false)
                })
        }
    })

    const { errors, touched, values, isSubmitting, setSubmitting, handleChange, handleSubmit, setFieldValue, getFieldProps, resetForm } = formik;

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <FormikProvider value={formik} >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        size='small'
                        variant="standard"
                        autoComplete="email"
                        autoFocus
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        size='small'
                        name="password"
                        label="Password"
                        type="password"
                        variant="standard"
                        id="password"
                        autoComplete="current-password"
                        {...getFieldProps("password")}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        name='rememberMe'
                        {...getFieldProps("rememberMe")}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    {/* <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item >
                            <Link to="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid> */}

                </Box>
            </FormikProvider>
        </React.Fragment>
    )
}
export default SignIn