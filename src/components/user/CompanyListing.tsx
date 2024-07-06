import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import SidebarMenu from "../common/SidebarMenu"; // Adjust the path as needed
import { styled } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";

interface Data {
  id: number;
  companyName: string;
  currentPrice: number;
  previousPrice: number;
  changeAmount: number;
  changePercentage: number;
}

function createData(
  id: number,
  companyName: string,
  currentPrice: number,
  previousPrice: number,
  changeAmount: number,
  changePercentage: number
): Data {
  return {
    id,
    companyName,
    currentPrice,
    previousPrice,
    changeAmount,
    changePercentage,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "companyName",
    numeric: false,
    disablePadding: true,
    label: "Company Name",
  },
  {
    id: "currentPrice",
    numeric: true,
    disablePadding: false,
    label: "Company Price",
  },
  {
    id: "previousPrice",
    numeric: true,
    disablePadding: false,
    label: "Daily High",
  },
  {
    id: "changeAmount",
    numeric: true,
    disablePadding: false,
    label: "Price Change",
  },
  {
    id: "changePercentage",
    numeric: true,
    disablePadding: false,
    label: "Percentage Change",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (sortType: string) => {
    console.log(`Sort by ${sortType}`);
    // Add your sorting logic here
    handleClose();
  };

  return (
    <div>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Listed Company Details
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton onClick={handleClick}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "filter-button",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("name")}>
          Sort by name
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("price")}>
          Sort by price
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("date")}>
          Sort by date
        </MenuItem>
      </Menu>
    </div>
  );
}

