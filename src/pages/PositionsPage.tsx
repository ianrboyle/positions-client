import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCreateIndustryMutation, useCreateSectorMutation, useFetchUserQuery } from "../store";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Box,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Modal,
} from "@mui/material";
// components
import { Icon } from "@iconify/react";
import Scrollbar from "../components/scrollbar";
import SkeletonAnimation from "../components/progress/Skeleton";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import { IPosition } from "../models/position.model";
import { CreateNewSectorForm } from "../components/forms/CreateNewSectorForm";
import { CreateNewIndustryForm } from "../components/forms/CreateNewIndustryForm";
import { ISectorDto, IndustryDto } from "../models/member.model";
import { tickerSearch } from "../services/positions.server";
import { ModalForm } from "../components/forms/ModalForm";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "symbol", label: "Symbol", alignRight: false },
  { id: "sharesOwned", label: "Shares Owned", alignRight: false },
  { id: "companyName", label: "Company Name", alignRight: false },
  { id: "currentTotalValue", label: "Current Total Value", alignRight: false },
  { id: "sectorName", label: "Sector Name", alignRight: false },
  { id: "industryName", label: "Industry Name", alignRight: false },
  { id: "" },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// ----------------------------------------------------------------------

function applySortFilter(
  array: IPosition[] | null,
  comparator: (a: IPosition, b: IPosition) => number,
  query?: string
) {
  // if (array) {
  //   const stabilizedThis = array.map((el, index) => [el, index]);
  //   stabilizedThis.sort((a, b) => {
  //     const order = comparator(a[0], b[0]);
  //     if (order !== 0) return order;
  //     return a[1] - b[1];
  //   });
  //   if (query) {
  //     return filter(array, (_user) => _user.symbol.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  //   }
  //   return stabilizedThis.map((el) => el[0]);
  // }
  return array;
}

const appendNames = (positions: IPosition[], sectors: ISectorDto[], industries: IndustryDto[]) => {
  const newPositions: IPosition[] = [];
  if (positions && industries && sectors) {
    positions.forEach((p) => {
      const newObj = Object.assign({}, p);
      newObj.sectorName = sectors.find((s) => s.id === p.sectorId)?.sectorName
        ? sectors.find((s) => s.id === p.sectorId)?.sectorName
        : "";
      newObj.industryName = industries.find((i) => i.id === p.industryId)?.industryName;
      newPositions.push(newObj);
      return newObj;
    });
  }
  console.log(newPositions);
  return newPositions;
};

export default function PositionsPage() {
  // const { data, error, isLoading } = useFetchPositionsQuery();
  const { data, error, isLoading } = useFetchUserQuery();

  // sector modal
  const sectorMutationHook = useCreateSectorMutation as any;
  const [openCreateSectorModal, setOpenCreateSectorModal] = useState(false);
  const handleOpenCreateSectorModal = () => setOpenCreateSectorModal(true);
  const handleCloseCreateSectorModal = () => setOpenCreateSectorModal(false);

  //industry modal
  const industryMutationHook = useCreateIndustryMutation as any;
  const [openCreateIndustryModal, setOpenCreateIndustryModal] = useState(false);
  const handleOpenCreateIndustryModal = () => setOpenCreateIndustryModal(true);
  const handleCloseCreateIndustryModal = () => setOpenCreateIndustryModal(false);

  const loadedPositions = !isLoading ? data?.positions : [];

  const sectors = !isLoading ? data?.sectors : [];
  const industries = !isLoading ? data?.industries : [];
  const positions = loadedPositions && sectors && industries ? appendNames(loadedPositions, sectors, industries) : [];

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [positionId, setPositionId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState<keyof IPosition>("symbol");
  const [filterName, setFilterName] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    console.log(id);
    console.log("event: ", event.currentTarget);
    setOpenPopover(event.currentTarget);
    setPositionId(id);
  };

  const handleCloseMenu = () => {
    setOpenPopover(null);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IPosition) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = positions ? positions.map((n) => n.id) : null;
      if (newSelecteds) setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
    console.log(newSelected);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 && positions ? Math.max(0, (1 + page) * rowsPerPage - positions.length) : 0;

  // const filteredPositions = positions ? applySortFilter(positions, getComparator(order, orderBy), filterName) : null;
  const filteredPositions = positions;
  // const isNotFound = !filteredPositions.length && !!filterName;
  const isNotFound = false;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      {isLoading ? (
        <SkeletonAnimation />
      ) : data && data?.sectors?.length > 0 ? (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Positions
            </Typography>
            <Button variant="contained" onClick={handleOpenCreateSectorModal} startIcon={<Icon icon="eva:plus-fill" />}>
              Create New Sector
            </Button>
            <Button
              variant="contained"
              onClick={handleOpenCreateIndustryModal}
              startIcon={<Icon icon="eva:plus-fill" />}
            >
              Create New Industry
            </Button>
          </Stack>
          <Modal
            open={openCreateSectorModal}
            onClose={handleCloseCreateSectorModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={3}>
                <ModalForm
                  entityName="Sector"
                  sectors={sectors}
                  mutationHook={sectorMutationHook}
                  handleClose={handleCloseCreateSectorModal}
                />
              </Stack>
            </Box>
          </Modal>
          <Modal
            open={openCreateIndustryModal}
            onClose={handleCloseCreateIndustryModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={3}>
                <ModalForm
                  entityName="Industry"
                  sectors={sectors}
                  industries={industries}
                  mutationHook={industryMutationHook}
                  handleClose={handleCloseCreateIndustryModal}
                />
              </Stack>
            </Box>
          </Modal>

          {positions && filteredPositions ? (
            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={positions.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredPositions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, symbol, sharesOwned, companyName, currentTotalValue, sectorName, industryName } =
                          row;
                        const selectedPosition = selected.indexOf(id) !== -1;

                        return (
                          <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedPosition}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={selectedPosition} onChange={(event) => handleClick(event, id)} />
                            </TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                {/* <Avatar alt={symbol} src={avatarUrl} /> */}
                                <Typography variant="subtitle2" noWrap>
                                  {symbol}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{sharesOwned}</TableCell>

                            <TableCell align="left">{companyName}</TableCell>

                            <TableCell align="left">{currentTotalValue}</TableCell>
                            {/* <TableCell align="left">{currentValue}</TableCell> */}
                            {sectorName ? <TableCell align="left">{sectorName}</TableCell> : null}
                            {industryName ? <TableCell align="left">{industryName}</TableCell> : null}

                            <TableCell align="right">
                              <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id)}>
                                <Icon icon={"eva:more-vertical-fill"} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={positions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          ) : null}
        </Container>
      ) : null}
      <Popover
        open={Boolean(openPopover)}
        anchorEl={openPopover}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Icon icon={"eva:edit-fill"} />
          <Link to={`/dashboard/position/${positionId}`}>Edit</Link>
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Icon icon={"eva:trash-2-outline"} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
