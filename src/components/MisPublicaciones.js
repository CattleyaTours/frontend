import React, { useContext, useEffect } from 'react';
import '../styles/PerfilPropietario.css'
import NavPropietario from './NavPropietario';
import { PublicacionContext } from '../context/PublicacionContext';
import { AuthContext } from '../context/AuthContext'
import '../styles/PerfilPropietario.css'
import CardSitio from './CardSitio';

const MisPublicaciones = (props) => {
    const { loading, publicaciones, getPublicacionesById } = useContext(PublicacionContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getPublicacionesById(user.id)
    }, [])

    return (
        <section id="portfolio" className="portfolio">
            <div className="container">

                <div className="section-title" data-aos="fade-up">
                    <h2>Bienvenido {user.nombres}</h2>
                    <p>Edita o elimina tus publicaciones</p>
                </div>
                <NavPropietario
                    perfil=""
                    sitios=""
                    planes="filter-active"
                />
                {loading ?
                    <div className="text-center">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                    :
                    <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
                        {publicaciones.map(sitio => (
                            <CardSitio
                                id={sitio.id}
                                nombre={sitio.titulo}
                                descripcion={sitio.descripcion}
                            />
                        ))}

                    </div>
                }

            </div>
        </section>

    );
}

export default MisPublicaciones;