import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TbTrashFilled } from 'react-icons/tb';
import { FiEdit } from 'react-icons/fi';
import { CircularProgress } from '@mui/material';
import { useDeleteItemMutation } from '../store';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdPending } from 'react-icons/md';
import { Button , TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import CustomDateTimePicker from './CustomDateTimePicker';
import dayjs from 'dayjs';
import { useEditItemMutation } from '../store';


export default function Row({ row }) {
    const [edit , setEdit] = React.useState(false);
    const [title , setTitle] = React.useState(row.title);
    const [note , setNote] = React.useState(row.note);
    const [dateTime , setDateTime] = React.useState(dayjs(row.due_date));

    const [deleteItem , results] = useDeleteItemMutation();
    const [editItem , { isLoading }] = useEditItemMutation();

    const handleDelete = (id) => {
        deleteItem(id);
    };
    
    const handleEdit = (id) => {
      setEdit(!edit);
    };

    const handleSubmit = () => {
      setEdit(!edit);
      const data = {
        title,
        note,
        due_date: dateTime,
      };
      const id = row.id
      editItem({ data , id });
    };

    return (
        <>
        <TableRow key={row.id}>
            <TableCell p={3} component="th" scope="row">{row.title}</TableCell>
            <TableCell p={5} align="left">{row.note}</TableCell>
            <TableCell p={5} align="left">{new Date(row.due_date).toLocaleDateString(undefined , { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>

            <TableCell p={5}>
              {
                results.isLoading ?
                <CircularProgress color="error" />
                :
                <TbTrashFilled onClick={() => handleDelete(row.id)} style={{fontSize: '30px' , color: 'crimson' , cursor: 'pointer'}} /> 
              }
            </TableCell>

            <TableCell p={5} align="center">
              <FiEdit onClick={ () => handleEdit(row.id)} style={{fontSize: '30px' , cursor: 'pointer' , color: 'green'}} />
            </TableCell>

            <TableCell align='center' p={5}>
              {
                (new Date(row.due_date) < new Date()) ?
                <BsCheck2Circle style={{fontSize: '30px' , color: '#f48195'}} /> 
                :
                <MdPending style={{fontSize: '30px' , color: 'blue'}} />
              }
            </TableCell>
        </TableRow>
        {
          edit &&
          <TableRow p={10}>
            <TableCell p={10}>
              <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="standard" />
            </TableCell>
            <TableCell p={10}>
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Description" variant="outlined" minRows={4} maxRows={4} color="primary" />
            </TableCell>
            <TableCell sx={{width: '20%'}} colSpan={3}>
              <CustomDateTimePicker dateTime={dateTime} setDateTime={setDateTime} />
            </TableCell>
            <TableCell sx={{width: '5%'}}>
              <Button disabled={isLoading === true} onClick={handleSubmit} variant="contained" color="info" size="small">Save</Button>
            </TableCell>
          </TableRow>
        }
        </>
    )
}
// {/* <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="standard" /> */}