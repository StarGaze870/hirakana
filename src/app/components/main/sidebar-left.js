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
import { DateNow_MMDDmmms, formatTime, getCurrentUser, getStreakAndLap, getUsersData, insertNewUserName, setCurrentUserSelected } from "./mainFunctions";
import { SIDE_BAR_LEFT_LAP_TABLE as LAP_TABLE, SIDE_BAR_LEFT_LAP_HEADERS, SIDE_BAR_LEFT_STREAK_HEADERS } from "@/app/constants";
import { SIDE_BAR_LEFT_STREAK_TABLE as STREAK_TABLE } from "@/app/constants";
import { ADD_NEW_PLAYER } from "@/app/constants";

export const MainSidebarLeft = ({
    stopwatchStartTimeRef,
    stopwatchElapsedTimeRef,
    isStopwatchRunning,
    setIsStopwatchRunning,
    restartToggled,
    isGameEnded,

}) => {

    const [userNames, setUserNames] = useState([]);
    const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // TABLE HISTORY
    const [tableData, setTableData] = useState([]);
    const [streakData, setStreakData] = useState([]);
    const [lapData, setLapData] = useState([]);

    const [selectedTable, setSelectedTable] = useState(LAP_TABLE);
    const [tableHeaders, setTableHeaders] = useState(SIDE_BAR_LEFT_LAP_HEADERS);

    useEffect(() => {
        setupUserData();
    }, [])

    useEffect(() => {
        setUserTableData();
    }, [selectedTable])

    useEffect(() => {
        loadUsersData();
    }, [stopwatchElapsedTimeRef.current]);

    function loadUsersData() {
        let { streak, lap } = getStreakAndLap();

        streak = streak.map(e => ({ streak: e.c, date: DateNow_MMDDmmms(e.d) }));
        lap = lap.map(e => ({ lap: formatTime(e.t), date: DateNow_MMDDmmms(e.d) }));

        setUserTableData(streak, lap, true);
        setStreakData(streak);
        setLapData(lap);
    }

    function setUserTableData(rawStreak = [], rawLap = [], useLocal = false) {
        if (selectedTable == LAP_TABLE) {
            setTableData(useLocal ? rawLap : lapData);
            setTableHeaders(SIDE_BAR_LEFT_LAP_HEADERS);
        }
        else if (selectedTable == STREAK_TABLE) {
            setTableData(useLocal ? rawStreak : streakData);
            setTableHeaders(SIDE_BAR_LEFT_STREAK_HEADERS);
        }
    }

    useEffect(() => {
        if (selectedUser) {
            setCurrentUserSelected(selectedUser.username);

            const timer = setTimeout(() => {
                loadUsersData();
            }, 3);

            return () => clearTimeout(timer);
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

    const handleOnSwitchTables = () => {
        setSelectedTable(!selectedTable)
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
                isGameEnded={isGameEnded}
            />

            {/* STREAK TABLE */}
            <div className="d-flex flex-fill flex-column">
                <div className="ps-2">
                    <Tooltip className="p-0" title='Library' placement='auto'>
                        <IconButton onClick={handleOnSwitchTables}>
                            <SwapHorizIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className={`d-flex flex-column flex-lg-grow-1`} style={{ height: 300 }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {tableHeaders.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            className={column.opacity}
                                            style={{ minWidth: column.minWidth, maxWidth: column.minWidth, backgroundColor: '', textAlign: '', color: 'black', fontWeight: column.fw }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row, index) => {
                                    return (
                                        <TableRow hover key={index} role="checkbox" tabIndex={-1}>
                                            <TableCell align='left' sx={{ maxWidth: '10px' }}>
                                                {row.streak ?? row.lap}
                                            </TableCell>
                                            <TableCell align='left' sx={{ maxWidth: '10px' }}>
                                                {row.date}
                                            </TableCell>
                                        </TableRow>)
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