const Company = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("companyName");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Data[]>([]);
  const [isLoading, setisLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const response = await fetch(
          "https://mocki.io/v1/4ee1c87b-a6f6-4a06-a26c-0a470c0f4349"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: Data[] = await response.json();
        setisLoading(false)
        console.log(data);
        //const processedData = data.map(item => createData(item.id, item.companyName, item.currentPrice, item.previousPrice, item.changeAmount, item.changePercentage));
        //console.log(processedData);
        setRows(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  /*const rows = [
      createData(1, 'HDFC Bank', 1783.80, 1794, 67, 4.3),
      createData(2, 'ICICI Bank', 650.70, 660, 5, 0.8),
      createData(3, 'Reliance Industries', 2350.20, 2370, 12, 0.5),
      createData(4, 'Tata Motors', 460.50, 470, 8, 1.7),
      createData(5, 'Infosys', 1530.15, 1545, 10, 0.7),
      createData(6, 'Wipro', 440.30, 450, 6, 1.4),
      createData(7, 'Bharti Airtel', 705.25, 710, 4, 0.6),
      createData(8, 'Maruti Suzuki', 7650.60, 7700, 20, 0.3),
      createData(9, 'Hindustan Unilever', 2335.75, 2350, 7, 0.3),
      createData(10, 'Larsen & Toubro', 1575.80, 1590, 9, 0.6),
      createData(11, 'Bajaj Finance', 7150.40, 7200, 15, 0.2),
      createData(12, 'HCL Technologies', 1055.60, 1070, 12, 1.1),
      createData(13, 'Axis Bank', 715.50, 725, 6, 0.8),
      createData(14, 'SBI', 425.80, 430, 3, 0.7),
      createData(15, 'Mahindra & Mahindra', 780.30, 790, 8, 1.0),
      createData(16, 'TCS', 3475.20, 3500, 18, 0.5),
      createData(17, 'Titan Company', 2005.75, 2020, 10, 0.5),
      createData(18, 'Nestle India', 18650.80, 18700, 20, 0.1),
      createData(19, 'Kotak Mahindra Bank', 1740.90, 1750, 6, 0.3),
      createData(20, 'Asian Paints', 3105.25, 3120, 12, 0.4),
      createData(21, 'Hindalco', 385.60, 390, 7, 1.8),
      createData(22, 'ITC', 245.70, 250, 5, 2.0),
      createData(23, 'Power Grid', 210.80, 215, 4, 1.9),
      createData(24, 'JSW Steel', 670.50, 675, 6, 0.9),
      createData(25, 'Adani Ports', 745.35, 750, 8, 1.1),
      createData(26, 'Tech Mahindra', 1135.45, 1145, 5, 0.4),
      createData(27, 'Ultratech Cement', 7215.50, 7250, 25, 0.3),
      createData(28, 'Grasim', 1520.75, 1530, 7, 0.5),
      createData(29, 'Sun Pharma', 825.80, 835, 6, 0.7),
      createData(30, 'IndusInd Bank', 1025.60, 1035, 8, 0.8),
      createData(31, 'BPCL', 380.20, 385, 4, 1.1),
      createData(32, 'Cipla', 990.50, 1000, 5, 0.5),
      createData(33, 'Dr. Reddy\'s', 4925.40, 4950, 15, 0.3),
      createData(34, 'Eicher Motors', 2580.25, 2600, 10, 0.4),
      createData(35, 'GAIL', 144.75, 146, 3, 2.1),
      createData(36, 'Hero MotoCorp', 3105.60, 3120, 8, 0.3),
      createData(37, 'IOC', 105.70, 107, 2, 1.9),
      createData(38, 'ONGC', 165.80, 168, 3, 1.8),
      createData(39, 'NTPC', 140.50, 142, 2, 1.4),
      createData(40, 'Coal India', 135.25, 137, 2, 1.5),
      createData(41, 'Bajaj Auto', 3805.75, 3825, 12, 0.3),
      createData(42, 'Britannia', 3650.60, 3670, 15, 0.4),
      createData(43, 'Shree Cement', 27750.80, 28000, 50, 0.2),
      createData(44, 'Zee Entertainment', 295.70, 300, 6, 2.0),
      createData(45, 'Tata Steel', 1105.80, 1120, 10, 0.9),
      createData(46, 'Yes Bank', 14.50, 15, 0.5, 3.6),
      createData(47, 'Vedanta', 345.35, 350, 6, 1.8),
      createData(48, 'DLF', 320.45, 325, 5, 1.6),
      createData(49, 'SBI Life Insurance', 1025.55, 1035, 8, 0.8),
      createData(50, 'ICICI Prudential', 620.25, 630, 5, 0.8)
    ];*/

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  // const visibleRows = React.useMemo(

  //   () =>

  //     stableSort(rows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage,
  //     ),
  //   [order, orderBy, page, rowsPerPage],
  // );

  const visibleRows = React.useMemo(() => {
    console.log("Computing visible rows");
    return stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [rows, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SidebarMenu />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {isLoading && (
                  Array(6)
                  .fill(1)
                  .map(() => 
                  
                  <TableRow>
                  <TableCell>
                  <Skeleton animation='wave' style={{margin: "5px 0"}}  variant='text' /> 
                  </TableCell>
                  <TableCell>
                  <Skeleton animation='wave' style={{margin: "5px 0"}}  variant='text' /> 
                  </TableCell>
                  <TableCell>
                  <Skeleton animation='wave' style={{margin: "5px 0"}}  variant='text' /> 
                  </TableCell>
                  <TableCell>
                  <Skeleton animation='wave' style={{margin: "5px 0"}}  variant='text' /> 
                  </TableCell>
                  <TableCell>
                  <Skeleton animation='wave' style={{margin: "5px 0"}}  variant='text' /> 
                  </TableCell>
                  <TableCell>
                  <Skeleton animation='wave' style={{margin: "5px 0"}}  variant='text' /> 
                  </TableCell>
                  </TableRow>)
                  
                )}
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.companyName}
                      </TableCell>
                      <TableCell align="right">{row.currentPrice}</TableCell>
                      <TableCell align="right">{row.previousPrice}</TableCell>
                      <TableCell align="right">{row.changeAmount}</TableCell>
                      <TableCell align="right">
                        {row.changePercentage}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};
export default Company;
