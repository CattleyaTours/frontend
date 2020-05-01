import React, { createContext, Component } from 'react'
import axios from 'axios'
import centro_sur from '../images/amazonas.jpg'
import centro_oriente from '../images/centro_oriente.jpeg'
import caribe from '../images/caribe.jpg'
import eje_cafetero from '../images/eje_cafetero.jpg'
import pacifico from '../images/pacifico.jpg'
import llano from '../images/llano.jpg'

export const ExternalDataContext = createContext()

class ExternalDataContextProvider extends Component{
    state = {
        paises: [],
        ubicaciones: [],
        regiones: [
            { nombre: "Región Llano", img: llano },
            { nombre: "Región Centro Oriente", img: centro_oriente },
            { nombre: "Región Caribe", img: caribe },
            { nombre: "Región Centro Sur", img: centro_sur },
            { nombre: "Región Eje Cafetero - Antioquia", img: eje_cafetero },
            { nombre: "Región Pacífico", img: pacifico }
        ]
    }

    getPaises = () => {
        axios.get(process.env.REACT_APP_COUNTRIES_URL + '/all', {
            params:{
                fields: "name;flag;alpha3Code"
            }
        }).then(res => {
            this.setState({
                ...this.state,
                paises: res.data
            })
        }).catch(err => {
            console.log(err)
            this.setState({
                ...this.state,
                paises: []
            })
        })
    }

    getUbicaciones = () => {
        axios.get(process.env.REACT_APP_REGIONES_URL)
        .then(res => {
            this.setState({
                ...this.state,
                ubicaciones: res.data
            })
        }).catch(err => {
            console.log(err)
            this.setState({
                ...this.state,
                ubicaciones: []
            })
        })
    }

    render(){
        return(
            <ExternalDataContext.Provider value={{
                ...this.state, 
                getPaises:this.getPaises,
                getUbicaciones:this.getUbicaciones,
            }}>
                {this.props.children}
            </ExternalDataContext.Provider>
        );
    }
}

export default ExternalDataContextProvider;