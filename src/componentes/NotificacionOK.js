import React from "react";
import '../styles/Notificaciones.css';
import ok from "../img/ok.svg";

function NotificacionOK(props) {
    return (
        <div className='cc'>
            <button className='ff'>{props.fecha}</button>
            <div className='txt'>
                <p className='nombre'>{props.nombre}</p>
                <p className='dir'>{props.dir}</p>
            </div>
            <p className='hora'>{props.hora}</p>
            <div className='ok'>
                 <img className='img-ok' src={ok} alt='ok'></img>
            </div>
        </div>
    );
}

export default NotificacionOK;
