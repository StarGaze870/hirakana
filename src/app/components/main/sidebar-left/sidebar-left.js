import { Autocomplete, Avatar } from "@mui/material";
import TextField from '@mui/material/TextField';
import Stopwatch from "./stopwatch-left";
import AddnewPlayerModal from "../../modal/AddNewPlayerModal";
import { useEffect, useState } from "react";
import { DateNow_MMDDmmms, formatTime, getCurrentUser, getCurrentUserStreakAndLap, getUsersData, insertNewUserName, setCurrentUserSelected, stringAvatar } from "../mainFunctions";
import { LAP_COLUMNS, SIDE_BAR_LEFT_LAP_TABLE as LAP_TABLE, SIDE_BAR_LEFT_LAP_HEADERS, SIDE_BAR_LEFT_STREAK_HEADERS, STREAK_COLUMNS } from "@/app/constants";
import { SIDE_BAR_LEFT_STREAK_TABLE as STREAK_TABLE } from "@/app/constants";
import { ADD_NEW_PLAYER } from "@/app/constants";
import { HistoryTable } from "./historyTable";

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
    const [tableColumns, setTableColumns] = useState(LAP_COLUMNS);

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
        let { streak, lap } = getCurrentUserStreakAndLap();

        streak = streak.map(e => ({
            streak: e.c,
            date: DateNow_MMDDmmms(e.d),
            date_int: e.d,
            streak_int: parseInt(e.c)
        }));

        lap = lap.map(e => ({
            lap: formatTime(e.t),
            date: DateNow_MMDDmmms(e.d),
            date_int: e.d,
            lap_int: e.t,
        }));

        setUserTableData(streak, lap, true);
        setStreakData(streak);
        setLapData(lap);
    }

    function setUserTableData(rawStreak = [], rawLap = [], useLocal = false) {
        if (selectedTable == LAP_TABLE) {
            setTableData(useLocal ? rawLap : lapData);
            setTableHeaders(SIDE_BAR_LEFT_LAP_HEADERS);
            setTableColumns(LAP_COLUMNS);
        }
        else if (selectedTable == STREAK_TABLE) {
            setTableData(useLocal ? rawStreak : streakData);
            setTableHeaders(SIDE_BAR_LEFT_STREAK_HEADERS);
            setTableColumns(STREAK_COLUMNS);
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
            <HistoryTable
                tableHeaders={tableHeaders}
                tableColumns={tableColumns}
                tableData={tableData}
                defaultSortByColumn="lap"
                handleOnSwitchTables={handleOnSwitchTables}
            />

        </div >
    );
}