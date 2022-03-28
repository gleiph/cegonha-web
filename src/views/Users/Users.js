import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import api from "../../Services/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import EditUser from './EditUser';
import Adress from '../Adress/Adress';

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

export default function Users() {
  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("user");
      setData(result.data);
    };
    fetchData();
  }, []);


  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleDelete = (id) => {
    api.delete("user/" + id)
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
        <Alert onClose={handleCloseSnack} severity="success">Usuário excluída com sucesso!</Alert>
      </Snackbar>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Usuários</h4>
            <p className={classes.cardCategoryWhite}>
              Tabela com todos os usuários cadastrados no aplicativo. 
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nome", "Email", "CPF", "Deletar", "Editar", "Endereços"]}
              tableData=
                {data.map((item) => (
                [item.name, item.email, item.cpf,  
                  <IconButton onClick={() => handleDelete(item.id)} aria-label="delete" color="secondary" className={classes.margin}  >
                    <DeleteIcon />
                  </IconButton>,
                  <IconButton aria-label="delete" color="secondary" className={classes.margin}  >
                  <EditUser cpfUser={item.cpf}/>
                  </IconButton>,
                  <IconButton aria-label="delete" color="secondary" className={classes.margin}  >
                  <Adress cpfUser={item.cpf}></Adress>
                  </IconButton>,
                ]
                ))}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
