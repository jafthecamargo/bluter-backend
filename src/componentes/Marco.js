import React from "react";
import '../styles/Marco.css';

function Marco(props) {
    return (
        <div className='card1'>
            <img className='card-img1' src={require(`../img/${props.imagen}`)} alt='foto'></img>
            <p className='text-body1'>{props.nombre}</p>
            <p className='text-title1'>CEO</p>
        </div>
    );
}

export default Marco;
