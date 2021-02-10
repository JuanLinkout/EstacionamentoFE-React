import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default props => (
  <Snackbar open={props.open} autoHideDuration={props.duration || 6000} onClose={props.callback}>
    <MuiAlert elevation={props.elevation || 6} variant={props.variant || 'filled'} onClose={props.callback} severity={props.type}>
      {props.text}
    </MuiAlert>
  </Snackbar>
)