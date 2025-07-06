'use client'

import { Box, Container, Tab, Tabs } from "@mui/material";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { HistoryTable } from "../components/main/sidebar-left/historyTable";
import { LAP_COLUMNS, LEADERBOARDS_LAP_COLUMNS, LEADERBOARDS_LAP_HEADERS, LEADERBOARDS_STREAK_COLUMNS, LEADERBOARDS_STREAK_HEADERS, SIDE_BAR_LEFT_LAP_HEADERS, SIDE_BAR_LEFT_LAP_TABLE, SIDE_BAR_LEFT_STREAK_HEADERS, SIDE_BAR_LEFT_STREAK_TABLE } from "../constants";
import { DateNow_MMDDmmms, DECRYPT_NAME, formatTime, getStreakAndLap } from "../components/main/mainFunctions";

export default function Leaderboards() {

    const [tabValue, setTabValue] = useState(0);

    const [tableData, setTableData] = useState([]);

    const [lapData, setLapData] = useState([]);
    const [streakData, setStreakData] = useState([]);

    const [selectedTable, setSelectedTable] = useState(SIDE_BAR_LEFT_LAP_TABLE);
    const [tableHeaders, setTableHeaders] = useState(LEADERBOARDS_LAP_HEADERS);
    const [tableColumns, setTableColumns] = useState(LEADERBOARDS_LAP_COLUMNS);

    // ------------------------------------------------ USE EFFECT 

    useEffect(() => {

        const usersData = getStreakAndLap();
        let usersBestRecords = [];
        let streakDataTemp = [];
        let lapDataTemp = [];

        Object.keys(usersData).map((key, index) => {
            const rawData = usersData[key];
            const lap = rawData.lap;
            const streak = rawData.streak;

            const bestRecordIndex = lap.reduce((minIdx, curr, idx, arr) => {
                return curr.t < arr[minIdx].t ? idx : minIdx;
            }, 0);

            usersBestRecords.push({ user: key, lap: lap[bestRecordIndex], streak: streak[bestRecordIndex] })
        })

        usersBestRecords.forEach(item => {
            if (!item.lap || !item.streak) {
                return;
            }

            lapDataTemp.push({
                user: DECRYPT_NAME(item.user),
                time: formatTime(item.lap.t),
                date: DateNow_MMDDmmms(item.lap.d),
                user_int: item.user.charCodeAt(0),
                date_int: item.lap.d,
                time_int: item.lap.t,
            });
            streakDataTemp.push({
                user: DECRYPT_NAME(item.user),
                streak: item.streak.c,
                date: DateNow_MMDDmmms(item.streak.d),
                user_int: item.user.charCodeAt(0),
                date_int: item.streak.d,
                streak_int: item.streak.c,
            });
        });

        setLapData(lapDataTemp);
        setStreakData(streakDataTemp);
        setTableData(lapDataTemp);

    }, [])

    // ------------------------------------------------ FUNCTIONS

    const handleTabChange = (event, newValue) => {

        if (newValue == 0) {
            setTableData(lapData);
            setTableHeaders(LEADERBOARDS_LAP_HEADERS);
            setTableColumns(LEADERBOARDS_LAP_COLUMNS);
        }
        else if (newValue == 1) {
            setTableData(streakData);
            setTableHeaders(LEADERBOARDS_STREAK_HEADERS);
            setTableColumns(LEADERBOARDS_STREAK_COLUMNS);
        }
        setTabValue(newValue);
    };

    return (
        <div className="d-flex app-bar-margin">
            <Container maxWidth="lg">
                <h1 className="mt-5 fw-bold">Leaderboards</h1>
                <p className="text-justify px-1 pt-4 pb-2">{DEFINITION}</p>

                <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}
                            slotProps={{
                                indicator: {
                                    style: { backgroundColor: 'red' }
                                }
                            }}
                            textColor='inherit'
                            aria-label="basic tabs example">
                            <Tab label="Completion Time" sx={{ color: tabValue == 0 ? 'red' : '' }} {...a11yProps(0)} />
                            <Tab label="Total Streak" sx={{ color: tabValue == 1 ? 'red' : '' }} {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <div className="pt-3">
                        <HistoryTable
                            tableHeaders={tableHeaders}
                            tableColumns={tableColumns}
                            tableData={tableData}
                            showSwitchTables={false}
                            defaultSortByColumn="time"
                            height={"100%"}
                        />
                    </div>
                </Box>
            </Container>
        </div>
    );
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className={`h-100 ${value != index ? 'd-none' : 'd-flex'}`}
            role='tabpanel'
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div className='d-flex flex-grow-1'>{children}</div>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const BEST_COMPLETION_TIME_STR = "Best Completion Time";
const BEST_STREAKS_STR = "Best Total Streaks";

const DEFINITION = `This table shows your best completion times for each session.
            It automatically saves your fastest records so you can track your improvement over time.
            Each entry includes the time and the date it was recorded.
            You can sort the table by time or date to compare runs more easily.
            You can also switch between Best Lap and Best Streaks to see different types of records based on your performance.`;