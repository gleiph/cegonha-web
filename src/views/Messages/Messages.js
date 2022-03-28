import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import api from "../../Services/api";


  const useStyles = makeStyles({
    table: {
      minWidth: 700,
      maxWidth:700
    },
  });
  
  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

function createData(Nome, Email, Mensagem) {
  return {
    Nome, 
    Email,
    Mensagem
  };
}


export default function Message() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api("message");
      setData(result.data);
    };
    fetchData();
  }, []);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.Nome}
          </TableCell>
          <TableCell align="right">{row.Email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} >
            <Collapse in={open} timeout="auto" unmountOnExit style={{backgroundColor:'#D3D3D3'}}>
              <Box margin={1} >
                <Typography variant="h6" gutterBottom component="div" >
                  Mensagem
                </Typography>
                 <Typography style={{ width:'700px'}}>{row.Mensagem}</Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const rows = data.map((item) => ( 
    createData(item.name, item.email, item.message)
  ))
  return (
    <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Mensagens</h4>
          <p className={classes.cardCategoryWhite}>
            Tabela com todas as sujestões e reclamações enviadas pelo aplicativo. 
          </p>
        </CardHeader>
        <CardBody>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
