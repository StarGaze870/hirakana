import { Autocomplete, Avatar, IconButton, Tooltip } from "@mui/material";
import TextField from '@mui/material/TextField';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stopwatch from "./stopwatch-left";
import AddnewPlayerModal from "../modal/AddNewPlayerModal";
import { useEffect, useState } from "react";
import { getCurrentUser, getUsersData, insertNewUserName, setCurrentUserSelected } from "./mainFunctions";
import { ADD_NEW_PLAYER } from "@/app/constants";

const columns = [
    { id: 'streak', label: 'Streak', minWidth: 5 },
    { id: 'date', label: 'Date', minWidth: 10 },
];

const rows = [
    { streak: 6, date: 'May 10, 8:55 PM' },
]

export const MainSidebarLeft = ({
    stopwatchStartTimeRef,
    stopwatchElapsedTimeRef,
    isStopwatchRunning,
    setIsStopwatchRunning,
    restartToggled,
}) => {

    const [userNames, setUserNames] = useState([]);
    const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        setupUserData();
    }, [])

    useEffect(() => {
        if (selectedUser) {
            setCurrentUserSelected(selectedUser.username);
        }
    }, [selectedUser])

    function setupUserData() {
        let userData = getUsersData();
        userData = [{ username: ADD_NEW_PLAYER }, ...userData]
        const filtered = userData.map((e) => ({ username: e.username }));

        const savedUser = getCurrentUser()
            ? { username: getCurrentUser() }
            : filtered.length > 1
                ? filtered[1]
                : filtered[0]

        setSelectedUser(savedUser);
        setUserNames(filtered);
    }

    const defaultProps = {
        options: userNames,
        getOptionLabel: (option) => option.username,
    };

    const playerOnChange = (event, newValue) => {
        if (newValue.username === ADD_NEW_PLAYER) {
            openAddNewPlayerModal();
            return;
        }
        setSelectedUser(newValue);
    }

    const handleOnAddNewPlayer = (name) => {
        insertNewUserName(name);
        setupUserData();
        closeAddNewPlayerModal();
    }

    const handleAddNewPlayerWhenEmpty = () => {
        if (userNames.length === 1) {
            openAddNewPlayerModal();
        }
    }

    const openAddNewPlayerModal = () => {
        setIsAddPlayerModalOpen(true);
    }

    const closeAddNewPlayerModal = () => {
        setIsAddPlayerModalOpen(false);
    }

    return (
        <div className="d-flex flex-fill flex-column pb-5">

            <AddnewPlayerModal isModalOpen={isAddPlayerModalOpen} handleYesOnClick={handleOnAddNewPlayer} handleNoOnClick={closeAddNewPlayerModal} />

            {/* PROFILE */}
            <div className="d-flex flex-column">
                <span className="opacity-50 ps-1 pt-1 pb-1">Player</span>
                <div className="d-flex flex-row align-items-center px-1">
                    <div className="pt-3 pe-3">
                        <Avatar
                            {...stringAvatar(selectedUser?.username || 'NP')}
                        />
                    </div>
                    <div className="col d-flex flex-fill pt-4">
                        <Autocomplete
                            value={userNames.length > 1 ? selectedUser : { username: ADD_NEW_PLAYER }}
                            onChange={playerOnChange}
                            fullWidth
                            {...defaultProps}
                            id="disable-clearable"
                            disableClearable
                            renderInput={(params) => (
                                <TextField {...params} onClick={handleAddNewPlayerWhenEmpty} label="" variant="standard" />
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* STOPWATCH */}
            <Stopwatch
                startTimeRef={stopwatchStartTimeRef}
                elapsedRef={stopwatchElapsedTimeRef}
                isRunning={isStopwatchRunning}
                setIsRunning={setIsStopwatchRunning}
                reset={restartToggled}
            />

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
                                    <TableRow hover key={row.streak} role="checkbox" tabIndex={-1}>
                                        <TableCell align='left' sx={{ maxWidth: '10px' }}>
                                            {row.streak}
                                        </TableCell>
                                        <TableCell align='left' sx={{ maxWidth: '10px' }}>
                                            {row.date}
                                        </TableCell>
                                    </TableRow>

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

    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;

        // Bias: boost red, lighten green and blue
        if (i === 0) {
            // Red component
            value = Math.min(255, Math.floor(value * 0.7 + 100)); // 100–255
        } else {
            // Green & Blue component
            value = Math.min(255, Math.floor(value * 0.4 + 120)); // 120–223
        }

        color += `00${value.toString(16)}`.slice(-2);
    }

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