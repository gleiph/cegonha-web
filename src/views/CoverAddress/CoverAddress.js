import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import api from "../../Services/api";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import EditCoverAddres from './EditCoverAddres';

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

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CoverAddress() {
  const classes = useStyles();

  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const [data, setData] = useState([]);
  const [medical, setMedical] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api("cover-address");
      setData(result.data);
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    api.delete("cover-address/" + id)
    .then(res => {
      
      setOpenSnack(true);
      reload()
    });
    
  };

    const reload = () => {

    window.location.reload();
  };
  return (
    <GridContainer>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">Endereço coberto excluído com sucesso!</Alert>
      </Snackbar>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Endereços cobertos</h4>
            <p className={classes.cardCategoryWhite}>
              Tabela com todos os endereços cobertos por alguma unidade básica de saúde com seus respectivos locais de parto e pré natal. 
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Rua", "Números", "Bairro", "Cidade-UF", "CEP", "Local parto", "Local pré-natal", "Deletar", "Editar"]}
              tableData=
                {data.map((item) => (
                [item.street, item.number_start +" ao "+ item.number_end, item.district, item.city+" , "+item.uf, item.cep, item.id_addres_parto, item.id_addres_pre_natal, 
                <IconButton aria-label="delete" color="secondary" className={classes.margin}>
                    <DeleteIcon onClick={() => handleDelete(item.id)}/>
                </IconButton>,
                <IconButton aria-label="delete" color="primary" className={classes.margin}>
                    <EditCoverAddres idCentralMedical={item.id}/> 
                </IconButton>
                ]
                ))}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
