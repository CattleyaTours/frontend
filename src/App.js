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
import AddPlan from './components/AddPlan';
import Publicaciones from './components/Publicaciones';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Region from './components/Region';
import AuthContextProvider, { AuthContext } from './context/AuthContext'
import ExternalDataContextProvider from './context/ExternalDataContext'



import './App.css';
import './styles/Form.css'
import './styles/Post.css'

function App() {
  return (
      <AuthContextProvider>
      <ExternalDataContextProvider>
        <Router>
          <div className="App">
            {/*Barra de navegación*/}
            <Navbar />
            <Switch>
              {/*Componente por cada ruta*/}
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <PrivateRoute path="/crear-plan" exact>
                <AddPlan/>
              </PrivateRoute>
              <Route path="/publicaciones" exact component={Publicaciones} />
              <Route path="/publicaciones/:idregion" component={Region} />
              <Route path="/" exact component={Inicio} />
            </Switch>
          </div>
        </Router>
      </ExternalDataContextProvider>
      </AuthContextProvider>
  )
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const  PrivateRoute = ({ children, ...rest }) => {
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
    }/>
  );
}

export default App;