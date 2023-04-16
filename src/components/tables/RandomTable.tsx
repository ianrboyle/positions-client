import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useFetchPositionsQuery } from '../../store';
import { IPosition } from '../../models/position.model';

interface Column {
  id: 'symbol' | 'sharesOwned' | 'id' | 'companyName' | 'currentPrice' | 'industryId' | 'purchasePrice' | 'totalCostBasis' | 'averageCostBasis' | 'sectorId';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'symbol', label: 'Symbol', minWidth: 170 },
  { id: 'sharesOwned', label: 'Shares Owned', minWidth: 100 },
  {
    id: 'id',
    label: 'Id',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'companyName',
    label: 'Company Name',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'currentPrice',
    label: 'Current Price',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'industryId',
    label: 'industryId',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'purchasePrice',
    label: 'purchase Price',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'totalCostBasis',
    label: 'totalCostBasis',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'averageCostBasis',
    label: 'averageCostBasis',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'sectorId',
    label: 'sectorId',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

// const rows: IPosition[] = [];

export default function BasicTable(rows: any) {
  // const { data, error, isLoading } = useFetchPositionsQuery(null);
  // const rows: IPosition[] = data;
  console.log(rows.rows)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            
            { rows?.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}