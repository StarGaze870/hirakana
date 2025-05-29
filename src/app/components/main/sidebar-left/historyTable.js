import { useEffect, useMemo, useState } from "react";
import { visuallyHidden } from '@mui/utils';
import { Box, IconButton, Skeleton, TableSortLabel, Tooltip } from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getComparator } from "../mainFunctions";

export const HistoryTable = ({
    tableHeaders = [],
    tableData = [],
    handleOnSwitchTables = () => console.error("handleOnSwitchTables is not set"),

}) => {

    const [isLoadBlankData, setIsLoadBlankData] = useState(false);

    const [orderBy, setOrderBy] = useState('date');
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoadBlankData(tableData.length == 0);
        }, 1200);

        return () => clearTimeout(timeout);
    }, [tableData]);

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = useMemo(
        () =>
            [...tableData]
                .sort(getComparator(order, orderBy)),
        [order, orderBy, tableData],
    );

    return (
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
                    <Table stickyHeader aria-label="sticky table" size="medium">
                        <TableHead>
                            <TableRow>
                                {(isLoadBlankData || visibleRows.length != 0) ? tableHeaders.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={'left'}
                                        padding={'none'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                        style={{ minWidth: headCell.minWidth, maxWidth: headCell.minWidth, backgroundColor: '', textAlign: '', color: 'black', fontWeight: headCell.fw }}
                                        onClick={createSortHandler(headCell.id)}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                        >
                                            {headCell.label}
                                            {orderBy === headCell.id ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))
                                    : <TableCell>
                                        <div className="d-flex flex-column gap-3">
                                            <Skeleton variant="rectangular" height={40} />
                                            <Skeleton variant="rectangular" height={200} />
                                        </div>
                                    </TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={index}
                                        sx={{ userSelect: 'none' }}
                                    >
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
    );
}