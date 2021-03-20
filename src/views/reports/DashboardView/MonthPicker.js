import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function YearMonthPicker() {
  const [selectedDate, setselectedDate] = useState(new Date('2018-01-01'));
  const handleDateChange = (e) => {
    // console.log(e);
    setselectedDate(e);
    // console.log(selectedDate);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <DatePicker
        views={["month"]}
        label="Month"
        value={selectedDate}
        onChange={handleDateChange}
      /> */}

      <DatePicker
        views={['month']}
        label="Month"
        // helperText="With min and max"
        minDate={new Date('2018-01-01')}
        maxDate={new Date('2018-12-01')}
        value={selectedDate}
        onChange={handleDateChange}
      />

      {/* <DatePicker
        variant="inline"
        openTo="year"
        views={["year", "month"]}
        label="Year and Month"
        helperText="Start from year selection"
        value={selectedDate}
        onChange={handleDateChange}
      /> */}
    </MuiPickersUtilsProvider>
  );
}

export default YearMonthPicker;
