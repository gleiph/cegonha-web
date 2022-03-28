import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import InputLabel from '@material-ui/core/InputLabel';
import api from "../../Services/api";
import NativeSelect from '@material-ui/core/NativeSelect';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      
      const result = await api("adress/" + props.idAdress );
      setData(result.data[0])

      
    };
    fetchData();

  }, []);

  
  const [street, setstreet] = useState(data.street);
  const [number, setnumber] = useState(data.number);
  const [district, setdistrict] = useState(data.district);
  const [city, setcity] = useState(data.city);
  const [uf, setuf] = useState(data.uf);
  const [cep, setcep] = useState(data.cep);

  const handleChange = (event) => {
    switch (event.target.id) {
    
    case 'street':
      setstreet( event.target.value);
    break;
    case 'number':
      setnumber( event.target.value);
    break;
    case 'district':
      setdistrict( event.target.value);
    break;
    case 'city':
      setcity( event.target.value);
    break;
    case 'cep':
      setcep( event.target.value);
    break;
    default:
    break;
    }
  }

  const handleSubmit = event => {
    event.preventDefault();

    const values = { 
      street,
      number, 
      district, 
      city,
      uf, 
      cep
    };
    console.log("rua:")
    console.log(values)
    console.log('idUser:')
    console.log(props.idUser)
    console.log('idAdress:')
    console.log(data.id)
    //console.log("user:", values)
    api.put("adress/" + data.id + "/" + props.idUser, values) 
      .then(res => {
        reload()
        handleClose()
        alert("Sucesso!!! \n Edição realiada com sucesso!!!");
      }, (error) => {alert("Erro!!! \n A edição não foi concluída!!!");
    });
      
  }
  const reload = () => {

    window.location.reload();
  };
  const handleChange5 = (event) => {
    setuf( event.target.value);
  };

  return (
    <div>
        <EditIcon  onClick={handleClickOpen}/>
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity="success">Usuário editado com sucesso!</Alert>
        </Snackbar>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Usuário</DialogTitle>
        <form className='white' onSubmit={handleSubmit}>
        <DialogContent>
        
              <GridContainer>
                
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="cep" fullWidth style={{ margin: 8 }} label="CEP" onChange={handleChange} defaultValue={data.cep}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <TextField id="street" fullWidth style={{ margin: 8 }} label="Rua" onChange={handleChange} defaultValue={data.street}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="number" fullWidth type="number" style={{ margin: 8 }} label="Número" onChange={handleChange} defaultValue={data.number}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField id="district" fullWidth style={{ margin: 8 }} label="Bairro" onChange={handleChange} defaultValue={data.district}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <TextField id="city" fullWidth style={{ margin: 8 }} label="Cidade" onChange={handleChange} defaultValue={data.city}/>
                </GridItem>
                <GridItem xs={10} sm={10} md={3} style={{ margin: 15 }}>
                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                  <NativeSelect
                    onChange={handleChange5}
                    defaultValue={data.uf}
                    inputProps={{
                      name: 'name',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <option value={data.uf}>{data.uf} </option>
                    <option value={"Acre (AC)"}>Acre (AC) </option>
                    <option value={"Alagoas (AL)"}>Alagoas (AL)</option>
                    <option value={"Amazonas (AM)"}>Amazonas (AM)</option>
                    <option value={"Bahia (BA)"}> Bahia (BA)</option>
                    <option value={"Ceará (CE)"}> Ceará	(CE)</option>
                    <option value={"Distrito Federal (DF)"}>Distrito Federal (DF)</option>
                    <option value={"Espírito Santo (ES)"}>Espírito Santo	(ES)</option>
                    <option value={"Goiás	(GO)"}>Goiás (GO)</option>
                    <option value={"Maranhão	(MA)"}>Maranhão	(MA) </option>
                    <option value={"Mato Grosso	(MT)"}> Mato Grosso	(MT)</option>
                    <option value={" Mato Grosso do Sul	(MS)"}> Mato Grosso do Sul	(MS)</option>
                    <option value={"Minas Gerais	(MG)"}>Minas Gerais	(MG) </option>
                    <option value={"Pará	(PA)"}>Pará	(PA) </option>
                    <option value={" Paraíba (PB)"}> Paraíba (PB) </option>
                    <option value={"Paraná (PR)"}>Paraná	(PR)</option>
                    <option value={"Pernambuco	(PE)"}> Pernambuco (PE)</option>
                    <option value={"Piauí	(PI)"}> Piauí	(PI)</option>
                    <option value={"Rio de Janeiro (RJ)"}> Rio de Janeiro	(RJ)</option>
                    <option value={"Rio Grande do Norte	(RN)"}>Rio Grande do Norte	(RN) </option>
                    <option value={" Rio Grande do Sul 	(RS)"}> Rio Grande do Sul (RS) </option>
                    <option value={"Rondônia	(RO)"}>Rondônia	(RO) </option>
                    <option value={"Roraima	(RR)"}> Roraima	(RR)</option>
                    <option value={"Santa Catarina (SC)"}> Santa Catarina (SC)</option>
                    <option value={"São Paulo (SP)"}> São Paulo (SP)</option>
                    <option value={"Sergipe	(SE)"}> Sergipe	(SE)</option>
                    <option value={"Tocantins	(TO)"}>Tocantins (TO)</option>
                  </NativeSelect>
                </GridItem>
              </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" type="submit">
            Editar
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
