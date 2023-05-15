import React, { useState, useEffect } from 'react';

const BookingTimer = ({ bookingDate, checkinDate }) => {

    console.log(bookingDate,checkinDate)
  const timeDiff = checkinDate.getTime() - bookingDate.getTime();
  const [remainingTime, setRemainingTime] = useState(timeDiff);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(prevRemainingTime => prevRemainingTime - 1000);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Remaining time: {new Date(remainingTime).toISOString().substr(11, 8)}</h1>
    </div>
  );
};

export default BookingTimer;
