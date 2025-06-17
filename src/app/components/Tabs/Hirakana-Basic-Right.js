import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'isCorrect', label: 'Is Correct', minWidth: 5 },
    { id: 'japanese', label: 'Japanese', minWidth: 10 },
    { id: 'romaji', label: 'Romaji', minWidth: 10 },
];

export const HirakanaBasicRightSide = ({
    rows = [],
    overflowY = "",
    minHeight = "",
}) => {

    return (
        <TableContainer className={`${overflowY}`} style={{ minHeight: minHeight }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth, maxWidth: column.minWidth, backgroundColor: 'beige', textAlign: 'center', color: 'red' }}
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
                                        <TableCell key={column.id} align='center' sx={{ maxWidth: '10px' }}>
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
    );
}