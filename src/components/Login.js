import React, { Component } from 'react';
import img from '../images/login.png';
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className="container-fluid form-container ">
                <div className="row align-items-center">
                    {/* Columna de color con imagen */}
                    <div className="col col-color">
                        <header>
                            <h1 className="titulo-form-color">¡Bienvenido a Cattleya tours!</h1>
                            <img className="img-fluid mx-auto d-block img-form" src={img} alt="login" />
                        </header>
                    </div>
                    {/* Columna de formulario */}
                    <div className="col col-form ">
                        <h1 className="titulo-form">Iniciar sesión</h1>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Usuario o correo</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-form">Submit</button>
                            <p className="form-link">
                                ¿Nuevo usuario?
                                <Link to="/register">
                                    Registrate
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;