import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import api from "../../Services/api";
import { login } from "../../Services/auth";
import Admin from "../../layouts/Admin"


export default (() => {

  const navigate = useNavigate();

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 


  const handleSignIn = async (e) => {

    e.preventDefault();
    if (!username || !password) {
      setError( "Preencha e-mail e senha para continuar!");
    } else {
      try {
        const response = await api.post("/login", { username, password });
        login(response.data.token);
        navigate("/admin/usuarios");
      } catch (err) {
        setError( "Houve um problema com o login, verifique suas credenciais. T.T");
      }
    }
  };

    return (
      <Grid>
        <form onSubmit={handleSignIn}>
          {error && <p>{error}</p>}
          <input
            type="username"
            placeholder="Usuário"
            onChange={e => setUsername(e.target.value )}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => setPassword(e.target.value )}
          />
          <button type="submit">Entrar</button>
          <hr />
        </form>
      </Grid>
    );
  
})
