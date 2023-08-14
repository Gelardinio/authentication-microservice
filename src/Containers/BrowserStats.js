import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useLocation } from 'react-router-dom';

function preventDefault(event) {
  event.preventDefault();
}

export default function BrowserData() {
    const location = useLocation();
    const browserDataReceieved = location.state && location.state.browserData;

  return (
    <React.Fragment>
      <Title>Browser Data</Title>
      <Typography component="p" variant="h7">
        {`IP: ${browserDataReceieved.ip}`}
      </Typography>
      <Typography component="p" variant="h7">
        {`Screen Width: ${browserDataReceieved.screenWidth}`}
      </Typography>
      <Typography component="p" variant="h7">
        {`Screen Height: ${browserDataReceieved.screenHeight}`}
      </Typography>
      <Typography component="p" variant="h7">
        {`User Agent: ${browserDataReceieved.userAgent}`}
      </Typography>
    </React.Fragment>
  );
}