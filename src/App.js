import React, { useContext } from 'react'

import './App.css';
import './styles/Form.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FormPublicacion from './components/FormPublicacion';
import Publicaciones from './components/Publicaciones';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import AuthContextProvider, { AuthContext } from './context/AuthContext'
import ExternalDataContextProvider from './context/ExternalDataContext'
import FormSitio from './components/FormSitio'
import PublicacionContextProvider from './context/PublicacionContext'

//Notifications library
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import './App.css';
import './styles/Form.css'
import './styles/Post.css'
import SitioContextProvider from './context/SitioContext';
import PerfilPropietario from './components/PerfilPropietario';
import MisPublicaciones from './components/MisPublicaciones';
import MisSitios from './components/MisSitios';

function App() {

    return (
        <AuthContextProvider>
            <ExternalDataContextProvider>
                <SitioContextProvider>
                    <PublicacionContextProvider>
                        <ReactNotification />
                        <Router>
                            <div className="App">
                                {/*Barra de navegación*/}
                                <Navbar />
                                <Switch>
                                    {/*Componente por cada ruta*/}
                                    <Route path="/login" exact component={Login} />
                                    <Route path="/register" exact component={Register} />

                                    <PrivateRoute path="/perfil/publicaciones" exact>
                                        <PrivateRoutePropietario path="/perfil/publicaciones" exact>
                                            <MisPublicaciones />
                                        </PrivateRoutePropietario>
                                    </PrivateRoute>

                                    <PrivateRoute path="/perfil/sitios" exact>
                                        <PrivateRoutePropietario path="/perfil/sitios" exact>
                                            <MisSitios />
                                        </PrivateRoutePropietario>
                                    </PrivateRoute>

                                    <PrivateRoute path="/perfil" exact>
                                        <PrivateRoutePropietario path="/perfil" exact>
                                            <PerfilPropietario />
                                        </PrivateRoutePropietario>
                                    </PrivateRoute>


                                    <PrivateRoute path="/crear-plan" exact>
                                        <PrivateRoutePropietario path="/crear-plan" exact>
                                            <FormPublicacion />
                                        </PrivateRoutePropietario>
                                    </PrivateRoute>

                                    <PrivateRoute path="/editar-plan" exact >
                                        <PrivateRoutePropietario path="/editar-plan">
                                            <FormPublicacion />
                                        </PrivateRoutePropietario>
                                    </PrivateRoute>

                                    <PrivateRoute path="/crear-sitio-turistico" exact >
                                        <FormSitio />
                                    </PrivateRoute>

                                    <PrivateRoute path="/editar-sitio-turistico" exact >
                                        <PrivateRoutePropietario path="/editar-sitio-turistico" exact >
                                            <FormSitio />
                                        </PrivateRoutePropietario>
                                    </PrivateRoute>

                                    <Route exact path="/publicaciones" render={(props) => <Publicaciones {...props} />} />
                                    <Route exact path="/publicaciones/:region" render={(props) => <Publicaciones {...props} />} />

                                    <Route path="/" exact component={Inicio} />

                                </Switch>
                            </div>
                        </Router>
                    </PublicacionContextProvider>
                </SitioContextProvider>
            </ExternalDataContextProvider>
        </AuthContextProvider>
    )
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoutePropietario = ({ children, ...rest }) => {
    const { propietario } = useContext(AuthContext)
    return (
        <Route {...rest} render={({ location }) =>
            propietario ?
                (children)
                : (
                    <Redirect
                        to={{
                            pathname: "/crear-sitio-turistico",
                            state: { from: location }
                        }}
                    />
                )
        } />
    );
}

const PrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <Route {...rest} render={({ location }) =>
            isAuthenticated ?
                (children)
                : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
        } />
    );
}



export default App;