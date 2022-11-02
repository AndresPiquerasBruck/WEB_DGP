import axios from "axios"
import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Header from "./Header"
import { SERVER_HOST } from "../config/global_constants"
import "../css/AdminAlumPrincipal.css"
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';

function createData(DNI, Nombre, Apellidos, Curso,) {
   return {
      DNI,
      Nombre,
      Apellidos,
      Curso
   };
}

<<<<<<< HEAD
const rows = [
   createData('12345678AZ', 'Manuel','Sanchez Jimenez' ,4),
   createData('123456788B', 'Jose','Sanchez Jimenez' ,4),
   
];

function descendingComparator(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
=======
   constructor(props) {
      super(props);
      
      this.state = {
         error: null,
         mounted: false,
         alumnos: []
      };
>>>>>>> main
   }
   return 0;
}

<<<<<<< HEAD
function getComparator(order, orderBy) {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
   const stabilizedThis = array.map((el, index) => [el, index]);
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
         return order;
      }
      return a[1] - b[1];
   });
   return stabilizedThis.map((el) => el[0]);
}

const headCells = [
   {
      id: 'DNI',
      numeric: false,
      disablePadding: true,
      label: 'DNI',
   },
   {
      id: 'Nombre',
      numeric: true,
      align: 'center',
      disablePadding: false,
      label: 'Nombre',
   },
   {
      id: 'Apellidos',
      numeric: true,
      disablePadding: false,
      label: 'Apellidos',
   },
   {
      id: 'Curso',
      numeric: true,
      disablePadding: false,
      label: 'Curso ',
   },

];

function EnhancedTableHead(props) {
   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
   const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
   };

   return (
      <TableHead>
         <TableRow>
            <TableCell padding="checkbox">
               <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{
                     'aria-label': 'select all desserts',
                  }}
               />
            </TableCell>
            {headCells.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
               >
                  <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : 'asc'}
                     onClick={createSortHandler(headCell.id)}
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
   );
}

EnhancedTableHead.propTypes = {
   numSelected: PropTypes.number.isRequired,
   onRequestSort: PropTypes.func.isRequired,
   onSelectAllClick: PropTypes.func.isRequired,
   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
   orderBy: PropTypes.string.isRequired,
   rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
   const { numSelected } = props;

   return (
      <Toolbar
         sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
               bgcolor: (theme) =>
                  alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
         }}
      >
         {numSelected > 0 ? (
            <Typography
               sx={{ flex: '1 1 100%' }}
               color="inherit"
               variant="subtitle1"
               component="div"
            >
               {numSelected} selected
            </Typography>
         ) : (
            <Typography
               sx={{ flex: '1 1 100%' }}
               variant="h6"
               id="tableTitle"
               component="div"
            >
               ALUMNADO
            </Typography>
         )}
      </Toolbar>
   );
}

EnhancedTableToolbar.propTypes = {
   numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
   const [order, setOrder] = React.useState('asc');
   const [orderBy, setOrderBy] = React.useState('Nombre');
   const [selected, setSelected] = React.useState([]);
   const [page, setPage] = React.useState(0);
   const [dense, setDense] = React.useState(false);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelected = rows.map((n) => n.DNI);
         setSelected(newSelected);
         return;
      }
      setSelected([]);
   };

   const handleClick = (event, DNI) => {
      const selectedIndex = selected.indexOf(DNI);
      let newSelected = [];

      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, DNI);
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
         );
      }

      setSelected(newSelected);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleChangeDense = (event) => {
      setDense(event.target.checked);
   };

   const isSelected = (DNI) => selected.indexOf(DNI) !== -1;

   // Avoid a layout jump when reaching the last page with empty rows.
   const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

   return (
      <div>
         <Header></Header>
         <div className="Tabla">
            <Box sx={{ width: '100%'}}>
               <Paper sx={{ width: '100%', mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer>
                     <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
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
                           {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                           {stableSort(rows, getComparator(order, orderBy))
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                 const isItemSelected = isSelected(row.DNI);
                                 const labelId = `enhanced-table-checkbox-${index}`;

                                 return (
                                    <TableRow
                                       hover
                                       onClick={(event) => handleClick(event, row.DNI)}
                                       role="checkbox"
                                       aria-checked={isItemSelected}
                                       tabIndex={-1}
                                       key={row.DNI}
                                       selected={isItemSelected}
                                    >
                                       <TableCell padding="checkbox">
                                          <Checkbox
                                             color="primary"
                                             checked={isItemSelected}
                                             inputProps={{
                                                'aria-labelledby': labelId,
                                             }}
                                          />
                                       </TableCell>
                                       <TableCell
                                          component="th"
                                          id={labelId}
                                          scope="row"
                                          padding="none"
                                       >
                                          {row.DNI}
                                       </TableCell>
                                       <TableCell align="right">{row.Nombre}</TableCell>
                                       <TableCell align="right">{row.Apellidos}</TableCell>
                                       <TableCell align="right">{row.Curso}</TableCell>
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
         </div>
      </div>

   );
}

<<<<<<< HEAD
=======
=======
   componentDidMount(){
      axios({
         method: "get",
         url: `${SERVER_HOST}/Users/alumnos`,
         data: null,
         headers: { "Content-Type": "multipart/form-data" },
     }).then(res => {
         //handle success
         this.setState({alumnos: res.data}) 
         this.setState({mounted: true})
     }).catch(err => {
         //handle error
         
     });
   }

>>>>>>> main
   render() {
      return(
         <div className="web-container">
            <Header/>
            {this.state.error ? <div>Error: {this.state.error.message}</div> : null}
            {this.state.mounted ? null :  <div> Cargando ... </div>}
            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th className="text-center">#</th>
                     <th className="text-center">Nombre</th>
                     <th className="text-center">apellidos</th>
                     <th className="text-center">curso</th>
                  </tr>
               </thead>
               <tbody>
                  {this.state.alumnos.map((item,index) => (
                     <tr key={index}>
                        <th className="text-center" id={item.id}>{item.id}</th>
                        <td className="text-center">{item.nombre}</td>
                        <td className="text-center">{item.apellidos}</td>
                        <td className="text-center">{item.curso}</td>
                     </tr>
                  ))}
               </tbody>
            </table>         
         </div>
      )
   }
}
>>>>>>> main