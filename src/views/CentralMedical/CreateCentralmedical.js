import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import api from "../../Services/api";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function CreateCentralMedical() {
  const classes = useStyles();

  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [latitude, setlatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [image, setimage] = useState('');
  const [street, setstreet] = useState('');
  const [number, setnumber] = useState('');
  const [district, setdistrict] = useState('');
  const [city, setcity] = useState('');
  const [uf, setuf] = useState('');
  const [cep, setcep] = useState('');

  const handleChange = (event) => {
    switch (event.target.id) {
    case 'name':
      setname( event.target.value);
      break
    case  'phone':
      setphone(event.target.value);
    break;
    case 'latitude':
      setlatitude( event.target.value);
    break;
    case 'longitude':
      setlongitude( event.target.value);
    break;
    case 'image':
      setimage( event.target.value);
    break;
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
  const handleChange5 = (event) => {
    setuf( event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();

    const values = {
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
      cep
    };
    console.log("medical-center:", values)
    api.post(`medical-center`, values)
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert("SUCESSO!!! \n Cadastro realizado com sucesso!!!");
      }, (error) => {alert("Erro!!! \n O cadastro não foi realizado!!!");
    });
      
  }

  return (
    <div>
      <GridContainer>
          <Card>
          <form className='white' onSubmit={handleSubmit}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Centro Médico</h4>
              <p className={classes.cardCategoryWhite}>Preencha todos os campos para cadastrar novo centro médico</p>
            </CardHeader>
            <CardBody>
            
              <GridContainer>
                <GridItem xs={12} sm={12} md={9}>
                  <TextField id="name" label="Nome" style={{ margin: 8 }} fullWidth onChange={handleChange}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="phone" fullWidth style={{ margin: 8 }} label="Telefone" onChange={handleChange}/>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="latitude" style={{ margin: 8 }} fullWidth label="Latitude" onChange={handleChange}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="longitude" fullWidth style={{ margin: 8 }} label="Longitude" onChange={handleChange}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField id="image" fullWidth style={{ margin: 8 }} label="Imagem" onChange={handleChange}/>
                </GridItem>
              </GridContainer>
              <h4>Endereço</h4>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="cep" fullWidth style={{ margin: 8 }} label="CEP" onChange={handleChange}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <TextField id="street" fullWidth style={{ margin: 8 }} label="Rua" onChange={handleChange}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="number" fullWidth type="number" style={{ margin: 8 }} label="Número" onChange={handleChange}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField id="district" fullWidth style={{ margin: 8 }} label="Bairro" onChange={handleChange}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField id="city" fullWidth style={{ margin: 8 }} label="Cidade" onChange={handleChange}/>
                </GridItem>
                <GridItem xs={10} sm={10} md={3} style={{ margin: 15 }}>
                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                  <Select 
                    labelId="demo-simple-select-label"
                    id="uf"
                    value={uf}
                    onChange={handleChange5}
                    fullWidth 
                    >
                    <MenuItem value={"Acre (AC)"}>Acre (AC) </MenuItem>
                    <MenuItem value={"Alagoas (AL)"}>Alagoas (AL)</MenuItem>
                    <MenuItem value={"Amazonas (AM)"}>Amazonas (AM)</MenuItem>
                    <MenuItem value={"Bahia (BA)"}> Bahia (BA)</MenuItem>
                    <MenuItem value={"Ceará (CE)"}> Ceará	(CE)</MenuItem>
                    <MenuItem value={"Distrito Federal (DF)"}>Distrito Federal (DF)</MenuItem>
                    <MenuItem value={"Espírito Santo (ES)"}>Espírito Santo	(ES)</MenuItem>
                    <MenuItem value={"Goiás	(GO)"}>Goiás (GO)</MenuItem>
                    <MenuItem value={"Maranhão	(MA)"}>Maranhão	(MA) </MenuItem>
                    <MenuItem value={"Mato Grosso	(MT)"}> Mato Grosso	(MT)</MenuItem>
                    <MenuItem value={" Mato Grosso do Sul	(MS)"}> Mato Grosso do Sul	(MS)</MenuItem>
                    <MenuItem value={"Minas Gerais	(MG)"}>Minas Gerais	(MG) </MenuItem>
                    <MenuItem value={"Pará	(PA)"}>Pará	(PA) </MenuItem>
                    <MenuItem value={" Paraíba (PB)"}> Paraíba (PB) </MenuItem>
                    <MenuItem value={"Paraná (PR)"}>Paraná	(PR)</MenuItem>
                    <MenuItem value={"Pernambuco	(PE)"}> Pernambuco (PE)</MenuItem>
                    <MenuItem value={"Piauí	(PI)"}> Piauí	(PI)</MenuItem>
                    <MenuItem value={"Rio de Janeiro (RJ)"}> Rio de Janeiro	(RJ)</MenuItem>
                    <MenuItem value={"Rio Grande do Norte	(RN)"}>Rio Grande do Norte	(RN) </MenuItem>
                    <MenuItem value={" Rio Grande do Sul 	(RS)"}> Rio Grande do Sul (RS) </MenuItem>
                    <MenuItem value={"Rondônia	(RO)"}>Rondônia	(RO) </MenuItem>
                    <MenuItem value={"Roraima	(RR)"}> Roraima	(RR)</MenuItem>
                    <MenuItem value={"Santa Catarina (SC)"}> Santa Catarina (SC)</MenuItem>
                    <MenuItem value={"São Paulo (SP)"}> São Paulo (SP)</MenuItem>
                    <MenuItem value={"Sergipe	(SE)"}> Sergipe	(SE)</MenuItem>
                    <MenuItem value={"Tocantins	(TO)"}>Tocantins (TO)</MenuItem>
                   </Select>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit">Adicionar</Button>
            </CardFooter>
            </form>
          </Card>
      </GridContainer>
    </div>
  );
}
