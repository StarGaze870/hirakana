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
    height = 300,
    handleOnSwitchTables = () => console.error("handleOnSwitchTables is not set"),

}) => {

    const [orderBy, setOrderBy] = useState('date');
    const [order, setOrder] = useState('asc');

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
            {(visibleRows.length == 0) ?
                <div className="d-flex flex-fill justify-content-center" style={{ minHeight: 325.63 }}>
                    <div className="d-flex" style={{ maxWidth: 300 }}>
                        <img
                            src="nyan.png"
                            alt="Ad Banner"
                            className="img-fluid object-fit-cover opacity-75"
                        />
                    </div>
                </div>
                : <>
                    <div className="ps-2">
                        <Tooltip className="p-0" title='Library' placement='auto'>
                            <IconButton onClick={handleOnSwitchTables}>
                                <SwapHorizIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={`d-flex flex-column flex-lg-grow-1`} style={{ height: height }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table" size="medium">
                                <TableHead>
                                    <TableRow>
                                        {tableHeaders.map((headCell) => (
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
                                        ))}
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
                </>
            }
        </div>
    );
}