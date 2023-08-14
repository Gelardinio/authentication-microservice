import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useLocation } from 'react-router-dom';

function preventDefault(event) {
  event.preventDefault();
}

export default function GraphDetails() {
    const location = useLocation();
    const graphDetails = location.state && location.state.graphDetails;

    console.log(graphDetails)

  return (
    <React.Fragment>
      <Title>Mouse Stats</Title>

      <Typography component="p" variant="h7">
        {`Number of nodes: ${graphDetails.TotalNodes}`}
      </Typography>
      <Typography component="p" variant="h7">
        {`Average Velocity: ${graphDetails.AverageVelocity}`}
      </Typography>
      <Typography component="p" variant="h7">
        {`Minimum Velocity: ${graphDetails.MinVelocity}`}
      </Typography>
      <Typography component="p" variant="h7">
        {`Maximum Velocity: ${graphDetails.MaxVelocity}`}
      </Typography>
      <Typography component="p" variant="h7">
        {`Max Neighbour Nodes: ${graphDetails.AverageNeighbors}`}
      </Typography>
      <Typography component="p" variant="h7">
        {`Standard Deviation: ${graphDetails.StandardDeviation}`}
      </Typography>
    </React.Fragment>
  );
}