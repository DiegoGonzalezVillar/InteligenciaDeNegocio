import React, {useState} from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';

const Login = ({updateUserStatus}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setCargando] = useState(false)

    $('#login').on('hidden.bs.modal', function (e) {
        resetFormLogin()
    })
    

    const resetFormLogin = () =>{
        setUsername('');
        setPassword('');
        setCargando(false);
    }

    const login = async e =>{
      setCargando(true);
      const options = {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch('http://localhost:4000/login', options);
    const json = await response.json();
    if(json.message === 'Login Exitoso!')
    {
      $('#login').modal('hide');
      toast.success('Bienvenido' ,{position:toast.POSITION.BOTTOM_RIGHT})
      localStorage.setItem('user',JSON.stringify(json.data));
      updateUserStatus(json.data);
    }
    else {

      toast.error(response.data, {position:toast.POSITION.BOTTOM_RIGHT})
      setCargando(false);
    }
}

    const changeUsuario = e =>{
        setUsername(e.target.value);
    }

    const changePassword = e =>{
        setPassword(e.target.value);
  }

    return (
        <div className="modal fade" id="login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light">
              <div style={{backgroundColor:'#212529'}} className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Iniciar Sesión</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span style={{color:'white'}} aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="form-login">
                    <div className="form-group">
                        <label htmlFor="loginEmail">Usuario</label>
                        <input onChange={changeUsuario} value={username} required="required" name="email"  type="email" className="form-control" id="loginEmail" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loginPassword">Contraseña</label>
                        <input onChange={changePassword} value={password} required="required" type="password" className="form-control" id="loginPassword" />
                    </div>
                </form>
              </div>
              <div style={{backgroundColor:'#212529'}} className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                <button onClick={login} type="button" className="btn btn-success">
                  {!cargando ? 'Iniciar Sesión' : 'Cargando...'}
                  {cargando ? <span className="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null}
                </button>
              </div>
            </div>
          </div>
        </div>
       
    )
}

export const mostrarLogin = () => {
    $('#login').modal('show');
}

export default Login;