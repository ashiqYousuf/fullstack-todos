import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';
import { FormControl , MenuItem , InputLabel , Stack , Select } from '@mui/material';


export default function ShowItems({ items }) {
  const [open , setOpen] = React.useState(false);
  const [sortBy , setSortBy] = React.useState('');
  const [sortOrder , setSortOrder] = React.useState('');
  const [toggle , setToggle] = React.useState(false);

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setOpen(false);
    setSortBy(e.target.value);
  };

  // Implement Sorting Within a page
  let sortedItems = items;
  if(sortBy && sortOrder) {
    sortedItems = [...items].sort((a , b) => {
      if (typeof a === 'string'){
        const valueA = a.title;
        const valueB = b.title;
        const order = sortOrder === 'Asc' ? 1 : -1;
        return valueA.localeCompare(valueB) * order;
      }else {
        const valueA = new Date(a.due_date);
        const valueB = new Date(b.due_date);
        const order = sortOrder === 'Asc' ? 1 : -1;
        return (valueA - valueB) * order;
      }
    });
  }


  return (
    <>
    <Stack direction="row" sx={{
      maxWidth: '500px',
    }}>
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="drop-sorting-label">Sort By</InputLabel>
        <Select
          labelId="drop-sorting-label"
          id="drop-sorting"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={sortBy}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value='Title'>Title</MenuItem>
          <MenuItem value='due_date'>Due Date</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="order-sorting-label">Sorting Order</InputLabel>
        <Select
          labelId="order-sorting-label"
          id="order-sorting"
          open={toggle}
          onClose={() => setToggle(false)}
          onOpen={() => setToggle(true)}
          value={sortOrder}
          label="Sorting Order"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value='Asc'>Ascending</MenuItem>
          <MenuItem value='Desc'>Descending</MenuItem>
        </Select>
      </FormControl>
    </Stack>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 , maxWidth: 950 , minHeight: 100 , maxHeight: 400 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold'}} align="center">Title</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="center">Description</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="left">Due Date</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="center">Delete</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="center">Edit</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Slacked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sortedItems.map((row) => {
              return <Row key={row.id} row={row} />
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}
