import React, { useRef } from "react";
import {Link} from "react-router-dom";
import './styles/App.css';
import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import logo from "./img/bluter.svg";
import arrow from "./img/arrow.svg";
import heart from "./img/heart.svg";
import firma from "./img/firma.png";
import Marco from "./componentes/Marco";

function App() {

    const inicio = useRef(null);
    const acerca = useRef(null);
    const nosotros = useRef(null);

    const inicioscroll = () => {
        inicio.current.scrollIntoView({ behavior: "smooth" });
    };

    const acercascroll = () => {
        acerca.current.scrollIntoView({ behavior: "smooth" });
    };

    const nosotrosscroll = () => {
        nosotros.current.scrollIntoView({ behavior: "smooth" });
    };
    function signin() {
        window.location.href = '/signin';
    }

    function login() {
        window.location.href = '/login';
    }

    function privacy() {
        window.location.href = '/privacy';
    }

    return (
        <div className='d00' id='inicio'>

            <div className='d0' ref={inicio}>
                <div className='navbar'>
                    <img className='barra-logo' src={logo} alt='bluter'></img>
                    <Link to="/">Inicio</Link>
                    <a onClick={acercascroll}>Acerca de</a>
                    <a onClick={nosotrosscroll}>Nosotros</a>
                </div>
                <button onClick={signin} className='iniciasesion'>Inicia Sesión</button>
                <button onClick={login} className='registrate'>Regístrate</button>
                <div className='d01'>
                    <h2>Sistema de Apoyo para Donativos Sanguíneos</h2>
                </div>
                <div className='d02'>
                    <p className='txt1'>Únete y ayuda a salvar vidas. Regístrate como donante voluntario y haz solicitudes de donación en caso de necesitar una transfusión.</p>
                </div>
                <div className='boton1' onClick={signin}>
                    <p>Regístrate ahora</p>
                    <img className='arrow' src={arrow} alt='arrow'></img>
                </div>
                <img className='img1' src={img1} alt='img1'></img>
            </div>

            <div className='d1' ref={acerca}>
                <img className='img2' src={img2} alt='img2'></img>
                <div className='d001'>
                    <p className='txt2'>En Bluter, el proceso es muy sencillo. Los usuarios pueden
                        registrarse y crear un perfil indicando si están disponibles para donar sangre.
                        Si necesitan una donación, pueden hacer una solicitud en la plataforma.
                        <br></br>Bluter se encarga de buscar donantes disponibles cercanos al solicitante y
                        enviarles una notificación para que puedan responder a la solicitud.
                        <br></br>Una vez que un donante acepta la solicitud, el solicitante recibe los detalles
                        necesarios para concertar una cita para la donación.
                        <br></br><br></br>¡Así de fácil es salvar vidas con Bluter!</p>
                    <img className='heart' src={heart} alt='heart'></img>
                    <img className='firma' src={firma} alt='firma'></img>
                </div>
            </div>

            <div className='d2' ref={nosotros}>
                <div className='d0001'>
                    <h2>Nosotros</h2>
                </div>

                    <div className='div1'>
                        <Marco nombre = 'Jafthe Camargo' imagen='jafthe.jpg'/>
                    </div>
                    <div className='div2'>
                        <Marco nombre = 'Itzel Ramírez' imagen='itzel.jpg'/>
                    </div>
                    <div className='div3'>
                        <Marco nombre = 'Antonio Martínez'imagen='antonio.jpg'/>
                    </div>
                    <div className='div4'>
                        <Marco nombre = 'Ángel Vargas'imagen='angel.jpg'/>
                    </div>

                <div className='d-foot'>
                    <img onClick={inicioscroll} className='f-img' src={logo} alt='bluter'></img>
                    <p className='f-text'>© 2023 BLUTER Todos los derechos reservados.</p>
                    <p className='f-policies' onClick={privacy}>Política de Privacidad</p>
                </div>
            </div>

        </div>
    );
}

export default App;
