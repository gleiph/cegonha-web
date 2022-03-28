import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import api from "../../Services/api";
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
      
      const result = await api("user/" + props.cpfUser );
      setData(result.data[0])

      
    };
    fetchData();

  }, []);

  const [name, setname] = useState(data.name);
  const [username, setusername] = useState(data.username);
  const [email, setemail] = useState(data.email);
  const [cpf, setcpf] = useState(data.cpf);

  const handleChange = (event) => {
    switch (event.target.id) {
    case 'name':
      setname( event.target.value);
      break
    case  'username':
      setusername(event.target.value);
    break;
    case 'email':
      setemail( event.target.value);
    break;
    case 'cpf':
      setcpf( event.target.value);
    break;
    default:
    break;
    }
  }

  const handleSubmit = event => {
    event.preventDefault();

    const values = {
      username,
      name,
      cpf, 
      email,
      //password, 
    };
    api.put(`user2/` + data.id, values)
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
                <GridItem xs={12} sm={12} md={12}>
                  <TextField id="name" label="Nome" style={{ margin: 12 }} fullWidth onChange={handleChange} defaultValue={data.name}/>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="username" style={{ margin: 8 }} fullWidth label="Username" onChange={handleChange} defaultValue={data.username}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="email" fullWidth style={{ margin: 8 }} label="Email" onChange={handleChange} defaultValue={data.email}/>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="cpf" fullWidth style={{ margin: 8 }} label="CPF" onChange={handleChange} defaultValue={data.cpf}/>
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
