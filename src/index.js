import React from 'react';
import ReactDOM from 'react-dom/client';


import Container from '@mui/material/Container';
import { TypeAnimation } from 'react-type-animation';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';

import getQuote from './getQuote';



function Session(){
  const [typed,setTyped] = React.useState("");
  const [meta,setMeta] = React.useState([]);
  const [quote,setQuote] = React.useState(getQuote().text.replaceAll('’','\''));
  const addTyped = (event) => {
    if(event.target.value===quote){
      console.log(meta);
      setTyped("");
      setMeta([]);
      setQuote(getQuote().text)
    }
    else{
      setTyped(event.target.value)
    }
  }
  const logMeta = (event) =>{
    if(meta.length===0){
      setMeta([{t:0,k:event.code}])
    }
    else{
      setMeta([...meta,{timestamp: Date.now(), key: event.code, code: event.keyCode}])
    }
  }
  return(
    <React.Fragment>
      <Grid item>
        <Paper style={{padding:'1rem'}} elevation={3}>
          <Typography>
            <span style={quote.substring(0,typed.length)===typed?{color:"green"}:{color:"red"}}>{quote.substring(0,typed.length)}</span><span>{quote.substring(typed.length)}</span>
          </Typography>
          <TextField
            multiline
            fullWidth
            error={quote.substring(0,typed.length)!==typed}
            disabled={quote===typed}
            minRows={2}
            value={typed}
            onKeyDown={logMeta}
            onChange={addTyped}
          />
          </Paper>
      </Grid>
      <Grid item xs={2}>
        <code>
          {JSON.stringify(meta)}
        </code>
      </Grid>
    </React.Fragment>
  );
}

function App(){
  return(
    <Container>
      <Grid container direction="column" justifyContent="flex-start" alignItems="center">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            <TypeAnimation
              sequence={['Keystroke',1000,'Keystroke Dataset Creator',2000,'Keystroke by Andreis and Rene',2000]}
              cursor={true}
              repeat={Infinity}
            />
          </Typography>
          <Typography>
            This is a custom tool to create a datasets for user keystrokes for Machine Learning.
          </Typography>
          <Typography>
            The concept is simple: we'll show you some phrases and we'll detect how you type each word
          </Typography>
        </Grid>
        <Session />
      </Grid>
    </Container>
  );
}
/* 

        <Grid>
          <TextField label="User ID" variant="outlined" />
        </Grid> */

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

