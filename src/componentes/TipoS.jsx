import React from "react";
import '../styles/TipoS.css';

function TipoS(props) {

    const buttonStyle = {
        borderColor: props.color,
        backgroundColor: props.color,
        color: 'white'
    };

    return (
        <button className='tipos' style={buttonStyle}>{props.tipo}</button>
    );
}

export default TipoS;
