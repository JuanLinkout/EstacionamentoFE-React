import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import './Loader.css';

export default function loader(props) {
  return (
    <Box m={props.margin}>
      <div className="loader">
          <CircularProgress size={props.size} />
      </div>
    </Box>
  )
}