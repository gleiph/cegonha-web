import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import api from "../../Services/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from "components/Table/Table.js";
import EditAdress from './EditAdress';
import AddAdress from './AddAdress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


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
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
       await api("user/" + props.cpfUser )
      .then(async(res) => {
         setData(res.data)
      })
    };
    fetchData();

  }, []);

  
  const [street, setstreet] = useState(data.street);
  const [number, setnumber] = useState(data.number);
  const [district, setdistrict] = useState(data.district);
  const [city, setcity] = useState(data.city);
  const [uf, setuf] = useState(data.uf);
  const [cep, setcep] = useState(data.cep)

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

  const handleDelete = async (idAdress, idUser ) => {
    await api.delete("adress/" + idAdress + "/" + idUser )
    .then(res => {
      setOpenSnack(true);
      reload()
    });
    
  };

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
   

    /*api.put(`adress/` + props.idAdress, values)
      .then(res => {
        reload()
        handleClose()
        alert("Sucesso!!! \n Edição realiada com sucesso!!!");
      }, (error) => {alert("Erro!!! \n A edição não foi concluída!!!");
    });*/
      
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
        <DialogTitle id="form-dialog-title">Adress</DialogTitle>
        <form className='white' onSubmit={handleSubmit}>
        <DialogContent>
          
           <div>
                {data.map((item, key) => (
                  [(
                    <Table key ={key}
                      tableHeaderColor="primary"
                      tableHead={["Rua", "Bairro", "Cidade-UF", "CEP", "Deletar", "Editar"]}
                      tableData=
                      {item.adresses.map((i, key) => (
                      [ 
                        
                          i.street  +"   n° "+i.number, i.district , 
                          i.city+" , "+i.uf , i.cep,
                     
                          <IconButton key ={key} onClick={() => handleDelete(i.id,item.id)} aria-label="delete" color="secondary" className={classes.margin}  >
                          <DeleteIcon />
                          </IconButton>,
                          <IconButton key ={key} color="secondary" className={classes.margin}>
                          <EditAdress idAdress={i.id} idUser ={item.id}>Endereços</EditAdress>
                          </IconButton>,
                        
                      ]
                      ))}
                      />
                 ),]
                ))}
             </div>
            <DialogActions>
            <IconButton color="secondary" className={classes.margin}>
                <AddAdress cpfUser={props.cpfUser}/>
            </IconButton>,
                        
           </DialogActions>
              
        </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
