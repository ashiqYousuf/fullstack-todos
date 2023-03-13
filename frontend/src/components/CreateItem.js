import { useState } from 'react';
import { Stack } from '@mui/system';
import { TextField , Button } from '@mui/material';
import dayjs from 'dayjs';
import CustomDateTimePicker from './CustomDateTimePicker';
import Textarea from '@mui/joy/Textarea';
import { useAddItemMutation } from '../store';


export default function CreateItem() {
    const [title , setTitle] = useState('');
    const [note , setNote] = useState('');
    const [dateTime , setDateTime] = useState(dayjs(new Date()));

    const [addItem , { isLoading }] = useAddItemMutation();

    const handleSubmit = (event) => {
        event.preventDefault();
        addItem({
            title,
            note,
            due_date: new Date(dateTime).toISOString(),  
        });
    };


    return (
        <Stack>
            <form style={{
                padding: '70px',
                margin: 'auto',
                boxShadow: '0px 0px 1px 1px lightgoldenrodyellow',
                backgroundColor: 'lightgoldenrodyellow'
            }}
            onSubmit={handleSubmit}
            >
                <Stack direction="row" sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Stack>
                        <CustomDateTimePicker dateTime={dateTime} setDateTime={setDateTime} />
                    </Stack>
                    <Stack sx={{marginTop: '15px'}}>
                        <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="standard" />
                    </Stack>
                    <Stack sx={{marginTop: '15px'}}>
                        <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Description" variant="outlined" minRows={5} maxRows={5} color="primary" />
                    </Stack>
                    <Stack sx={{marginTop: '15px'}}>
                        <Button disabled={isLoading === true} onClick={handleSubmit} variant="contained">Add</Button>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    )
}
