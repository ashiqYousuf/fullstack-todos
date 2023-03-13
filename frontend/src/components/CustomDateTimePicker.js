import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


// const [dateTime , setDateTime] = useState(dayjs(new Date()));

export default function CustomDateTimePicker({ dateTime , setDateTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Datetime"
          value={dateTime}
          onChange={(newValue) => setDateTime(newValue)}
        />
    </LocalizationProvider>
  );
}