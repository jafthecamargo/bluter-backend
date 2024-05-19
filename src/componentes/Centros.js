import React from "react";
import '../styles/Centros.css';

function Centros(props) {
    return (
        <div className='card'>
            <img className='card-img' src={require(`../img/${props.imagen}`)} alt='foto'></img>
            <div className='wall'>
                <p className='text-title'>{props.nombre}</p>
                <p className='text-body'>{props.dir}</p>
            </div>
        </div>
    );
}

export default Centros;
