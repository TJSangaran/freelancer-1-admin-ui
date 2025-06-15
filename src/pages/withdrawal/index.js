import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import useFetch from '../../hooks/useFetch'
import { Chip, IconButton, Typography } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from '../../context/AuthContext';


const Withdrawal = () => {
    const [withdrawals, withdrawalsLoading] = useFetch('/withdrawalRequests')
    const [rows, setRows] = useState([])
    const [successMsg, setSuccessMsg] = useState('')

    useEffect(() => { setRows(withdrawals) }, [withdrawals])

    const [status, setStatus] = useState({})
    const { customFetch } = useAuth()
    const [data, setData] = useState({})

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event, row) => {
        setSuccessMsg('')
        setData(row)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const columns = [
        {
            name: 'name',
            label: 'Name',
            render: row => `${row.user.firstname} ${row.user.lastname}`
        },
        {
            name: 'bank',
            label: 'Bank Details',
            render: row => (
                <>
                    <Typography variant="body2" component="h2">
                        <b>Bank Name</b> {row.user.bankname}
                    </Typography>
                    <Typography variant="body2" component="h2">
                        <b>Account Name</b> {row.user.accountname}
                    </Typography>
                    <Typography variant="body2" component="h2">
                        <b>Account Number</b> {row.user.accountnumber}
                    </Typography>
                </>
            )
        },
        {
            name: 'userPhone',
            label: 'Phone Number'
        },
        {
            name: 'userEmail',
            label: 'Email'
        },
        {
            name: 'amount',
            label: 'Amount'
        },
        {
            name: 'createdAt',
            label: 'Date',
            fieldRenderType: 'date'
        },
        {
            name: 'status',
            label: 'Status',
            render: (row, id) => {
                return (
                    <Chip
                        label={
                            row['status'] &&
                            (row['status'])
                        }
                        key={id}
                        variant="outlined"
                        style={{
                            width: "100%",
                            border: "none",
                            backgroundColor:
                                row['status'] === "initiated"
                                    ? "orange"
                                    : row['status'] === "accecpted"
                                        ? "green"
                                        : 'red',
                            color: "#FFF",
                        }}
                    />
                )
            }
        },
        {
            label: 'Change Status',
            render: (row, id) => {
                return (
                    <IconButton disabled={row.status !== 'initiated'} color="primary" aria-label="upload picture" component="span" key={id} onClick={(e) => handleClick(e, row)}>
                        <DriveFileRenameOutlineIcon />
                    </IconButton>
                )
            }
        }
    ]

    const handleSubmit = (e, status) => {
        e.preventDefault();
        // customFetch(`/withdrawalRequests/status/${data._id}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({status})
        // })
        fetch(process.env.REACT_APP_API_HOST + `/withdrawalRequests/status/${data._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    const index = rows.findIndex(object => {
                        return object._id === data._id;
                    });

                    if (index !== -1) {
                        (rows[index].status = status);
                        setSuccessMsg('Success')
                    }
                } else {
                    console.log('error')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => { setRows(rows) }, [successMsg])

    if (withdrawalsLoading) return 'Loading...'
    return (
        <React.Fragment>
            <DataTable
                rows={rows}
                columns={columns}
                tableHeading='Withdrawal Requests'
                searchLabel='Search user...'
                searchKeyWord='userName'
            />
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <MenuItem onClick={(e) => handleSubmit(e, 'accecpted')}>
                    <ListItemIcon>
                        <HandshakeIcon fontSize="small" />
                    </ListItemIcon>
                    Accepted
                </MenuItem>
                <MenuItem onClick={(e) => handleSubmit(e, 'denied')}>
                    <ListItemIcon>
                        <CancelIcon fontSize="small" />
                    </ListItemIcon>
                    Denied
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
export default Withdrawal