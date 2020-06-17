import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { SitioContext } from '../context/SitioContext';
import NumberFormat from 'react-number-format';

const AddPlan = ({ nextStep, publicacion, setPublicacion, success, error, edit }) => {

    const location = useLocation();
    const { user } = useContext(AuthContext)
    const { sitios, getSitiosById } = useContext(SitioContext)

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0,10);

    const onChange = (event) => {
        console.log(event.target.type)
        console.log(event.target.name)
        console.log(event.target.value)
        if (event.target.type === "number" || event.target.type === "select-one") {
            setPublicacion({
                ...publicacion,
                [event.target.name]: parseInt(event.target.value)
            })
        } else {
            setPublicacion({
                ...publicacion,
                [event.target.name]: event.target.value
            })
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        if (edit) {
            axios.put(process.env.REACT_APP_BACK_URL + '/Publicaciones/' + publicacion.Id, publicacion)
                .then(() => {
                    success("Tu publicación fue actualizada con éxito")
                    nextStep()
                })
                .catch(err => {
                    console.log(err);
                    error("Ha ocurrido un error y tu publicación no ha podido ser actualizada")
                })
        } else {
            axios.post(process.env.REACT_APP_BACK_URL + '/Publicaciones/', publicacion)
                .then((res) => {
                    success("Tu publicación fue creada con éxito", res.data.id)
                    setPublicacion({
                        ...publicacion,
                        Id: res.data.id
                    })
                    nextStep()
                })
                .catch(err => {
                    console.log(err);
                    error("Tu publicación no se ha podido crear debido a un error");
                })
        }
    }

    useEffect(() => {
        publicacion.PropietarioId = parseInt(user.id)
    }, [publicacion, user])

    useEffect(() => {
        getSitiosById(publicacion.PropietarioId)
    }, [getSitiosById, publicacion.PropietarioId])

    return (
        <div className="col col-form">
            <h1 className="titulo-form-blue">Ingresa los datos del plan</h1>
            <form onSubmit={handlerSubmit}>
                <div className="form-group">
                    <label htmlFor="Titulo">Titulo</label>
                    <input
                        name="Titulo"
                        className="form-control"
                        type="text"
                        autoFocus
                        required
                        value={publicacion.Titulo}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Descripcion">Descripción</label>
                    <textarea
                        name="Descripcion"
                        className="form-control"
                        rows="3"
                        onChange={onChange}
                        required
                        value={publicacion.Descripcion}
                    />
                </div>

                <div className="form-group">
                        <label htmlFor="Precio">Precio</label>
                        <NumberFormat 
                            allowNegative={false}
                            value={publicacion.Precio}
                            thousandSeparator={true} 
                            decimalSeparator={false}
                            name="Precio"
                            prefix={'$'} 
                            allowEmptyFormatting={false}
                            allowLeadingZeros={false}
                            renderText={value => <div>{value}</div>} 
                            onValueChange={values => {setPublicacion({...publicacion, Precio:values.floatValue})}}
                            className="form-control"
                            required
                            />
                    </div>

                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="SitioId">Sitio Turistico</label>
                        <select
                            name="SitioId"
                            className="form-control"
                            type="number"
                            onChange={onChange}
                            required
                            value={publicacion.SitioId}
                            disabled={location.state && location.state.publicacion}
                        >
                            <option>Seleccione un sitio</option>
                            {sitios.map(sitio =>
                                <option
                                    value={sitio.id}
                                    key={sitio.nombre}
                                >
                                    {sitio.nombre}
                                </option>)}
                        </select>
                        <p className="form-link">
                            ¿No encuentras un sitio turistico?{" "}
                            {
                                <Link to="/crear-sitio-turistico">
                                    Crear sitio turistico
                                </Link>
                            }
                        </p>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="Fecha">Fecha</label>
                        <input
                            name="Fecha"
                            className="form-control"
                            type="date"
                            min={date}
                            onChange={onChange}
                            required
                            value={publicacion.Fecha}
                        />
                    </div>
                </div>
                
                <button type="submit" className="btn btn-form-blue col">Siguiente</button>

            </form>
        </div>
    )
}


export default AddPlan