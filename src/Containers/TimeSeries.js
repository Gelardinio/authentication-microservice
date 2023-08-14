import * as React from 'react';
import Title from './Title';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';


export default function TimeSeries() {

  const location = useLocation();
  const graphDetails = location.state && location.state.graphDetails;


  return (
    <React.Fragment>
      <Title>Time Series Data</Title>
      <Typography component="p" variant="h7">
        {`Autocorrelation: ${graphDetails.AverageAutoCorrelation}`}
      </Typography>
    </React.Fragment>
  );
}