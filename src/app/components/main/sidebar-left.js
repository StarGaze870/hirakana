import { Autocomplete, Avatar, Button, IconButton, Tooltip } from "@mui/material";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import PauseIcon from '@mui/icons-material/Pause';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'streak', label: 'Streak', minWidth: 5 },
    { id: 'date', label: 'Date', minWidth: 10 },
];

const rows = [
    { streak: 6, date: 'May 10, 8:55 PM' },
    { streak: 6, date: 'May 10, 8:55 PM' },
    { streak: 6, date: 'May 10, 8:55 PM' },
    { streak: 6, date: 'May 10, 8:55 PM' },
    { streak: 6, date: 'May 10, 8:55 PM' },
    { streak: 6, date: 'May 10, 8:55 PM' },
    { streak: 6, date: 'May 10, 8:55 PM' },
    { streak: 6, date: 'May 10, 8:55 PM' },
]

export const MainSidebarLeft = () => {

    const defaultProps = {
        options: players,
        getOptionLabel: (option) => option.name,
    };

    const [value, setValue] = React.useState(null);

    return (
        <div className="d-flex flex-fill flex-column pb-5">

            {/* PROFILE */}
            <div className="d-flex flex-column">
                <span className="opacity-50 ps-1 pt-1 pb-1">Player</span>
                <div className="d-flex flex-row align-items-center px-1">
                    <div className="pt-3 pe-3">
                        <Avatar
                            src="https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/470152297_1665764977338906_7137820824601376450_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Z_z4MG-yhkoQ7kNvwHcfYEl&_nc_oc=AdkryP6Tly_ViQp8PwZUixcYBhleTVowO1C5BD0IvvnvidQXwiayvzudVLecYHgY6EY&_nc_zt=23&_nc_ht=scontent-nrt1-1.xx&_nc_gid=1DytzufewIWFguLx_GytpQ&oh=00_AfIvUH0h7FXMdcT4ZwtweTzTeU3WaTnMqNSXi6R48kbsXg&oe=6824DC43"
                            {...stringAvatar('ALESA')}
                        />
                    </div>
                    <div className="col d-flex flex-fill pt-4">
                        <Autocomplete
                            value={{ name: 'Alyssa Jumapao' }}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            fullWidth
                            {...defaultProps}
                            id="disable-clearable"
                            disableClearable
                            renderInput={(params) => (
                                <TextField {...params} label="" variant="standard" />
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* STOPWATCH */}
            <Button>
                <Tooltip className='' title='Pause / Resume' placement='auto'>
                    <div className="d-flex justify-content-center align-items-center flex-row py-5 gap-3">
                        <h1 className="m-0 text-black opacity-50" style={{ fontSize: '3.5rem' }}>00:00:00</h1>
                        <PauseIcon className='opacity-75' color="error" />
                        {/* <PlayArrowIcon className='opacity-75' color="success" /> */}
                    </div>
                </Tooltip>
            </Button>

            {/* STREAK TABLE */}
            <div className="d-flex flex-fill flex-column">
                <div className="ps-2">
                    <Tooltip className="p-0" title='Library' placement='auto'>
                        <IconButton>
                            <SwapHorizIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className={`d-flex flex-column flex-lg-grow-1`} style={{ height: 300 }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, maxWidth: column.minWidth, backgroundColor: '', textAlign: '', color: 'black', fontWeight: 'bold' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.japanese}>
                                            {columns.map((column) => {
                                                return (
                                                    <TableCell key={column.id} align='left' sx={{ maxWidth: '10px' }}>
                                                        {row[column.id]}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            
        </div >
    );
}

// ------------------ AVATAR COLOR GENERATOR ------------------

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {

    const nameArray = name.trim().split(/\s+/);
    const arrayLength = nameArray.length;

    if (arrayLength > 1) {
        name = `${nameArray[0][0]}${nameArray[1][0]}`;
    } else if (arrayLength === 1 && nameArray[0].length > 1) {
        name = `${nameArray[0][0]}${nameArray[0][1]}`;
    } else if (arrayLength === 1 && nameArray[0].length === 1) {
        name = `${nameArray[0][0]}`;
    }

    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: name.toUpperCase(),
    };
}

const players = [
    { name: '--- New Player ---' },
    { name: 'Alyssa Jumapao' },
    { name: 'Lj Vincent Tudtud' },
    { name: 'Raph Bacordio' },
    { name: 'Aleck Sumalinog' },
    { name: 'Victor Cudillo' },
    { name: 'Kj Luab' },
    { name: 'Jelord Butal' },
];