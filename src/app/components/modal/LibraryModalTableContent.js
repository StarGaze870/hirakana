import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function LibraryTable({ rows = [] }) {
  return (
    <Table sx={{ minWidth: 10, tableLayout: 'fixed', minHeight: '400px', height: '400px' }} aria-label="simple table">
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.a.romaji}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center" className='p-0'>
              {CharacterCellBox(row.a)}
            </TableCell>
            <TableCell align="center" className='p-0'>
              {CharacterCellBox(row.e)}
            </TableCell>
            <TableCell align="center" className='p-0'>
              {CharacterCellBox(row.i)}
            </TableCell>
            <TableCell align="center" className='p-0'>
              {CharacterCellBox(row.o)}
            </TableCell>
            <TableCell align="center" className='p-0'>
              {CharacterCellBox(row.u)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const CharacterCellBox = (data) => {
  return (
    <div className='d-flex flex-column pt-2'>
      <h5 className='fw-bolder'>{data.character}</h5>
      <h5 className='opacity-50 m-0 fs-6'>{data.romaji}</h5>
    </div>
  );
}