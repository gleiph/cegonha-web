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
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from '@material-ui/core/Button';
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import api from "../../Services/api";
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import EditCentralMedical from './EditCentralMedical';


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

function createData(name,phone,latitude,longitude,image,street,number,district,city,uf,cep, id) {
  return {
    name,
    phone,
    latitude,
    longitude,
    image,
    street,
    number,
    district,
    city,
    uf,
    cep,
    id
  };
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MedicalCenter() {
  const classes = useStyles();

  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const [data, setData] = useState([]);
  const [busca, setBusca] = useState(" ");
  const [click, setClick] = useState(false);

  function handleClick(){
    setClick(true);
    
  }

  useEffect(() => {
    const fetchData = async () => {
        if(click === false || busca == " "){
            const result = await api("medical-center");
            setData(result.data);
        }
        else{
            const result = await api("medical-center-name/"+busca);
            setData(result.data);
        }
    };
    fetchData();

  }, []);

  const handleDelete = (id) => {
    api.delete("medical-center/" + id)
    .then(res => {
      console.log(res);
      setOpenSnack(true);
      reload()
    });
    
  };

    const reload = () => {

    window.location.reload();
  };

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity="success">Central médica excluída com sucesso!</Alert>
        </Snackbar>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            
              <img src={row.image} style={{  width: "200px", height:"auto"}} />
            
          </TableCell>
          <TableCell><h3>{row.name}</h3></TableCell>
          <TableCell align="right">
            <IconButton aria-label="delete" color="secondary" className={classes.margin}>
                <DeleteIcon onClick={() => handleDelete(row.id)}/>
            </IconButton>
          </TableCell>
          <TableCell align="right">
            <IconButton aria-label="delete" color="primary" className={classes.margin}>
                <EditCentralMedical idCentralMedical={row.id}/> 
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} >
            <Collapse in={open} timeout="auto" unmountOnExit >
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Endereço</TableCell>
                    <TableCell>Telefone</TableCell>
                    <TableCell>CEP</TableCell>
                    <TableCell>Latitude</TableCell>
                    <TableCell>Longitude</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                      <TableCell>{row.street}, {row.number} - {row.district} - {row.city} - {row.uf} </TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.cep}</TableCell>
                      <TableCell>{row.latitude}</TableCell>
                      <TableCell>{row.longitude}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const rows = data.map((item) => ( 
    createData(item.name, item.phone, item.latitude, item.longitude, item.image, item.street, item.number, item.district, item.city, item.uf, item.cep, item.id)
  ))

  return (
    <GridContainer>
        
        <GridItem xs={12} sm={12} md={12}>
            <div className={classes.searchWrapper}>
            <CustomInput
                formControlProps={{
                className: classes.margin + " " + classes.search
                }}
                inputProps={{
                placeholder: "Buscar por nome",
                inputProps: {
                    "aria-label": "Search"
                }
                }}
                onChange={event => setBusca(event.target.value)}
            />
            <Button color="white" aria-label="edit"  round onClick={handleClick}> 
                <Search />
            </Button>
            </div>
            <Card>
                <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Centros Médicos</h4>
                <p className={classes.cardCategoryWhite}>
                    Tabela com todas os centros médicos que fazem parte da Rede Cegonha. 
                </p>
                </CardHeader>
                <CardBody>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Imagem</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell align="right">Deletar</TableCell>
                                    <TableCell align="right">Editar</TableCell>
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
